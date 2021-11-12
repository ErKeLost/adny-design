import { createVNode, render, VNode } from 'vue'
import { IMessageParams } from '../types/messageType'
import AdnyMessage from './message.vue'

export const messageTypes = ['success', 'info', 'warning', 'danger'] as const

const instance: VNode[] = []
let vmSeed = 1
const Message = (options: IMessageParams) => {
  if (typeof options === 'string') {
    options = { message: options }
  }

  let offset = options.offset || 20
  instance.forEach((item) => {
    offset += (item.el!.offsetHeight || 0) + 16
  })
  offset += 16
  const id = 'message_' + vmSeed++
  let userClose = options.onClose

  let otps = {
    ...options,
    offset,
    id,
    onClose: () => {
      close(id, userClose)
    }
  }
  // 渲染到 body 上 动态创建 不能使用 teleport
  const container = document.createElement('div')
  container.className = `container_${id}`
  const vm = createVNode(AdnyMessage, otps as any)
  vm.props!.onDestory = () => {
    render(null, container)
  }
  render(vm, container)
  instance.push(vm)
  document.body.appendChild(container.firstElementChild!)
}

export function close(id: string, userClose?: any) {
  const idName = instance.findIndex((vm) => {
    const { id: _id } = vm.component!.props
    return id === _id
  })
  if (idName === -1) {
    return
  }
  const vm = instance[idName]
  if (!vm) return
  // 调用用户传入的onClose钩子函数
  userClose?.(vm)
  const removedHeight = vm.el!.offsetHeight
  instance.splice(idName, 1)
  // 调整其他Message实例的高度
  const len = instance.length
  if (len < 1) return
  // 只需要调整index 大于当前Message的实例的高度
  for (let i = idName; i < len; i++) {
    const pos = parseInt(instance[i].el!.style['top'], 10) - removedHeight - 16
    instance[i].component!.props.offset = pos
  }
}
messageTypes.forEach((type) => {
  Message[type] = (options = {}) => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    return Message({
      ...options,
      type
    })
  }
})
export default Message
