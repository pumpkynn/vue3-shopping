# 🚀 智能电商管理平台

> 基于 Vue 3 + TypeScript + Element Plus 构建的现代化电商后台管理系统

## 📋 项目简介

本项目是一个功能完善的电商后台管理系统，采用前后端分离架构，提供完整的权限管理、商品管理、数据可视化等功能。系统具备响应式设计，支持多角色权限控制，为电商运营提供全方位的管理解决方案。

## ✨ 核心特性

### 🔐 权限管理系统

- **RBAC 权限模型**：基于角色的访问控制
- **多级菜单管理**：支持菜单、按钮、接口三级权限控制
- **动态路由**：根据用户权限动态生成路由
- **用户角色分配**：灵活的用户角色管理

### 🛍️ 商品管理体系

- **品牌管理**：商品品牌信息维护
- **属性管理**：商品属性规格配置
- **SPU/SKU 管理**：标准产品单元和库存量单位管理
- **商品分类**：多级商品分类体系

### 📊 数据可视化

- **实时数据大屏**：基于 ECharts 的数据可视化展示
- **多维度图表**：柱状图、饼图、折线图、地图等多种图表类型
- **实时数据更新**：动态数据展示和更新
- **响应式设计**：适配不同屏幕尺寸

### 🎨 现代化 UI 设计

- **Element Plus**：基于 Vue 3 的组件库
- **Glassmorphism 风格**：毛玻璃效果设计
- **响应式布局**：完美适配各种设备
- **主题定制**：支持明暗主题切换

## 🛠️ 技术栈

### 前端技术

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite** - 下一代前端构建工具
- **Element Plus** - Vue 3 组件库
- **Pinia** - Vue 状态管理库
- **Vue Router** - Vue.js 官方路由管理器

### 数据可视化

- **ECharts** - 数据可视化图表库
- **ECharts Liquidfill** - 水球图插件

### 开发工具

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Stylelint** - 样式代码检查
- **Husky** - Git hooks 工具
- **Commitlint** - 提交信息规范

### 样式处理

- **SCSS** - CSS 预处理器
- **PostCSS** - CSS 后处理器

## 📦 项目结构

```
src/
├── api/                    # API 接口管理
│   ├── acl/               # 权限管理接口
│   ├── product/           # 商品管理接口
│   └── user/              # 用户管理接口
├── assets/                # 静态资源
│   ├── icons/             # SVG 图标
│   └── images/            # 图片资源
├── components/            # 公共组件
├── layout/                # 布局组件
├── router/                # 路由配置
├── store/                 # 状态管理
├── styles/                # 全局样式
├── utils/                 # 工具函数
└── views/                 # 页面组件
    ├── acl/               # 权限管理页面
    ├── product/           # 商品管理页面
    ├── screen/            # 数据大屏页面
    └── home/              # 首页
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0

### 安装依赖

```bash
# 安装 pnpm (如果未安装)
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 启动开发服务器

```bash
# 启动开发服务器
pnpm dev
```

### 构建生产版本

```bash
# 构建测试环境
pnpm build:test

# 构建生产环境
pnpm build:pro
```

### 代码质量检查

```bash
# ESLint 检查
pnpm lint

# 自动修复
pnpm fix

# 代码格式化
pnpm format
```

## 🔧 配置说明

### 环境变量

项目支持多环境配置，主要配置文件：

- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

### 代理配置

开发环境已配置 API 代理，支持跨域请求：

```typescript
// vite.config.ts
proxy: {
  '/api': {
    target: 'http://127.0.0.1:10086',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

## 📱 功能模块

### 1. 权限管理 (ACL)

- **用户管理**：用户信息的增删改查
- **角色管理**：角色权限分配和管理
- **菜单管理**：系统菜单和权限配置

### 2. 商品管理

- **品牌管理**：商品品牌信息维护
- **属性管理**：商品属性规格管理
- **SPU 管理**：标准产品单元管理
- **SKU 管理**：库存量单位管理

### 3. 数据大屏

- **实时监控**：关键业务指标实时展示
- **多维度分析**：用户、商品、销售等多维度数据
- **可视化图表**：丰富的图表展示形式

## 🔐 登录信息

### 默认账号

- **管理员账号**：`admin` / `111111`
- **系统账号**：`system` / `111111`

## 📄 开发规范

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 和 Prettier 代码规范
- 组件命名采用 PascalCase
- 文件命名采用 kebab-case

### 提交规范

项目使用 Conventional Commits 规范：

- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

### 使用条款

- ✅ **允许商业使用**
- ✅ **允许修改和分发**
- ✅ **允许私有使用**
- ⚠️ **需要保留版权声明**
- ⚠️ **不提供任何担保**

### 致谢

如果您使用了本项目，欢迎：

- 给项目点个 ⭐
- 提交 Issue 反馈问题
- 贡献代码改进功能

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件

---

⭐ 如果这个项目对您有帮助，请给我们一个星标！
