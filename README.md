# CDN Vue Template

Kooboo CDN Vue (嵌入 Vue) 模板项目，通过 script 标签引入 Vue 全局版本 + Element Plus，实现后台管理系统。

## 特性

- **CDN Vue** - 通过 `<script src="vue.global.js">` 引入 Vue
- **Element Plus** - 通过 CDN 引入 Element Plus UI 组件库
- **definePage** - 定义页面主组件
- **defineComponent** - 定义可复用组件
- **服务端预渲染** - 使用 SSR 预获取数据，传递给客户端
- **后台管理布局** - 侧边栏 + 顶部导航 + 内容区

## 项目结构

```
cdnVueTemplate/
├── src/
│   ├── api/              # API 定义
│   │   └── products.ts
│   ├── code/              # 业务代码 (TypeScript)
│   │   └── utils.ts
│   ├── css/               # 样式文件
│   │   ├── variables.css
│   │   └── common.css
│   ├── layout/            # 布局文件
│   │   └── main.html
│   ├── page/              # 页面文件
│   │   └── index.html
│   └── view/              # 视图组件
│       ├── common/
│       │   ├── header.html
│       │   ├── footer.html
│       │   ├── sidebar.html      # 侧边栏
│       │   ├── header-bar.html   # 顶部导航
│       │   └── vue-app.html      # Vue 应用初始化
│       └── home/
│           └── page-component.html  # 仪表盘
├── kooboo.d.ts
├── package.json
└── tsconfig.json
```

## 核心概念

### 1. 页面路由

```html
<!-- @k-url / -->
```

### 2. Vue + Element Plus 引入

```html
<!-- 引入 Vue 全局版本 -->
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
<!-- 引入 axios -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<!-- 引入 Element Plus -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus/dist/index.css" />
<script src="https://cdn.jsdelivr.net/npm/element-plus/dist/index.full.prod.js"></script>
<!-- 引入 Element Plus 图标 -->
<script src="https://cdn.jsdelivr.net/npm/@element-plus/icons-vue"></script>
```

### 3. definePage 和 defineComponent

```javascript
// 定义页面主组件 (渲染在 <page-component></page-component> 位置)
definePage({
    setup: function() {
        var count = ref(0)
        return { count }
    },
    template: `
        <div>
            <h1>Count: {{ count }}</h1>
            <el-button @click="count++">增加</el-button>
        </div>
    `
})

// 定义子组件
defineComponent('my-button', {
    template: '<el-button>点击</el-button>'
})
```

### 4. 服务端数据预获取

```html
<!-- 服务端脚本 -->
<script env="server" type="module">
    const products = k.DB.sqlite.products.all()
    k.utils.clientJS.setVariable('__INIT_DATA__', { products })
</script>
```

### 5. 客户端获取数据

```javascript
// 在 Vue 组件中
var initData = window.__INIT_DATA__ || {}
var products = ref(initData.products || [])
```

### 6. Element Plus 组件使用

```javascript
// Element Plus 组件已在全局注册
// 可以直接使用: el-button, el-table, el-form, el-dialog 等

// 消息提示
window.ElMessage.success('操作成功')
window.ElMessage.error('操作失败')

// 确认框
window.ElMessageBox.confirm('确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
})
```

## 常用 API

服务端使用相同的 API：

| API | 说明 |
|-----|------|
| `k.request` | 获取请求参数 |
| `k.response` | 设置响应 |
| `k.session` | 会话存储 |
| `k.DB.sqlite` | SQLite 数据库 |
| `k.commerce` | 电商功能 |
| `k.api` | 自定义 API |

## 安装使用

```bash
pnpm install
pnpm dev
```

## 参考

- 参考项目: `erp/src/view/common.html`
- Element Plus 文档: https://element-plus.org/
