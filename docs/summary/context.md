# 对话摘要

---
### 2026-04-10
**Skills**: init-app

- 系统类型：ERP 系统（制造/商贸企业）
- 完整生成：经营看板 + 财务管理（总账）+ 采购管理（采购订单）+ 销售管理（销售订单）
- 其余模块（库存、生产、组织、报表、消息、设置、移动端）均已生成占位页
- 数据来源：docs/spec/spec.md

**项目结构**:
- 预置组件：src/components/layout/（app-shell、sidebar）、src/components/biz/（data-table、data-filter、form-dialog）
- 根布局：src/routes/__root.tsx（AppShell + 菜单配置）
- 字典数据：src/lib/dict-data.ts（函数在 src/lib/dict.ts 已预置）
- Dashboard：src/routes/index.tsx
- 模块路由：src/routes/{module}/（index.tsx 列表页 + $id.tsx 详情页）
- Mock 数据：src/mock/{module}.ts
- 类型定义：src/types/{module}.ts
