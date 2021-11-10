import { pickProps } from '../../../utils/components'
import { props as popupProps } from '../../drawer/src/props'
import type { PropType } from 'vue'

function messageAlignValidator(messageAlign: string): boolean {
  return ['left', 'center', 'right'].includes(messageAlign)
}

export const props = {
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  },
  message: {
    type: String
  },
  messageAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left',
    validator: messageAlignValidator
  },
  confirmButton: {
    type: Boolean,
    default: true
  },
  cancelButton: {
    type: Boolean,
    default: true
  },
  confirmButtonText: {
    type: String
  },
  cancelButtonText: {
    type: String
  },
  confirmButtonTextColor: {
    type: String
  },
  cancelButtonTextColor: {
    type: String
  },
  confirmButtonColor: {
    type: String
  },
  cancelButtonColor: {
    type: String
  },
  onBeforeClose: {
    type: Function as PropType<(action: any, done: () => void) => void>
  },
  onConfirm: {
    type: Function as PropType<() => void>
  },
  onCancel: {
    type: Function as PropType<() => void>
  },
  'onUpdate:show': {
    type: Function as PropType<(show: boolean) => void>
  },
  ...pickProps(popupProps, [
    'overlay',
    'overlayClass',
    'overlayStyle',
    'lockScroll',
    'closeOnClickOverlay',
    'teleport',
    'onOpen',
    'onClose',
    'onOpened',
    'onClosed',
    'onClickOverlay',
    // internal for function call closes the dialog
    'onRouteChange'
  ])
}
