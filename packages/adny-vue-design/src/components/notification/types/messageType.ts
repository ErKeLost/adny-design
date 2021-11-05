export type ITYPE = 'success' | 'error' | 'info' | 'warning'

export interface IMessageOptions {
  id?: string
  message?: string
  type?: ITYPE
  duration?: number
  center?: boolean
  onClose?: () => void
  offset?: number
}

export type IMessageParams = IMessageOptions | string
