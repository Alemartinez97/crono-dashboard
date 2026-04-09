const DEFAULT_DELAY_MS = 350

export function delay(ms: number = DEFAULT_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function mockResponse<T>(
  data: T,
  options: { delayMs?: number; failureRate?: number } = {},
): Promise<T> {
  const { delayMs = DEFAULT_DELAY_MS, failureRate = 0 } = options
  await delay(delayMs)

  if (failureRate > 0 && Math.random() < failureRate) {
    throw new Error('Mock API: simulated failure')
  }

  return structuredClone(data)
}
