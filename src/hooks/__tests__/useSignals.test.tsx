import { act, renderHook, waitFor } from '@testing-library/react'
import { TestProviders } from '@/test-utils/renderWithProviders'
import { useSignals } from '@/hooks/useSignals'
import type { Signal } from '@/types/dashboard'

const fixture: Signal[] = [
  {
    id: 'sig_001',
    type: 'role_change',
    headline: 'Robert Smith changed role',
    tag: 'Role change',
    occurredAt: '2025-04-02T09:00:00Z',
    status: 'new',
  },
  {
    id: 'sig_002',
    type: 'website_view',
    headline: 'Amazon viewed your site',
    tag: 'Website view',
    occurredAt: '2025-04-02T10:00:00Z',
    status: 'new',
  },
]

jest.mock('@/api/dashboardApi', () => ({
  dashboardApi: {
    getSignals: jest.fn(),
    completeSignal: jest.fn(),
    deleteSignal: jest.fn(),
  },
}))

import { dashboardApi } from '@/api/dashboardApi'

const mockedApi = dashboardApi as jest.Mocked<typeof dashboardApi>

beforeEach(() => {
  jest.clearAllMocks()
  mockedApi.getSignals.mockResolvedValue(structuredClone(fixture))
  mockedApi.completeSignal.mockImplementation((id) => Promise.resolve({ id }))
  mockedApi.deleteSignal.mockImplementation((id) => Promise.resolve({ id }))
})

describe('useSignals', () => {
  it('exposes the signals returned by the API with the initial unreadCount', async () => {
    const { result } = renderHook(() => useSignals(), { wrapper: TestProviders })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.signals).toHaveLength(2)
    expect(result.current.unreadCount).toBe(2)
  })

  it('completeSignal decreases unreadCount and removes the local row', async () => {
    const { result } = renderHook(() => useSignals(), { wrapper: TestProviders })
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    await act(async () => {
      result.current.completeSignal('sig_001')
    })

    await waitFor(() => expect(result.current.unreadCount).toBe(1))
    expect(result.current.signals.map((s) => s.id)).toEqual(['sig_002'])
    expect(mockedApi.completeSignal).toHaveBeenCalledWith('sig_001')
  })

  it('deleteSignal decreases unreadCount and removes the local row', async () => {
    const { result } = renderHook(() => useSignals(), { wrapper: TestProviders })
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    await act(async () => {
      result.current.deleteSignal('sig_002')
    })

    await waitFor(() => expect(result.current.unreadCount).toBe(1))
    expect(result.current.signals.map((s) => s.id)).toEqual(['sig_001'])
    expect(mockedApi.deleteSignal).toHaveBeenCalledWith('sig_002')
  })

  it('completing and deleting two signals leaves unreadCount at 0', async () => {
    const { result } = renderHook(() => useSignals(), { wrapper: TestProviders })
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    await act(async () => {
      result.current.completeSignal('sig_001')
    })
    await waitFor(() => expect(result.current.unreadCount).toBe(1))

    await act(async () => {
      result.current.deleteSignal('sig_002')
    })
    await waitFor(() => expect(result.current.unreadCount).toBe(0))

    expect(result.current.signals).toEqual([])
  })
})
