import { defineClientConfig } from '@vuepress/client'
import { onMounted } from 'vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // 捕获全局Vue错误
    if (typeof window !== 'undefined') {
      app.config.errorHandler = (err, instance, info) => {
        console.warn('Vue Error:', err, info)
      }

      // 确保DOM完全加载后再处理Hydration
      app.config.globalProperties.$nextTick(() => {
        // 强制重新渲染可能导致Hydration问题的组件
        const event = new Event('vuepress:hydrated')
        window.dispatchEvent(event)
      })
    }
  },
  setup() {
    onMounted(() => {
      // 客户端挂载完成后的处理
      if (typeof window !== 'undefined') {
        // 延迟处理可能的Hydration差异
        setTimeout(() => {
          const elements = document.querySelectorAll('[data-hydration-mismatch]')
          elements.forEach(el => el.removeAttribute('data-hydration-mismatch'))
        }, 100)
      }
    })
  },
  rootComponents: [],
})