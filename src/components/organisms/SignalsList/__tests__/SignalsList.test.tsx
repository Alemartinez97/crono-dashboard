import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SignalsList } from '@/components/organisms/SignalsList/SignalsList'
import { renderWithProviders } from '@/test-utils/renderWithProviders'
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
  {
    id: 'sig_003',
    type: 'company_change',
    headline: 'Robert Smith changed company',
    tag: 'Company change',
    occurredAt: '2025-04-02T11:00:00Z',
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

describe('SignalsList', () => {
  it('renders the initial counter with the total signals returned by the API', async () => {
    renderWithProviders(<SignalsList />)
    await waitFor(() =>
      expect(screen.getByTestId('signals-counter')).toHaveTextContent('3'),
    )
    expect(screen.getAllByTestId('signal-item')).toHaveLength(3)
  })

  it('clicking Action on a row shows the tooltip with Complete and Delete', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignalsList />)

    const rows = await screen.findAllByTestId('signal-item')
    const firstRow = rows[0]

    await user.click(within(firstRow).getByTestId('signal-action-button'))

    const menu = within(firstRow).getByTestId('signal-action-menu')
    expect(menu).toBeInTheDocument()
    expect(within(menu).getByRole('button', { name: /complete/i })).toBeInTheDocument()
    expect(within(menu).getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  it('choosing Complete decreases the unread counter by one', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignalsList />)

    await waitFor(() =>
      expect(screen.getByTestId('signals-counter')).toHaveTextContent('3'),
    )

    const firstRow = screen.getAllByTestId('signal-item')[0]
    await user.click(within(firstRow).getByTestId('signal-action-button'))
    await user.click(within(firstRow).getByRole('button', { name: /complete/i }))

    await waitFor(() =>
      expect(screen.getByTestId('signals-counter')).toHaveTextContent('2'),
    )
    expect(screen.getAllByTestId('signal-item')).toHaveLength(2)
  })

  it('choosing Delete decreases the unread counter by one', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignalsList />)

    await waitFor(() =>
      expect(screen.getByTestId('signals-counter')).toHaveTextContent('3'),
    )

    const firstRow = screen.getAllByTestId('signal-item')[0]
    await user.click(within(firstRow).getByTestId('signal-action-button'))
    await user.click(within(firstRow).getByRole('button', { name: /delete/i }))

    await waitFor(() =>
      expect(screen.getByTestId('signals-counter')).toHaveTextContent('2'),
    )
    expect(screen.getAllByTestId('signal-item')).toHaveLength(2)
  })

  it('completing and deleting two signals leaves the counter at one', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignalsList />)

    await waitFor(() =>
      expect(screen.getByTestId('signals-counter')).toHaveTextContent('3'),
    )

    let firstRow = screen.getAllByTestId('signal-item')[0]
    await user.click(within(firstRow).getByTestId('signal-action-button'))
    await user.click(within(firstRow).getByRole('button', { name: /complete/i }))

    await waitFor(() =>
      expect(screen.getByTestId('signals-counter')).toHaveTextContent('2'),
    )

    firstRow = screen.getAllByTestId('signal-item')[0]
    await user.click(within(firstRow).getByTestId('signal-action-button'))
    await user.click(within(firstRow).getByRole('button', { name: /delete/i }))

    await waitFor(() =>
      expect(screen.getByTestId('signals-counter')).toHaveTextContent('1'),
    )
  })
})
