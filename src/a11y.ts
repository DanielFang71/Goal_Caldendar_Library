// Minimal, dependency-free a11y helpers for the legacy-rendered calendar DOM.
//
// Design goals:
// - Do not change existing click behavior
// - Provide basic ARIA structure + keyboard focus navigation
// - Keep implementation small and testable

export function applyCalendarA11y(calendarId: string) {
  const root = document.getElementById(calendarId)
  if (!root) return

  const daysContainer = root.querySelector('.cjslib-days') as HTMLElement | null
  if (!daysContainer) return

  // Roles: grid -> row -> gridcell
  daysContainer.setAttribute('role', 'grid')

  const rows = Array.from(daysContainer.querySelectorAll('.cjslib-row')) as HTMLElement[]
  for (const row of rows) row.setAttribute('role', 'row')

  const cells = Array.from(daysContainer.querySelectorAll('.cjslib-day')) as HTMLElement[]
  for (const cell of cells) cell.setAttribute('role', 'gridcell')

  // Keep month/year text discoverable.
  const monthEl = root.querySelector(`#${calendarId}-month`) as HTMLElement | null
  const yearEl = root.querySelector(`#${calendarId}-year`) as HTMLElement | null
  const label = [monthEl?.textContent, yearEl?.textContent].filter(Boolean).join(' ')
  if (label) daysContainer.setAttribute('aria-label', label)

  // Roving tabindex based on currently-checked radio
  const radios = Array.from(
    daysContainer.querySelectorAll(`input[type="radio"][name="${calendarId}-day-radios"]`)
  ) as HTMLInputElement[]

  function getActiveIndex() {
    const checkedIndex = radios.findIndex((r) => r.checked)
    return checkedIndex >= 0 ? checkedIndex : 0
  }

  function syncTabIndexAndSelection() {
    const active = getActiveIndex()

    cells.forEach((cell, idx) => {
      cell.tabIndex = idx === active ? 0 : -1
      const isSelected = radios[idx]?.checked ?? false
      if (isSelected) cell.setAttribute('aria-selected', 'true')
      else cell.setAttribute('aria-selected', 'false')

      // Mark today when legacy class exists
      if (cell.classList.contains('cjslib-day-today')) cell.setAttribute('aria-current', 'date')
      else cell.removeAttribute('aria-current')
    })
  }

  function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n))
  }

  function focusCell(index: number) {
    const idx = clamp(index, 0, cells.length - 1)
    for (let i = 0; i < cells.length; i++) cells[i].tabIndex = i === idx ? 0 : -1
    cells[idx]?.focus()
  }

  // Initial sync
  syncTabIndexAndSelection()

  // Keep in sync when user clicks/changes selection
  for (const radio of radios) {
    radio.addEventListener('change', () => {
      syncTabIndexAndSelection()
    })
  }

  // Arrow key navigation for focus (does not automatically change selected date)
  daysContainer.addEventListener('keydown', (e) => {
    const key = (e as KeyboardEvent).key
    const activeEl = document.activeElement
    const currentIndex = cells.findIndex((c) => c === activeEl)
    if (currentIndex < 0) return

    let nextIndex: number | null = null
    if (key === 'ArrowRight') nextIndex = currentIndex + 1
    if (key === 'ArrowLeft') nextIndex = currentIndex - 1
    if (key === 'ArrowDown') nextIndex = currentIndex + 7
    if (key === 'ArrowUp') nextIndex = currentIndex - 7

    if (nextIndex != null) {
      e.preventDefault()
      focusCell(nextIndex)
    }
  })

  // Ensure the grid is reachable by tab: if focus enters the container,
  // forward focus to the active cell.
  daysContainer.addEventListener('focus', (e) => {
    if (e.target === daysContainer) focusCell(getActiveIndex())
  })
}
