import demoblock from 'vitepress-theme-demoblock'


const sidebar = {
    '/': [
        {
            text: '快速开始', link: '/'
        },
        {
            text: '通用',
            children: [
                { text: 'Button 按钮', link: '/components/button/' },
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