import { describe, it, expect } from 'vitest'
import { clamp, fillTopOffsets } from '../src/fill.ts'

describe('fill helpers', () => {
  it('clamp clamps to range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-1, 0, 10)).toBe(0)
    expect(clamp(11, 0, 10)).toBe(10)
  })

  it('fillTopOffsets clamps percent and returns strings', () => {
    const o1 = fillTopOffsets(-10, 20, 0)
    expect(o1.start).toMatch(/px$/)
    expect(o1.end).toMatch(/px$/)

    const o2 = fillTopOffsets(50, 20, 0)
    expect(o2.start).toMatch(/px$/)
    expect(o2.end).toMatch(/px$/)

    const o3 = fillTopOffsets(200, 20, 0)
    expect(o3.start).toMatch(/px$/)
    expect(o3.end).toMatch(/px$/)
  })
})
