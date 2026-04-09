import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SignalItem } from '@/components/molecules/SignalItem/SignalItem'
import { renderWithProviders } from '@/test-utils/renderWithProviders'
import type { Signal } from '@/types/dashboard'

const signal: Signal = {
  id: 'sig_001',
  type: 'role_change',
  headline: 'Robert Smith changed role from SDR to Senior SDR at WeRoad',
  tag: 'Role change',
  secondaryTag: 'In sequence',
  occurredAt: '2025-04-02T09:00:00Z',
  status: 'new',
}

describe('SignalItem', () => {
  it('renders the signal headline and tags', () => {
    renderWithProviders(
      <SignalItem signal={signal} onComplete={jest.fn()} onDelete={jest.fn()} />,
    )

    expect(screen.getByText(signal.headline)).toBeInTheDocument()
    expect(screen.getByText('Role change')).toBeInTheDocument()
    expect(screen.getByText('In sequence')).toBeInTheDocument()
  })

  it('clicking Action opens the menu with Complete and Delete', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <SignalItem signal={signal} onComplete={jest.fn()} onDelete={jest.fn()} />,
    )

    expect(screen.queryByTestId('signal-action-menu')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('signal-action-button'))

    expect(screen.getByTestId('signal-action-menu')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /complete/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  it('choosing Complete invokes onComplete with the signal id', async () => {
    const onComplete = jest.fn()
    const user = userEvent.setup()
    renderWithProviders(
      <SignalItem signal={signal} onComplete={onComplete} onDelete={jest.fn()} />,
    )

    await user.click(screen.getByTestId('signal-action-button'))
    await user.click(screen.getByRole('button', { name: /complete/i }))

    expect(onComplete).toHaveBeenCalledWith('sig_001')
  })

  it('choosing Delete invokes onDelete with the signal id', async () => {
    const onDelete = jest.fn()
    const user = userEvent.setup()
    renderWithProviders(
      <SignalItem signal={signal} onComplete={jest.fn()} onDelete={onDelete} />,
    )

    await user.click(screen.getByTestId('signal-action-button'))
    await user.click(screen.getByRole('button', { name: /delete/i }))

    expect(onDelete).toHaveBeenCalledWith('sig_001')
  })

  it('a second click on Action closes the menu', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <SignalItem signal={signal} onComplete={jest.fn()} onDelete={jest.fn()} />,
    )

    const actionButton = screen.getByTestId('signal-action-button')
    await user.click(actionButton)
    expect(screen.getByTestId('signal-action-menu')).toBeInTheDocument()

    await user.click(actionButton)
    expect(screen.queryByTestId('signal-action-menu')).not.toBeInTheDocument()
  })
})
