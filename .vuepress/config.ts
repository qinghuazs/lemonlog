import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  base: "/",
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['meta', { name: 'theme-color', content: '#46bd87' }],
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  shouldPrefetch: false,
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  },
  markdown: {
    code: {
        lineNumbers: true, // 代码块显示行号
        highlightLines: true, // 代码块高亮行
    }
  },
  title: "冬眠日记",
  description: "祝我们平日都快乐，做平凡的人~",
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "冬眠",
    authorAvatar: "/head.png",
    docsDir: "example",
    plugins: [],
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      "/java/": [
        { text: "工具类", children: ["first", "functional", "consumer"] },
        { text: "JVM", children: ["jvm-fullgc01", "jvm-memory-config", "jvmcommand", "arthas", "arthas-redefine"] },
        { text: "线程", children: ["thread-threadpool", "threadpool-factory","threadlocal", "lock"] },
      ],
      "/mysql/": [
        { text: "应用", children: ["index"] },
        { text: "原理", children: ["datatype","index","mvcc","sql-parse","sql-select-optimize","group-by"] },
        { text: "性能优化", children: ["explain"] },
        { text: "问题处理", children: ["deadlock"] },
       
      ],
      "/spring/": [
        { text: "Spring框架", children: ["aop","extension", ] },
      ],
      "/springboot/": [
        { text: "SpringBoot", children: ["logback", "starter", "endpoint"] },
      ],
      "/springcloud/": [
        { text: "Resilience4J", children: ["resilience4j", "circuitbreaker"] },
      ],
      "/docs/htmlcssjs/TailwindCSS/": [
        { text: "tailwindcss", children: ["01all", "02按钮", "03background", "04layout"] },
      ],
      "/docs/htmlcssjs/Daisyui/": [
        { text: "组件", children: ["03hero", "02按钮", "starter"] },
        { text: "技巧", children: ["100tooltip"] },
      ],
      "/docs/htmlcssjs/monaco/": [
        { text: "编辑器", children: ["01EditorProps", "02按钮", "starter"] },
      ],
      "/docs/mybatis/": [
        { text: "MyBatis", children: ["first"] },
      ],
      "/docs/microservice/": [
        { text: "微服务", children: ["first", "rpcandrestful"] },
      ],
      "/docs/scheduler/": [
        { text: "调度任务", children: ["first"] },
        { text: "xxl-job", children: ["xxlrouter", "xxlexecutor", "xxlthread"] },
      ],
      "/docs/leetcode/": [
        { text: "算法题", children: ["first"] },
      ],
      "/leetcode/": [
        { text: "动态规划", children: ["dp-list"] },
        { text: "前缀和", children: ["sumRange","maxProfit"] },
        { text: "数组", children: ["sumRange","maxProfit"] },
        { text: "栈", children: ["ValidParentheses"] },
        { text: "二叉树", children: ["BinaryTreeLevelOrder","BinaryTreeInorderTraversal", "BinaryTreeLowestCommonAncestor"] },
      ],
      "/kafka/": [
        { text: "Kafka", children: ["introduction", "Kafka安装部署.html", "提示词.html"], collapsible: true  },
        { text: "Kafka Producer", collapsible:true, children: ["指标.html", "生产者配置参数.html", "生产者重要配置参数.html", "发送消息.html", "分区计算.html", "消息追加到消息累加器.html", "粘性分区.html"] },
      ],
      "/git/": [
        { text: "git", children: ["unlink","branch.html","remote.html","revert.html"], collapsible: false },
      ],
      "/claudecode/": [
        { text: "Claude Code", children: ["model-switch"], collapsible: false },
      ],
    },
    navbar: [
      { text: "首页", link: "/" },
      {
        text: "后端",
        children: [
          { text: "Java", link: "/java/jvm-fullgc01" },
          { text: "Spring", link: "/spring/aop" },
          { text: "SpringBoot", link: "/springboot/logback" },
          { text: "SpringCloud", link: "/springcloud/resilience4j" },
          { text: "MyBatis", link: "/docs/mybatis/first" },
        ],
      },
      {
        text: "前端框架",
        children: [
          { text: "React", link: "/docs/java/first" },
          { text: "tailwindcss", link: "/docs/htmlcssjs/TailwindCSS/01all" },
          { text: "daisyui", link: "/docs/htmlcssjs/Daisyui/first" },
          { text: "Monaco Editor", link: "/docs/htmlcssjs/monaco/01EditorProps" },
        ],
      },
      {
        text: "数据库",
        children: [
          { text: "MySQL", link: "/mysql/index.html" },
        ],
      },
      { text: "微服务", link: "/docs/microservice/first" },
      { text: "调度任务", link: "/docs/scheduler/first" },
      { text: "算法", link: "/docs/leetcode/first" },
      { text: "LeetCode", link: "/leetcode/dp-list" },
      { text: "Kafka", link: "/kafka/introduction" },
      {
        text: "工具",
        children: [
          { text: "git", link: "/git/unlink" },
          { text: "Claude Code", link: "/claudecode/model-switch" },
        ],
      },
    ],
  }),
});
