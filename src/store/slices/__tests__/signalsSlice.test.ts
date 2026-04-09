import signalsReducer, {
  markSignalCompleted,
  markSignalDeleted,
  resetSignalOverrides,
  type SignalsState,
} from '@/store/slices/signalsSlice'

describe('signalsSlice', () => {
  const initial: SignalsState = { completedIds: [], deletedIds: [] }

  it('starts with empty lists', () => {
    const state = signalsReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual(initial)
  })

  it('markSignalCompleted adds an id to completedIds', () => {
    const state = signalsReducer(initial, markSignalCompleted('sig_001'))
    expect(state.completedIds).toEqual(['sig_001'])
    expect(state.deletedIds).toEqual([])
  })

  it('markSignalCompleted does not duplicate an already-marked id', () => {
    const seeded: SignalsState = { completedIds: ['sig_001'], deletedIds: [] }
    const state = signalsReducer(seeded, markSignalCompleted('sig_001'))
    expect(state.completedIds).toEqual(['sig_001'])
  })

  it('markSignalDeleted adds an id to deletedIds', () => {
    const state = signalsReducer(initial, markSignalDeleted('sig_002'))
    expect(state.deletedIds).toEqual(['sig_002'])
    expect(state.completedIds).toEqual([])
  })

  it('markSignalDeleted does not duplicate an already-marked id', () => {
    const seeded: SignalsState = { completedIds: [], deletedIds: ['sig_002'] }
    const state = signalsReducer(seeded, markSignalDeleted('sig_002'))
    expect(state.deletedIds).toEqual(['sig_002'])
  })

  it('resetSignalOverrides clears both lists', () => {
    const seeded: SignalsState = {
      completedIds: ['sig_001'],
      deletedIds: ['sig_002'],
    }
    const state = signalsReducer(seeded, resetSignalOverrides())
    expect(state).toEqual(initial)
  })
})
