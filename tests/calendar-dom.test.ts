import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Calendar } from '../src/calendar.ts'

function makeContainer(id: string) {
  document.body.innerHTML = `<div id="${id}"></div>`
}

describe('Calendar DOM rendering (jsdom)', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('renders a 6x7 grid (42 day cells) and correct numbers for a known month', () => {
    // 2026-01-15 (Jan 1 2026 is Thursday)
    vi.setSystemTime(new Date('2026-01-15T12:00:00Z'))

    const id = 'cal'
    makeContainer(id)

    const calendar = new Calendar({
      containerId: id,
      startOfWeek: 'Monday',
      labelLength: 3,
    })

    // basic structural sanity
    expect(document.querySelectorAll(`#${id} .cjslib-day`).length).toBe(42)
    expect(document.querySelectorAll(`#${id} .cjslib-day-radios`).length).toBe(42)

    // labels should start from Monday
    expect(document.getElementById(`${id}-label-1`)?.textContent).toBe('Mon')

    // For Jan 2026 with Monday start, Jan 1 lands on cell 4.
    expect(document.getElementById(`${id}-day-num-4`)?.textContent).toBe('1')

    // Leading previous-month padding should be 29,30,31 in cells 1..3.
    expect(document.getElementById(`${id}-day-num-1`)?.textContent).toBe('29')
    expect(document.getElementById(`${id}-day-num-2`)?.textContent).toBe('30')
    expect(document.getElementById(`${id}-day-num-3`)?.textContent).toBe('31')

    // Selected day should be checked (Jan 15 -> cell 3 + 15 = 18)
    const checked = document.getElementById(`${id}-day-radio-18`) as HTMLInputElement | null
    expect(checked?.checked).toBe(true)

    // keep TS from tree-shaking the instance in a weird way
    expect(calendar.id).toBe(id)
  })
})
