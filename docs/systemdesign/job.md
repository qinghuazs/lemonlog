---
title: 分布式调度任务中心设计
date: 2024-04-16
---

可视化页面

服务信息 —— 引用公共的服务信息

任务类型维护

任务类型

- 所属服务
- 任务类型
- 任务类型编码
- 请求URL

任务实体

- 所属服务
- 任务类型
- 任务名称
- 任务编码
- 任务描述
- 启停用状态
- 下次运行时间
- 执行次数
- 失败次数
- 成功次数

定时规则

- 任务id
- cron表达式
- 开始日期
- 结束日期
- 执行频率：每天 每周 每月  每季度 每年
- 具体的时间点

单次执行任务信息

-  所属任务实体id
- 子任务id
- 执行时间
- 执行结果
- 结束时间
- 详情



