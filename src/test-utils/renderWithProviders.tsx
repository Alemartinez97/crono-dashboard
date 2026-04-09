import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore, type Store } from '@reduxjs/toolkit'
import onboardingReducer from '@/store/slices/onboardingSlice'
import signalsReducer from '@/store/slices/signalsSlice'
import uiReducer from '@/store/slices/uiSlice'
import type { RootState } from '@/store'

export function makeTestStore(preloaded?: Partial<RootState>): Store<RootState> {
  return configureStore({
    reducer: {
      ui: uiReducer,
      signals: signalsReducer,
      onboarding: onboardingReducer,
    },
    preloadedState: preloaded as RootState | undefined,
  })
}

export function makeTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  })
}

interface ProvidersProps {
  children: ReactNode
  store?: Store<RootState>
  queryClient?: QueryClient
}

export function TestProviders({
  children,
  store = makeTestStore(),
  queryClient = makeTestQueryClient(),
}: ProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ReduxProvider>
  )
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  store?: Store<RootState>
  queryClient?: QueryClient
}

export function renderWithProviders(
  ui: ReactElement,
  { store, queryClient, ...rest }: CustomRenderOptions = {},
) {
  const testStore = store ?? makeTestStore()
  const testClient = queryClient ?? makeTestQueryClient()
  return {
    store: testStore,
    queryClient: testClient,
    ...render(ui, {
      wrapper: ({ children }) => (
        <TestProviders store={testStore} queryClient={testClient}>
          {children}
        </TestProviders>
      ),
      ...rest,
    }),
  }
}
