export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

/**
 * Map a completion ratio (0..1) to a CSS `top` offset for the water-fill pseudo element.
 *
 * The legacy animation uses `top` from a start value (lower in the box) to end value (higher).
 * We keep the animation but shift the whole band according to completion.
 */
export function fillTopOffsets(percent: number, startPx: number, endPx: number) {
  const p = clamp(percent, 0, 100) / 100

  // When p=0, we want the water low: top near `startPx`.
  // When p=1, we want the water high: top near `endPx`.
  // We'll linearly interpolate both start/end so the animation still oscillates a bit.
  const range = startPx - endPx
  const base = startPx - range * p

  // keep a small wiggle band (~20% of original band) so it still "moves"
  const wiggle = Math.max(2, Math.round(range * 0.2))
  return {
    start: `${base}px`,
    end: `${Math.max(0, base - wiggle)}px`,
  }
}
