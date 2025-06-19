import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  base: "/",
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
    plugins: ["plausible-analytics"],
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      "/java/": [
        { text: "工具类", children: ["first", "functional", "consumer"] },
        { text: "JVM", children: ["jvm-fullgc01", "jvm-memory-config", "jvmcommand", "arthas", "arthas-redefine"] },
        { text: "线程", children: ["thread-threadpool", "threadpool-factory","threadlocal", "lock"] },
      ],
      "/docs/database/mysql/": [
        { text: "应用", children: ["first", "datatype", "concurrenct"] },
        { text: "原理", children: ["mvcc", "index", "index"] },
        { text: "问题处理", children: ["deadlock", "index", "index"] },
      ],
      "/spring/": [
        { text: "Spring框架", children: ["aop","extension", ] },
      ],
      "/springboot/": [
        { text: "SpringBoot", children: ["logback", "starter", "endpoint"] },
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
      "/kafka/": [
        { text: "Kafka", children: ["introduction", "Kafka安装部署.html", "提示词.html"], collapsible: true  },
        { text: "Kafka Producer", collapsible:true, children: ["指标.html", "生产者配置参数.html", "生产者重要配置参数.html", "发送消息.html", "分区计算.html", "消息追加到消息累加器.html", "粘性分区.html"] },
      ],
      "/git/": [
        { text: "git", children: ["unlink","branch.html","remote.html","revert.html"], collapsible: false },
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
          { text: "MySQL", link: "/docs/database/mysql/first" },
        ],
      },
      { text: "微服务", link: "/docs/microservice/first" },
      { text: "调度任务", link: "/docs/scheduler/first" },
      { text: "算法", link: "/docs/leetcode/first" },
      { text: "Kafka", link: "/kafka/introduction" },
      {
        text: "工具",
        children: [
          { text: "git", link: "/git/unlink" },
        ],
      },
    ],
  }),
  debug: true,
});
