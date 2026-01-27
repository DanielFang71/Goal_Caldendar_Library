import { describe, it, expect } from 'vitest'
import { JSDOM } from 'jsdom'
import { Calendar } from '../src/calendar.ts'

describe('Calendar options constructor', () => {
  it('sets theme CSS vars on container (classic default)', () => {
    const dom = new JSDOM('<div id="cal"></div>')
    // @ts-expect-error test environment
    global.document = dom.window.document

    const cal = new Calendar({ containerId: 'cal' })
    const el = dom.window.document.getElementById('cal')!

    expect(el.style.getPropertyValue('--goalcal-fill-color')).toBeTruthy()
    expect(el.style.getPropertyValue('--goalcal-fill-speed')).toBeTruthy()
    expect(cal.id).toBe('cal')
  })

  it('supports modern theme name', () => {
    const dom = new JSDOM('<div id="cal"></div>')
    // @ts-expect-error test environment
    global.document = dom.window.document

    new Calendar({ containerId: 'cal', theme: 'modern' })
    const el = dom.window.document.getElementById('cal')!
    expect(el.style.getPropertyValue('--goalcal-fill-color')).toBeTruthy()
  })

  it('setFillFromRatio writes css vars', () => {
    const dom = new JSDOM('<div id="cal"></div>')
    // @ts-expect-error test environment
    global.document = dom.window.document

    const cal = new Calendar({ containerId: 'cal' })
    // method is attached via prototype in src/calendar.ts
    // @ts-expect-error dynamic method
    cal.setFillFromRatio(0.5)

    const el = dom.window.document.getElementById('cal')!
    expect(el.style.getPropertyValue('--goalcal-fill-start')).toMatch(/px$/)
    expect(el.style.getPropertyValue('--goalcal-fill-end')).toMatch(/px$/)
  })
})

  it('supports custom theme object (covers normalizeTheme merge)', () => {
    const dom = new JSDOM('<div id="cal"></div>')
    // @ts-expect-error test environment
    global.document = dom.window.document

    new Calendar({
      containerId: 'cal',
      theme: { fillColor: '#ff0000', fillSpeed: '1s' },
    })

    const el = dom.window.document.getElementById('cal')!
    expect(el.style.getPropertyValue('--goalcal-fill-color')).toContain('#ff0000')
    expect(el.style.getPropertyValue('--goalcal-fill-speed')).toContain('1s')
  })

  it('supports legacy positional constructor (covers legacy branch)', () => {
    const dom = new JSDOM('<div id="cal"></div>')
    // @ts-expect-error test environment
    global.document = dom.window.document

    const cal = new Calendar(
      'cal',
      'large',
      ['Monday', 3],
      ['#4CAF50', '#4CAF50', '#FFFFFF', '#FFFFFF'],
      {}
    )

    expect(cal.id).toBe('cal')
  })

  it('supports placeholder/month/day overrides and ignores invalid lengths', () => {
    const dom = new JSDOM('<div id="cal"></div>')
    // @ts-expect-error test environment
    global.document = dom.window.document

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const cal = new Calendar({
      containerId: 'cal',
      placeholder: '<li>EMPTY</li>',
      months,
      days,
      startOfWeek: 'Sunday',
    })

    expect(cal.placeholder).toContain('EMPTY')
    expect(cal.months).toEqual(months)
    expect(cal.defaultLabels).toEqual(days)

    // invalid lengths should be ignored
    const cal2 = new Calendar({
      containerId: 'cal',
      months: ['x'],
      days: ['y'],
    })
    expect(cal2.months.length).toBe(12)
    expect(cal2.defaultLabels.length).toBe(7)
  })

  it('throws when container is missing (clear developer feedback)', () => {
    const dom = new JSDOM('<div></div>')
    // @ts-expect-error test environment
    global.document = dom.window.document

    expect(() => new Calendar({ containerId: 'missing' })).toThrow(/container not found/i)
  })

  it('setFillFromRatio no-ops when container removed after init (covers guard)', () => {
    const dom = new JSDOM('<div id="cal"></div>')
    // @ts-expect-error test environment
    global.document = dom.window.document

    const cal = new Calendar({ containerId: 'cal' })
    dom.window.document.getElementById('cal')!.remove()

    // @ts-expect-error dynamic method
    cal.setFillFromRatio(0.5)
    expect(true).toBe(true)
  })

  it('legacy constructor with undefined options still works (covers default options branch)', () => {
    const dom = new JSDOM('<div id="cal"></div>')
    // @ts-expect-error test environment
    global.document = dom.window.document

    const cal = new Calendar(
      'cal',
      'large',
      ['Monday', 3],
      ['#4CAF50', '#4CAF50', '#FFFFFF', '#FFFFFF']
    )
    expect(cal.id).toBe('cal')
  })

  it('setData accepts YYYY-MM-DD map and updates goalsObj', () => {
    const dom = new JSDOM('<div id="cal"></div>')
    // @ts-expect-error test environment
    global.document = dom.window.document

    const cal = new Calendar({ containerId: 'cal' })
    // @ts-expect-error dynamic method
    cal.setData({
      '2026-01-01': [{ text: 'A', complete: 1, goal: 2 }],
      '2026-01-02': [{ text: 'B' }],
    })

    // legacy shape: [{date, goal:{complete,goal,text}}]
    // @ts-expect-error legacy data
    expect(cal.goalsObj.length).toBe(2)
  })

  it('setData treats undefined day list as empty (covers branch)', () => {
    const dom = new JSDOM('<div id="cal"></div>')
    // @ts-expect-error test environment
    global.document = dom.window.document

    const cal = new Calendar({ containerId: 'cal' })
    // @ts-expect-error dynamic method
    cal.setData({ '2026-01-03': undefined } as any)

    // @ts-expect-error legacy data
    expect(cal.goalsObj.length).toBe(0)
  })

  it('setData throws on invalid date key', () => {
    const dom = new JSDOM('<div id="cal"></div>')
    // @ts-expect-error test environment
    global.document = dom.window.document

    const cal = new Calendar({ containerId: 'cal' })
    // @ts-expect-error dynamic method
    expect(() => cal.setData({ '01-01-2026': [{ text: 'A' }] })).toThrow(/YYYY-MM-DD/)
  })
