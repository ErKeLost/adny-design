import Footer from './src/footer.vue'
import Header from './src/header.vue'
import Main from './src/main.vue'
import Aside from './src/aside.vue'
import Contaniner from './src/container.vue'
import { App } from 'vue'
export { Aside, Main, Header, Footer, Contaniner }

Aside.install = function (app: App) {
  app.component(Aside.name, Aside)
}
Main.install = function (app: App) {
  app.component(Main.name, Main)
}
Header.install = function (app: App) {
  app.component(Header.name, Header)
}
Footer.install = function (app: App) {
  app.component(Footer.name, Footer)
}
Contaniner.install = function (app: App) {
  app.component(Contaniner.name, Contaniner)
}
export default {
  title: 'container 容器',
  category: '反馈',
  status: '30%',
  install(app: App): void {
    app.use(Header as any)
    app.use(Footer as any)
    app.use(Main as any)
    app.use(Aside as any)
    app.use(Contaniner as any)
  }
}
