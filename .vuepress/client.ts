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

        // 处理主题切换按钮的Hydration问题
        const themeButtons = document.querySelectorAll('.btn-toggle-dark-mode')
        themeButtons.forEach(btn => {
          // 强制重新渲染主题按钮以匹配客户端状态
          btn.style.display = 'none'
          setTimeout(() => {
            btn.style.display = ''
          }, 0)
        })

        // 处理时间相关的组件
        const timeElements = document.querySelectorAll('[class*="time"], [class*="date"]')
        timeElements.forEach(el => {
          // 确保时间显示一致性
          const textContent = el.textContent
          if (textContent && /\d{4}-\d{2}-\d{2}/.test(textContent)) {
            // 统一时间格式显示
            el.setAttribute('data-hydration-safe', 'true')
          }
        })

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