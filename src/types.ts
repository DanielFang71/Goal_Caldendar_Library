export type CalendarSize = 'small' | 'medium' | 'large'

export type WeekdayName =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'

export type CalendarThemeName = 'classic' | 'modern'

export type CalendarTheme = {
  /** Primary color (month header) */
  primary?: string
  /** Primary dark color (year bar) */
  primaryDark?: string
  /** Text color (month header) */
  text?: string
  /** Text dark color (year bar) */
  textDark?: string

  /** Water fill color */
  fillColor?: string
  /** Animation speed, e.g. "7s" */
  fillSpeed?: string
}

export type CalendarOptions = {
  /** DOM element id of the container */
  containerId: string

  size?: CalendarSize
  startOfWeek?: WeekdayName
  labelLength?: number

  /** Calendar theme */
  theme?: CalendarThemeName | CalendarTheme

  /** Custom empty-state placeholder HTML */
  placeholder?: string

  /** Month and day labels */
  months?: string[]
  days?: string[]
}
