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
  description: "Vue Marterial 组件库",
  themeConfig: {
    sidebar,
    logo: "../../assets/love.svg",
  },
  head,
  markdown: {
    config: (md) => {
      const { demoBlockPlugin } = demoblock;
      md.use(demoBlockPlugin);
    },
  },
};

export default config;
