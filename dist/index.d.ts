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

export { Calendar, Calendar as default };
