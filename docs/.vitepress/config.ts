import demoblock from 'vitepress-theme-demoblock'

const sidebar = {
  '/': [
    {
      text: '快速开始',
      link: '/'
    },
    {
      text: '通用',
      children: [
        { text: 'Button 按钮', link: '/components/button/' },
        { text: 'Card 卡片', link: '/components/card/' },
        { text: 'Input 输入框', link: '/components/input/' },
        { text: 'Icon 图标', link: '/components/icon/' },
        { text: 'Form 表单', link: '/components/form/' },
        { text: 'Message 消息', link: '/components/message/' },
        { text: 'Notification 通知', link: '/components/notification/' },
        { text: 'Progress-linear 进度条', link: '/components/progress-linear/' },
        { text: 'Images 图像', link: '/components/images/' },
        { text: 'Container 容器', link: '/components/container/' },
        { text: 'AppBar 应用栏', link: '/components/appbar/' }
      ]
    },
    { text: '导航' },
    { text: '反馈' },
    { text: '数据录入' },
    { text: '数据展示' },
    { text: '页面布局' }
  ]
}
const config = {
  themeConfig: {
    sidebar
  },
  markdown: {
    config: (md) => {
      const { demoBlockPlugin } = demoblock
      md.use(demoBlockPlugin)
    }
  }
}

export default config
