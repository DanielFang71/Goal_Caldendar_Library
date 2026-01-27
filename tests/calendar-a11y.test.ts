import { describe, expect, it, vi } from 'vitest'

import { Calendar } from '../src/calendar.ts'

function makeContainer(id: string) {
  document.body.innerHTML = `<div id="${id}"></div>`
}

describe('Calendar a11y baseline (no third-party deps)', () => {
  it('adds grid semantics and roving tabindex and supports arrow-key focus', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-15T12:00:00Z'))

    const id = 'cal'
    makeContainer(id)

    new Calendar({
      containerId: id,
      startOfWeek: 'Monday',
    })

    const days = document.querySelector(`#${id} .cjslib-days`) as HTMLElement | null
    expect(days).not.toBeNull()
    expect(days?.getAttribute('role')).toBe('grid')

    const cells = Array.from(document.querySelectorAll(`#${id} .cjslib-days .cjslib-day`)) as HTMLElement[]
    expect(cells.length).toBe(42)

    const tabbables = cells.filter((c) => c.tabIndex === 0)
    expect(tabbables.length).toBe(1)

    // Selected day should have aria-selected=true
    const selected = cells.find((c) => c.getAttribute('aria-selected') === 'true')
    expect(selected).toBeTruthy()

    // Focus should move with arrow keys.
    const start = tabbables[0]
    start.focus()
    expect(document.activeElement).toBe(start)

    const evt = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    start.dispatchEvent(evt)

    expect(document.activeElement).toBe(cells[cells.indexOf(start) + 1])
  })
})
