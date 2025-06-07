---
title: tooltip对input不生效
data: 2025/04/01
---

在DaisyUI中，tooltip需要应用在包装元素上而不是直接应用在input上。

需要将input元素包装在一个div中，并将tooltip相关的属性移到包装div上。

```html
<div className="tooltip" data-tip={order.customer}>
    <input type="text" className="input input-bordered w-full" value={order.customer} readOnly />
</div>
```