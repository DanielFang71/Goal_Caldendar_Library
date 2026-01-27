import { describe, it, expect } from 'vitest'

// These tests validate date boundary behaviors used by the calendar rendering logic.

describe('date math sanity', () => {
  it('handles leap day in 2024', () => {
    const d = new Date('2024-02-29T12:00:00Z')
    expect(d.getUTCFullYear()).toBe(2024)
    expect(d.getUTCMonth()).toBe(1) // Feb
    expect(d.getUTCDate()).toBe(29)
  })

  it('computes last day of month correctly (Feb 2025 -> 28)', () => {
    const year = 2025
    const monthIndex = 1 // Feb
    const lastDay = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate()
    expect(lastDay).toBe(28)
  })

  it('computes last day of month correctly (Feb 2024 -> 29)', () => {
    const year = 2024
    const monthIndex = 1 // Feb
    const lastDay = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate()
    expect(lastDay).toBe(29)
  })
})
