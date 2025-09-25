import { defineClientConfig } from '@vuepress/client'
import { onMounted, nextTick } from 'vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // 捕获全局Vue错误
    if (typeof window !== 'undefined') {
      app.config.errorHandler = (err, instance, info) => {
        console.warn('Vue Error:', err, info)
      }
    }
  },
  setup() {
    onMounted(async () => {
      // 客户端挂载完成后的处理
      if (typeof window !== 'undefined') {
        // 等待下一个DOM更新周期
        await nextTick()

        // 发送自定义事件表示Hydration完成
        const event = new Event('vuepress:hydrated')
        window.dispatchEvent(event)

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