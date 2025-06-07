---
title: Spring扩展点
date: 2024/04/02
---

## Spring扩展点

Spring的扩展点主要从以下进行。

- BeanPostProcessor：监听一个bean在初始化前或初始化后的处理
- ApplicationListener：根据不同的事件在spring加载不同的阶段进行调用这些事件
- InitializingBean
- ApplicationContextAware
- HandlerInterceptor
- MethodInterceptor
- @Aspect
- @RestControlleAdvice的使用
- ResponseBodyAdvice
- WebMvcConfigurer

### BeanPostProcessor

BeanPostProcessor 接口中定义了 postProcessBeforeInitialization 方法和postProcessAfterInitialization 方法，监听一个bean在初始化前或初始化后的处理逻辑。

#### 应用场景

- 监听bean加载的耗时
- 自定义注解的处理

#### 子类

- ApplicationContextAwareProcess
- AutowiredAnnotationBeanPostProcessor —— Autowired注解的实现类

### InitializingBean

InitializingBean 主要功能是Bean初始化完成后执行特定的初始化操作，在实现类被ioc容器初始化完成时，会自动调用覆盖这个接口的afterPropertiesSet方法。

#### 应用场景

- 执行依赖注入后的初始化操作 —— 当Bean的属性值设置完成后，有时候需要执行一些与属性值相关的初始化操作，例如校验属性值的合法性、初始化缓存等。
- 进行资源的初始化和准备 —— 创建链接、加载配置等等
- 启动后的初始化操作 —— 启动定时任务、初始化缓存等等

### ApplicationContextAware

实现ApplicationContextAware接口。通过实现这个接口，spring会自动注入applicationContext上线文对象进来，我们可以根据这个上下文对象获取spring中的一些bean。

#### 应用场景

- 获取Spring容器上下文对象

### HandlerInterceptor

SpringMVC的拦截器，可以实现该接口自定义拦截器（或者直接实现AsyncHandlerInterceptor接口）。该接口中提供了3个方法：

- preHandle —— 在方法被调用前执行 
- postHandle —— 在方法执行后调用 
- afterCompletion —— 在整个请求处理完毕后进行回调

> 备注：HandlerInterceptorAdapter已弃用

#### 应用场景

- 前置校验，如校验登录，校验请求地址，校验token，校验和设置cookie等 —— 大部分都是实现preHandle方法

### MethodInterceptor

在Spring Aop框架中，MethodInterceptor接口被用来拦截指定的方法，对方法进行增强。

### ApplicationListener

根据不同的事件在spring加载不同的阶段进行调用这些事件。

#### 实现类

- ContextClosedEvent  —— 监听spring容器关闭之前要做的处理
- ApplicationStartedEvent —— SpringBoot启动开始时执行的事件
- ApplicationEnvironmentPreparedEvent —— SpringBoot 对应Enviroment已经准备完毕，但此时上下文context还没有创建
- ApplicationPreparedEvent —— SpringBoot 上下文context创建完成，但此时spring中的bean是没有完全加载完成的
- ApplicationFailedEvent —— SpringBoot 启动异常时执行事件
- ServletWebServerInitializedEvent —— Web服务准备完成

### @RestControlleAdvice

@RestControlle的增强版本，一般用于拦截处理返回给web的异常等。

### ResponseBodyAdvice

允许在执行@ResponseBody或ResponseEntity控制器方法之后但在使用HttpMessageConverter编写正文之前自定义响应。

### WebMvcConfigurer

自己定义一些Handler，Interceptor，ViewResolver，MessageConverter。

#### 方法

- addFormatters —— 添加类型转换器和格式化器
- addCorsMappings —— 跨域支持
- addResourceHandlers —— 添加静态资源
- configureMessageConverters —— 配置消息转换器
- addInterceptors —— 添加拦截器

## 执行顺序

- ApplicationContextInitializer
- BeanDefinitionRegistryPostProcessor
- BeanFactoryPostProcessor
- InstantiationAwareBeanPostProcessor
- SmartInstantiationAwareBeanPostProcessor
- BeanFactoryAware
- ApplicationContextAwareProcessor
- BeanNameAware
- PostConstruct注解
- InitializingBean
- FactoryBean
- SmartInitializingSingleton
- CommandLineRunner
- DisposableBean
- ApplicationListener





