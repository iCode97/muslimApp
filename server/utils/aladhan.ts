/**
 * Shared helpers for Aladhan proxy routes.
 *
 * All Aladhan calls are proxied through Nitro so we can:
 *   - cache server-side (shared across users/devices)
 *   - apply consistent timeouts and error handling
 *   - keep the upstream base URL off the client bundle
 */

import type { H3Error } from 'h3'

/** Upstream Aladhan base URL (server-only runtimeConfig, override via NUXT_ALADHAN_BASE_URL). */
export function aladhanBaseUrl(event: Parameters<typeof useRuntimeConfig>[0]): string {
  const config = useRuntimeConfig(event)
  return (config.aladhanBaseUrl as string | undefined) || 'https://api.aladhan.com/v1'
}

/**
 * Perform a proxied GET against Aladhan with a 10s timeout and normalised errors.
 * Callers should pass the already-interpolated upstream path (e.g. "/calendar/2026/4").
 */
export async function aladhanFetch<T>(
  event: Parameters<typeof useRuntimeConfig>[0],
  path: string,
  params?: Record<string, string | number | undefined>,
): Promise<T> {
  const base = aladhanBaseUrl(event)
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10_000)

  try {
    return await $fetch<T>(`${base}${path}`, {
      params,
      signal: controller.signal,
      retry: 1,
      retryDelay: 500,
    })
  } catch (err) {
    const status = (err as { statusCode?: number } | undefined)?.statusCode ?? 502
    throw createError({
      statusCode: status,
      statusMessage: 'aladhan_upstream_error',
      data: {
        path,
        cause: (err as Error)?.message,
      },
    }) satisfies H3Error
  } finally {
    clearTimeout(timeoutId)
  }
}

/** Validate that a string parameter is a positive integer in a range. */
export function parseIntParam(value: string | undefined, name: string, min: number, max: number): number {
  const n = Number(value)
  if (!Number.isInteger(n) || n < min || n > max) {
    throw createError({
      statusCode: 400,
      statusMessage: `invalid_param_${name}`,
    })
  }
  return n
}

/** Validate a "DD-MM-YYYY" date string used by Aladhan. */
export function parseDateParam(value: string | undefined, name: string): string {
  if (!value || !/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    throw createError({
      statusCode: 400,
      statusMessage: `invalid_param_${name}`,
    })
  }
  return value
}
