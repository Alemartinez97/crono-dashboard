import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ActionMenu } from '@/components/molecules/ActionMenu/ActionMenu'

describe('ActionMenu', () => {
  it('renders nothing when open is false', () => {
    render(
      <ActionMenu
        open={false}
        onClose={jest.fn()}
        onComplete={jest.fn()}
        onDelete={jest.fn()}
      />,
    )
    expect(screen.queryByTestId('signal-action-menu')).not.toBeInTheDocument()
  })

  it('shows the Complete and Delete options when open is true', () => {
    render(
      <ActionMenu
        open
        onClose={jest.fn()}
        onComplete={jest.fn()}
        onDelete={jest.fn()}
      />,
    )

    expect(screen.getByTestId('signal-action-menu')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /complete/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  it('clicking Complete fires onComplete and onClose', async () => {
    const onComplete = jest.fn()
    const onClose = jest.fn()
    const user = userEvent.setup()

    render(
      <ActionMenu
        open
        onClose={onClose}
        onComplete={onComplete}
        onDelete={jest.fn()}
      />,
    )

    await user.click(screen.getByRole('button', { name: /complete/i }))

    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('clicking Delete fires onDelete and onClose', async () => {
    const onDelete = jest.fn()
    const onClose = jest.fn()
    const user = userEvent.setup()

    render(
      <ActionMenu
        open
        onClose={onClose}
        onComplete={jest.fn()}
        onDelete={onDelete}
      />,
    )

    await user.click(screen.getByRole('button', { name: /delete/i }))

    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('clicking outside the menu fires onClose', async () => {
    const onClose = jest.fn()
    const user = userEvent.setup()

    render(
      <div>
        <button type="button">outside</button>
        <ActionMenu
          open
          onClose={onClose}
          onComplete={jest.fn()}
          onDelete={jest.fn()}
        />
      </div>,
    )

    await user.click(screen.getByRole('button', { name: 'outside' }))
    expect(onClose).toHaveBeenCalled()
  })
})
