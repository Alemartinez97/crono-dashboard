import signalsReducer, {
  markSignalCompleted,
  markSignalDeleted,
  resetSignalOverrides,
  type SignalsState,
} from '@/store/slices/signalsSlice'

describe('signalsSlice', () => {
  const initial: SignalsState = { completedIds: [], deletedIds: [] }

  it('parte con listas vacias', () => {
    const state = signalsReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual(initial)
  })

  it('markSignalCompleted agrega un id a completedIds', () => {
    const state = signalsReducer(initial, markSignalCompleted('sig_001'))
    expect(state.completedIds).toEqual(['sig_001'])
    expect(state.deletedIds).toEqual([])
  })

  it('markSignalCompleted no duplica un id ya marcado', () => {
    const seeded: SignalsState = { completedIds: ['sig_001'], deletedIds: [] }
    const state = signalsReducer(seeded, markSignalCompleted('sig_001'))
    expect(state.completedIds).toEqual(['sig_001'])
  })

  it('markSignalDeleted agrega un id a deletedIds', () => {
    const state = signalsReducer(initial, markSignalDeleted('sig_002'))
    expect(state.deletedIds).toEqual(['sig_002'])
    expect(state.completedIds).toEqual([])
  })

  it('markSignalDeleted no duplica un id ya marcado', () => {
    const seeded: SignalsState = { completedIds: [], deletedIds: ['sig_002'] }
    const state = signalsReducer(seeded, markSignalDeleted('sig_002'))
    expect(state.deletedIds).toEqual(['sig_002'])
  })

  it('resetSignalOverrides limpia ambas listas', () => {
    const seeded: SignalsState = {
      completedIds: ['sig_001'],
      deletedIds: ['sig_002'],
    }
    const state = signalsReducer(seeded, resetSignalOverrides())
    expect(state).toEqual(initial)
  })
})
