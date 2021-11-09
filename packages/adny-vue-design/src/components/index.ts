import type { App } from 'vue'

import ButtonInstall, { ABtn } from './button'
import CardInstall, { ACard } from './card'
import IputInstall, { AIput } from './input'
import IconInstall, { AIcon } from './icon'
import AdnyFormDetailInstall, { AdnyFormDetail } from './form-details'
import FormInstall, { AForm, AFormItem } from './form'
import ImageInstall, { AImage } from './images'
import MessageInstall, { Message } from './message'
import NotificationInstall, { Notification } from './notification'
import ProgressLinearInstall, { ProgressLinear } from './progress-linear'
import ContainerInstall, { Aside, Footer, Header, Main, Contaniner } from './container'
import AppBarInstall, { AppBar } from './app-bar'
const installed = [
  ButtonInstall,
  CardInstall,
  IputInstall,
  IconInstall,
  AdnyFormDetailInstall,
  FormInstall,
  ImageInstall,
  MessageInstall,
  NotificationInstall,
  ProgressLinearInstall,
  ContainerInstall,
  AppBarInstall
]
export {
  ABtn,
  ACard,
  AIput,
  AIcon,
  AdnyFormDetail,
  AForm,
  AImage,
  Message,
  Notification,
  ProgressLinear,
  Aside,
  Footer,
  Main,
  Header,
  Contaniner,
  AppBar
}
export default {
  version: '0.0.1',
  install(app: App): void {
    installed.forEach((p) => app.use(p as any))
  }
}
