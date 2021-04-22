export interface ActionItem {
  label: string
  handlerMethod: (event:any) => void
  icon?: string
  color?: string
}
