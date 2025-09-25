import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // 这里可以添加客户端增强逻辑
  },
  setup() {
    // 这里可以添加组合式API逻辑
  },
  rootComponents: [
    // 这里可以添加根组件
  ],
})