/*
 * Calendar (ported from legacy CSC309 project)
 *
 * Goals for P2:
 * - Support a modern options-object constructor while keeping legacy constructor args.
 * - Keep behavior as close as possible for compatibility.
 */

import type {
  CalendarData,
  CalendarOptions,
  CalendarTheme,
  CalendarThemeName,
  DayItem,
  WeekdayName,
} from './types'
import { applyCalendarA11y } from './a11y'

const DEFAULT_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DEFAULT_DAYS: WeekdayName[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

function normalizeTheme(theme?: CalendarThemeName | CalendarTheme): Required<CalendarTheme> {
  const classic: Required<CalendarTheme> = {
    primary: '#4CAF50',
    primaryDark: '#4CAF50',
    text: '#FFFFFF',
    textDark: '#FFFFFF',
    fillColor: '#00acee',
    fillSpeed: '7s',
  }

  const modern: Required<CalendarTheme> = {
    primary: '#111827', // slate-900
    primaryDark: '#0B1220',
    text: '#F9FAFB',
    textDark: '#F9FAFB',
    fillColor: '#3B82F6', // blue-500
    fillSpeed: '6.5s',
  }

  const base = theme === 'modern' ? modern : classic
  if (!theme || typeof theme === 'string') return base
  return { ...base, ...theme }
}

function buildLegacyArgsFromOptions(opts: CalendarOptions) {
  const size = opts.size ?? 'large'
  const startOfWeek = opts.startOfWeek ?? 'Monday'
  const labelLen = opts.labelLength ?? 3
  const t = normalizeTheme(opts.theme)

  const colors: [string, string, string, string] = [
    t.primary,
    t.primaryDark,
    t.text,
    t.textDark,
  ]

  const legacyOptions: any = {}
  if (opts.placeholder != null) legacyOptions.placeholder = opts.placeholder
  if (opts.months) legacyOptions.months = opts.months
  if (opts.days) legacyOptions.days = opts.days

  return {
    id: opts.containerId,
    size,
    labelSettings: [startOfWeek, labelLen] as [string, number],
    colors,
    options: legacyOptions,
    theme: t,
  }
}

// --- Legacy implementation pasted & minimally adapted ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let warnedLegacyConstructor = false

export class Calendar {
  id: string
  size: any
  labelSettings: any
  colors: any
  initday: number
  indicator: boolean
  indicator_type: number
  indicator_pos: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  goalsObj: any[]
  placeholder: string
  months: string[]
  defaultLabels: string[]
  label: string[]
  labels: string[]
  date: Date
  today: Date
  history: any[]

  // NEW constructor: options object
  constructor(options: CalendarOptions)
  // Legacy constructor: positional args
  constructor(
    id: string,
    size: any,
    labelSettings: any,
    colors: any,
    options?: any
  )
  constructor(
    a: CalendarOptions | string,
    size?: any,
    labelSettings?: any,
    colors?: any,
    options?: any
  ) {
    let id: string
    let _size: any
    let _labelSettings: any
    let _colors: any
    let _options: any
    let theme = normalizeTheme(undefined)

    if (typeof a === 'string') {
      if (!warnedLegacyConstructor) {
        warnedLegacyConstructor = true
        // eslint-disable-next-line no-console
        console.warn(
          '[goalcalendar] Legacy positional constructor is deprecated. Prefer new Calendar({ containerId, ...options }).'
        )
      }

      id = a
      _size = size
      _labelSettings = labelSettings
      _colors = colors
      _options = options
    } else {
      const mapped = buildLegacyArgsFromOptions(a)
      id = mapped.id
      _size = mapped.size
      _labelSettings = mapped.labelSettings
      _colors = mapped.colors
      _options = mapped.options
      theme = mapped.theme

      // expose theme vars for CSS-based animation
      // set CSS variables on the root container for easy theming
      // theme vars applied after we validate container exists
    }

    const container = document.getElementById(id)
    if (!container) throw new Error(`Calendar container not found: ${id}`)

    // Apply theme vars for CSS-based animation.
    // For legacy constructor users, these vars can still be set later via CSS.
    if (typeof a !== 'string') {
      container.style.setProperty('--goalcal-fill-color', theme.fillColor)
      container.style.setProperty('--goalcal-fill-speed', theme.fillSpeed)
    }

    this.id = id
    this.size = _size
    this.labelSettings = _labelSettings
    this.colors = _colors
    this.initday = 0
    _options = _options || {}
    this.indicator = true
    this.indicator_type = 1
    this.indicator_pos = 'bottom'
    this.goalsObj = []

    const listPlaceholder = document.createElement('LI')
    listPlaceholder.className = 'cjslib-list-placeholder'
    listPlaceholder.appendChild(document.createTextNode('No goals on this day'))
    listPlaceholder.style.cssText = 'text-align: center; padding: 20px 0px;'

    this.placeholder = listPlaceholder.outerHTML
    if (_options.placeholder != undefined) this.placeholder = _options.placeholder

    let months = [...DEFAULT_MONTHS]
    if (_options.months != undefined && _options.months.length == 12) months = _options.months

    let label = [...DEFAULT_DAYS]
    if (_options.days != undefined && _options.days.length == 7) label = _options.days

    this.months = months
    this.defaultLabels = label

    this.label = []
    this.labels = []
    for (let i = 0; i < 7; i++) {
      this.label.push(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (label as any)[
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (label as any).indexOf(_labelSettings[0]) + this.label.length >= label.length
            ? Math.abs(label.length - ((label as any).indexOf(_labelSettings[0]) + this.label.length))
            : (label as any).indexOf(_labelSettings[0]) + this.label.length
        ]
      )
    }
    for (let i = 0; i < 7; i++) {
      this.labels.push(this.label[i].substring(0, _labelSettings[1]))
    }

    this.date = new Date()
    this.today = new Date()

    this.history = []

    // legacy methods live on prototype in old code; keep call sites
    ;(this as any).draw()
    ;(this as any).update()

    ;(this as any).setOnClickListener('days-blocks')
    ;(this as any).setOnClickListener('month-slider')
    ;(this as any).setOnClickListener('year-slider')

    // Optional a11y baseline: ARIA roles + roving tabindex + arrow-key focus.
    // This is intentionally dependency-free and designed not to change click behavior.
    ;(this as any).applyA11y?.()
  }
}

// Inject the legacy prototype methods by requiring the JS implementation.
// We reuse the existing proven code path in P2 and will refactor further later.
import legacyProto from './legacy-calendar-proto'
Object.assign(Calendar.prototype, legacyProto)

export default Calendar

// ---- P2 additions: progress-driven fill helpers ----

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(Calendar.prototype as any).applyA11y = function applyA11y() {
  applyCalendarA11y(this.id)
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(Calendar.prototype as any).setFillFromRatio = function setFillFromRatio(ratio: number) {
  // ratio: 0..1
  const percent = Math.max(0, Math.min(1, ratio)) * 100
  const root = document.getElementById(this.id)
  if (!root) return

  // Use legacy small-size defaults as baseline (start 20px -> end 0px).
  // This is applied to the pseudo-element keyframes via CSS vars.
  // It won't be perfect across sizes yet; we can refine later.
  const startPx = 20
  const endPx = 0

  // compute offsets in px strings
  const range = startPx - endPx
  const base = startPx - range * (percent / 100)
  const wiggle = Math.max(2, Math.round(range * 0.2))

  root.style.setProperty('--goalcal-fill-start', `${base}px`)
  root.style.setProperty('--goalcal-fill-end', `${Math.max(0, base - wiggle)}px`)
}

// ---- P3 additions: data-driven API (industrial-friendly) ----

function parseIsoDateKey(key: string): Date {
  // Expect YYYY-MM-DD
  const m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(key)
  if (!m) throw new Error(`Invalid date key: ${key} (expected YYYY-MM-DD)`) 
  const y = Number(m[1])
  const mo = Number(m[2])
  const d = Number(m[3])
  return new Date(y, mo - 1, d)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(Calendar.prototype as any).setData = function setData(data: CalendarData) {
  // Reset goals
  this.goalsObj = []

  const createGoal = (this as any).createGoal as (c: number, g: number, t: string) => any
  const addGoalToObjs = (this as any).addGoalToObjs as (date: Date, goal: any) => any
  const addData = (this as any).addData as (objs: any[]) => any

  const keys = Object.keys(data)
  for (const key of keys) {
    const items: DayItem[] = data[key] || []
    const date = parseIsoDateKey(key)

    for (const item of items) {
      const complete = item.complete ?? 0
      const goal = item.goal ?? 0
      const text = item.text
      addGoalToObjs.call(this, date, createGoal.call(this, complete, goal, text))
    }
  }

  this.data = addData.call(this, this.goalsObj)
  ;(this as any).update()
}
