import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OpenClaw 教程',
  description: 'OpenClaw 完整教程 - 从入门到精通',
  
  ignoreDeadLinks: true,
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ]
})