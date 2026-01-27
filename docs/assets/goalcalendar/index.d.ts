declare class Calendar {
  constructor(
    id: string,
    size: 'small' | 'medium' | 'large' | string,
    labelSettings: [string, number],
    colors: [string, string, string, string],
    options?: {
      placeholder?: string
      months?: string[]
      days?: string[]
    }
  )

  // Data helpers
  addData(objs: Array<{ date: Date; goal: any }>): Record<string, any>
  createGoal(complete: any, goal: any, text: any): any
  addGoalToObjs(date: Date, goal: any): any[]

  // Theme helpers
  changeColor(newColors: any): void
  changeSize(newSize: any): void
  changeLableSetting(newLabelSettings: any): void
}

type CalendarSize = 'small' | 'medium' | 'large';
type WeekdayName = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
type CalendarThemeName = 'classic' | 'modern';
type CalendarTheme = {
    /** Primary color (month header) */
    primary?: string;
    /** Primary dark color (year bar) */
    primaryDark?: string;
    /** Text color (month header) */
    text?: string;
    /** Text dark color (year bar) */
    textDark?: string;
    /** Water fill color */
    fillColor?: string;
    /** Animation speed, e.g. "7s" */
    fillSpeed?: string;
};
type CalendarOptions = {
    /** DOM element id of the container */
    containerId: string;
    size?: CalendarSize;
    startOfWeek?: WeekdayName;
    labelLength?: number;
    /** Calendar theme */
    theme?: CalendarThemeName | CalendarTheme;
    /** Custom empty-state placeholder HTML */
    placeholder?: string;
    /** Month and day labels */
    months?: string[];
    days?: string[];
};

export { Calendar, type CalendarOptions, type CalendarSize, type CalendarTheme, type CalendarThemeName, type WeekdayName, Calendar as default };
