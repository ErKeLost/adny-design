import demoblock from "vitepress-theme-demoblock";
import head from "./config/head";
const sidebar = {
  "/": [
    {
      text: "快速开始",
      link: "/",
    },
    {
      text: "通用",
      children: [
        { text: "Button 按钮", link: "/components/button/" },
        { text: "Card 卡片", link: "/components/card/" },
        { text: "Input 输入框", link: "/components/input/" },
        { text: "Icon 图标", link: "/components/icon/" },
        { text: "Form 表单", link: "/components/form/" },
        { text: "Message 消息", link: "/components/message/" },
        { text: "Notification 通知", link: "/components/notification/" },
        {
          text: "Progress-linear 进度条",
          link: "/components/progress-linear/",
        },
        { text: "Images 图像", link: "/components/images/" },
        { text: "Container 容器", link: "/components/container/" },
        { text: "AppBar 应用栏", link: "/components/appbar/" },
        { text: "Grid 布局", link: "/components/grid/" },
        { text: "Chip 纸片", link: "/components/chip/" },
        { text: "Drawer 抽屉", link: "/components/drawer/" },
        { text: "Dialog 对话框", link: "/components/dialog/" },
        { text: "Divider 分割线", link: "/components/divider/" },
        { text: "Carousel 轮播", link: "/components/carousel/" },
        { text: "Tabs 选项卡", link: "/components/tabs/" },
        { text: "Ripple 水波纹", link: "/components/ripple/" },
        { text: "BackTop 回到顶部", link: "/components/backTop/" },
        { text: "Cell 单元格", link: "/components/cell/" },
        { text: "Spin 加载中", link: "/components/spin/" },
        { text: "CountDown 倒计时", link: "/components/count-down/" },
        { text: "Statistic 统计数值", link: "/components/statistic/" },
        { text: "Badge 徽标", link: "/components/badge/" },
        { text: "Avatar 头像", link: "/components/avatar/" },
        { text: "ADropDown 下拉菜单", link: "/components/dropdown/" },
        { text: "ASelect 选择框", link: "/components/select/" },
        { text: "ARadio 单选", link: "/components/radio/" },
        { text: "ASider 滑块", link: "/components/slider/" },
        { text: "ATooltip 提示", link: "/components/tooltip/" },
        { text: "ATrigger 触发器", link: "/components/trigger/" },
        { text: "AColorPicker 颜色选择器", link: "/components/color-picker/" },
        { text: "AInputNumber 数字输入框", link: "/components/input-number/" },
        { text: "APagination 分页", link: "/components/pagination/" },
        { text: "ASkeleton 骨架屏", link: "/components/skeleton/" },
        { text: "ACounter 计数器", link: "/components/counter/" },
        { text: "ASpace 间隔", link: "/components/space/" },
        { text: "Lazy 懒加载", link: "/components/lazy/" },
        { text: "checkbox 复选框", link: "/components/checkbox/" },
        { text: "ImagePreview 图片预览", link: "/components/image-preview/" },
        { text: "DatePicker 日期选择器", link: "/components/date-picker/" },
        { text: "StepGuide 操作引导", link: "/components/steps-guide/" },
        { text: "overlay 遮罩层", link: "/components/overlay/" },
      ],
    },
    { text: "导航" },
    { text: "反馈" },
    { text: "数据录入" },
    { text: "数据展示" },
    { text: "页面布局" },
  ],
};
const config = {
  title: "Adny Design",
  description: "Vue3 Marterial Design 组件库",
  themeConfig: {
    sidebar,
    logo: "love.svg",
    repo: 'https://github.com/ErKeLost/adny-vitepress',
    repoLabel:'测试',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '欢迎帮助我们改善页面!',
    lastUpdated: '最近更新时间',
    nav: [
        { text: '入门', link: '/getting/why.html' },
        { text: '模板', link: '/template/template-vue3-ts-initial.html' },
        { text: '相关文档', link: '/documentation/vue.html' },
        { text: 'github', link: 'https://github.com/ErKeLost/adny-vitepress' },
    ],
  },
  head: [["link", { rel: "icon", type: "image/svg+xml", href: "love.svg" }]],
  markdown: {
    config: (md) => {
      const { demoBlockPlugin } = demoblock;
      md.use(demoBlockPlugin);
    },
  },
};

export default config;
