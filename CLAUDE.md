# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。

## 默认使用 ultrathink

## 问题回答时用中文回复

## 示例代码在没有指定的情况下默认用Java，如果指定了代码语言，则使用指定的语言

## 项目概览

这是一个使用 `vuepress-theme-reco` 主题的 VuePress 2.x 文档博客站点。网站部署在 Vercel 上，包含涵盖 Java、Spring、数据库、算法和开发工具等各种主题的技术文档。

## 文档格式

生成的文档必须附带表头信息，类似以下格式:

``` markdown
---
title: 自我介绍
date: 2025-09-15
permalink: /interview/self-introduction.html
tags:
  - 面试
categories:
  - 面试
---
```

## 项目结构

### 核心目录
- `/.vuepress/` - VuePress 配置和自定义
  - `config.ts` - 主要 VuePress 配置，包含主题设置、导航和侧边栏定义
  - `client.ts` - 客户端配置，处理 Vue 错误和 hydration 问题
  - `public/` - 静态资源（logo、图片）
  - `dist/` - 构建输出目录
- `/docs/` - 按主题组织的主要文档内容
  - 涵盖 Java、Spring、数据库、算法等技术文档
- `/blogs/` - 博客文章目录
- `/java/`, `/mysql/`, `/spring/`, `/kafka/`, `/git/`, `/claudecode/` - 特定主题内容目录

## 内容组织
- 文档按技术领域组织（Java、Spring、数据库等）
- 每个主题在 `config.ts` 中有自己的侧边栏配置
- Markdown 文件使用 frontmatter 进行页面特定配置
- 代码块支持行号和语法高亮

## 内容管理

### 添加新文档
1. 在 `/docs/` 下的相应主题目录中创建 markdown 文件
2. 更新 `/.vuepress/config.ts` 中的 `series` 配置，将新文件包含在侧边栏中
3. 如果创建新的主题部分，还需更新 `navbar` 配置

### 文件命名规范
- 使用描述性名称，多词文件用连字符连接
- 同时支持 HTML 文件和 markdown 文件
- 支持在文件名和路径中使用中文字符

