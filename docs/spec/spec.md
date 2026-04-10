> **版本**：1.0.0 | **状态**：draft | **更新时间**：2026-04-10T00:00:00+08:00
>
> **来源方案**：通用制造/商贸企业 场景 v1.0.0 版本

---

#### 约定说明

本文档使用以下标准值：
- **布局类型**: `list` / `detail` / `form` / `dashboard` / `steps` / `custom`
- **区块类型**: `table` / `form` / `card` / `cards` / `chart` / `tabs` / `steps` / `timeline` / `description` / `statistic` / `custom`
- **字段类型**: `text` / `textarea` / `number` / `money` / `date` / `select` / `multiselect` / `switch` / `upload` 等
- **字段 Key**: camelCase（如 `supplierCode`）
- **字典 ID**: kebab-case（如 `dict-supplier-level`）
- **图标**: lucide-react 图标名

---

## 一、产品概述

### 1.1 项目背景

客户业务规模持续扩张，但各业务单元系统分散、数据不通，管理半径受限。本期目标是搭建一套覆盖财务、采购、库存、销售、生产的统一 ERP 平台，集团总部可实时查看各子公司经营数据，同时支持移动端审批。

### 1.2 产品目标

- 打通五大业务模块，解决数据孤岛问题，集团层面统一口径
- 支撑集团-子公司多层级架构，各子公司独立核算
- 核心审批流程移到移动端，管理层外出也能处理
- 用工作流引擎替代线下审批，流程可追溯
- 支持 SaaS 和私有化两种部署方式

### 1.3 目标用户

| 角色 | 描述 | 核心诉求 |
|------|------|---------|
| 集团财务总监 | 集团层面统管财务，需要合并报表和跨组织数据查看 | 多组织账簿管理、合并报表、数据穿透 |
| 子公司财务人员 | 负责本公司财务核算，日常凭证录入和账务处理 | 总账、应收应付、固定资产日常操作 |
| 采购经理 | 管理供应商和采购流程，控制采购成本 | 供应商绩效评估、三单匹配、到货跟踪 |
| 仓库管理员 | 负责多仓库出入库和盘点，保证账实相符 | 多仓库调拨、批次追溯、库存预警 |
| 销售主管 | 管理客户和销售订单，跟进发货和回款 | 客户分级信用管控、分期发货、收入确认 |
| 生产主管 | 安排生产计划，管理车间执行和报工 | BOM 快速维护、工单跟踪、移动报工 |
| 管理层/移动办公人员 | 出差频繁，需实时审批和查询关键数据 | 移动端审批、移动报表、移动查询 |

### 1.4 范围定义

**本期包含（P0 + P1）**

- 财务管理：总账、应收应付、固定资产、成本核算
- 采购管理：供应商管理、采购需求、采购订单、入库与发票匹配
- 库存管理：多仓库、批次、库存预警、盘点
- 销售管理：客户管理、销售订单、发货管理、收入确认
- 生产管理：BOM、工艺路线、工单管理、车间执行
- 基础能力：RBAC 权限管理、可视化工作流引擎
- 多组织架构：集团-子公司多层级、独立核算与内部交易、统一报表
- 移动端：审批、库存查询、移动报表
- 数据安全：组织级数据隔离、敏感数据脱敏、审计日志
- 报表中心：经营分析、自定义报表、定时推送
- 消息通知：多渠道通知、统一待办中心

**本期不含（P2 及未提及）**

- API 开放平台：计划 P2 期实现，本期不对外暴露 API
- 深度定制化工作流节点逻辑：标准 BPMN 流程覆盖本期需求
- 与第三方电商/CRM 系统的实时对接：本期聚焦内部业务流程
- 复杂 MRP 高级排程（APS）：本期 MRP 仅输出采购需求

---

## 二、信息架构

### 2.1 站点地图

```
经营看板 (lucide: LayoutDashboard)
  └── /dashboard

财务管理 (lucide: FileText)
  ├── 总账 (/finance/general-ledger)
  ├── 应付账款 (/finance/accounts-payable)
  ├── 应收账款 (/finance/accounts-receivable)
  ├── 固定资产 (/finance/fixed-assets)
  └── 成本核算 (/finance/cost-accounting)

采购管理 (lucide: ShoppingCart)
  ├── 供应商管理 (/procurement/suppliers)
  ├── 采购需求 (/procurement/requisitions)
  ├── 采购订单 (/procurement/orders)
  └── 到货入库 (/procurement/receipts)

库存管理 (lucide: Warehouse)
  ├── 仓库设置 (/inventory/warehouses)
  ├── 库存台账 (/inventory/stock)
  ├── 批次管理 (/inventory/batches)
  ├── 库存预警 (/inventory/alerts)
  └── 盘点管理 (/inventory/stocktaking)

销售管理 (lucide: TrendingUp)
  ├── 客户管理 (/sales/customers)
  ├── 销售订单 (/sales/orders)
  ├── 发货管理 (/sales/deliveries)
  └── 收入确认 (/sales/revenue)

生产管理 (lucide: Factory)
  ├── BOM管理 (/production/bom)
  ├── 工艺路线 (/production/routes)
  ├── 生产工单 (/production/work-orders)
  └── 车间执行 (/production/workshop)

多组织管理 (lucide: Building)
  ├── 组织架构 (/organization/tree)
  ├── 内部交易 (/organization/internal-orders)
  └── 合并报表 (/organization/consolidated-report)

报表中心 (lucide: BarChart3)
  ├── 经营分析 (/reports/dashboard)
  └── 自定义报表 (/reports/designer)

消息中心 (lucide: Bell)
  ├── 站内通知 (/messages/notifications)
  └── 待办中心 (/messages/todos)

系统设置 (lucide: Settings)
  ├── 组织管理 (/settings/organizations)
  ├── 角色权限 (/settings/roles)
  ├── 流程设计 (/settings/workflows)
  ├── 审计日志 (/settings/audit-logs)
  └── API平台 (/settings/api-keys) [P2预留]

移动端 (lucide: Smartphone)
  ├── 移动审批 (/mobile/approvals)
  ├── 库存查询 (/mobile/inventory-query)
  └── 移动报表 (/mobile/reports)
```

### 2.2 导航结构

| 一级菜单 | 二级菜单 | 路由 | 说明 |
|---------|---------|------|------|
| 经营看板 | - | /dashboard | 全模块核心指标汇总 |
| 财务管理 | 总账 | /finance/general-ledger | 凭证录入与账簿查询 |
| 财务管理 | 应付账款 | /finance/accounts-payable | 供应商往来管理 |
| 财务管理 | 应收账款 | /finance/accounts-receivable | 客户往来管理 |
| 财务管理 | 固定资产 | /finance/fixed-assets | 资产卡片与折旧 |
| 财务管理 | 成本核算 | /finance/cost-accounting | 成本计算与分析 |
| 采购管理 | 供应商管理 | /procurement/suppliers | 供应商档案与评级 |
| 采购管理 | 采购需求 | /procurement/requisitions | 需求汇总与申请 |
| 采购管理 | 采购订单 | /procurement/orders | 订单全流程 |
| 采购管理 | 到货入库 | /procurement/receipts | 入库与三单匹配 |
| 库存管理 | 仓库设置 | /inventory/warehouses | 仓库和库位配置 |
| 库存管理 | 库存台账 | /inventory/stock | 实时库存查询 |
| 库存管理 | 批次管理 | /inventory/batches | 批次追溯 |
| 库存管理 | 库存预警 | /inventory/alerts | 预警规则与推送 |
| 库存管理 | 盘点管理 | /inventory/stocktaking | 盘点计划与差异 |
| 销售管理 | 客户管理 | /sales/customers | 客户档案与信用 |
| 销售管理 | 销售订单 | /sales/orders | 订单全流程 |
| 销售管理 | 发货管理 | /sales/deliveries | 发货与物流跟踪 |
| 销售管理 | 收入确认 | /sales/revenue | 按发货/收款确认 |
| 生产管理 | BOM管理 | /production/bom | 物料清单维护 |
| 生产管理 | 工艺路线 | /production/routes | 工序与工时管理 |
| 生产管理 | 生产工单 | /production/work-orders | 工单全流程 |
| 生产管理 | 车间执行 | /production/workshop | 报工与派工 |
| 多组织管理 | 组织架构 | /organization/tree | 组织树配置 |
| 多组织管理 | 内部交易 | /organization/internal-orders | 内部结算单据 |
| 多组织管理 | 合并报表 | /organization/consolidated-report | 集团合并视图 |
| 报表中心 | 经营分析 | /reports/dashboard | 多维经营指标 |
| 报表中心 | 自定义报表 | /reports/designer | 拖拽式报表设计 |
| 消息中心 | 站内通知 | /messages/notifications | 系统通知列表 |
| 消息中心 | 待办中心 | /messages/todos | 统一待办入口 |
| 系统设置 | 角色权限 | /settings/roles | RBAC 权限配置 |
| 系统设置 | 流程设计 | /settings/workflows | 可视化流程设计器 |
| 系统设置 | 审计日志 | /settings/audit-logs | 操作记录追溯 |
| 移动端 | 移动审批 | /mobile/approvals | 核心流程移动审批 |
| 移动端 | 库存查询 | /mobile/inventory-query | 扫码查询 |
| 移动端 | 移动报表 | /mobile/reports | 关键指标看板 |

---

## 三、功能模块

### 3.1 财务管理

> 统一企业财务核算口径，与采购、库存、销售、生产模块联动，自动生成总账凭证，支撑集团多组织独立核算与合并报表。

#### 3.1.1 总账

**路由**: `/finance/general-ledger`
**布局**: `list`
**描述**: 凭证录入、审批、查询，支持自动生成与手工录入并行

##### 凭证列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 凭证号 | voucherNo | text | 是 | 自动生成，格式可配置 |
| 凭证日期 | voucherDate | date | 是 | 默认为当前日期 |
| 凭证字 | voucherType | tag | 否 | 记、转、收、付、银 |
| 摘要 | summary | text | 否 | 首行摘要 |
| 金额 | amount | money | 是 | 借贷平衡校验 |
| 制单人 | createdBy | text | 否 |  |
| 审核状态 | status | status | 是 | 待审核/已审核/已过账 |
| 操作 | - | action | 否 | 查看/编辑/审核/过账 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新增凭证 | primary | toolbar | navigate → /finance/general-ledger/create |
| 批量审核 | default | toolbar | action（批量过账） |
| 凭证模板 | default | toolbar | modal（选择模板快速录入） |
| 导出 | default | toolbar | download |

##### 凭证录入表单（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 凭证字 | voucherType | select | 是 | dict-voucher-type |
| 凭证日期 | voucherDate | date | 是 | 默认当天 |
| 凭证号 | voucherNo | text | 否 | 系统自动 |
| 分录 | entries | custom | 是 | 借贷方科目、金额、摘要 |
| 附件 | attachments | upload | 否 | 影像资料上传 |

##### 业务规则

- 借贷金额必须相等方可保存
- 凭证审核后自动过账（或单独过账操作）
- 采购/销售/生产模块业务单据可自动生成总账凭证
- 多组织场景：凭证归属当前登录组织

#### 3.1.2 应付账款

**路由**: `/finance/accounts-payable`
**布局**: `list`
**描述**: 供应商往来管理，支持账龄分析、预付、核销

##### 应付列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 供应商 | supplierName | text | 是 | 关联供应商档案 |
| 单据类型 | docType | tag | 否 | 采购发票/付款单 |
| 单据号 | docNo | text | 是 |  |
| 应付金额 | payableAmount | money | 是 |  |
| 已付金额 | paidAmount | money | 否 |  |
| 余额 | balance | money | 否 | 自动计算 |
| 应付日期 | dueDate | date | 是 |  |
| 账龄 | agingDays | number | 是 | 超期天数高亮 |
| 状态 | status | status | 是 | 待付款/部分付款/已结清 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新增付款 | primary | toolbar | navigate → /finance/accounts-payable/pay |
| 批量核销 | default | toolbar | action |
| 账龄分析 | default | toolbar | navigate → /finance/accounts-payable/aging |
| 导出 | default | toolbar | download |

##### 业务规则

- 支持预付预收：预付款核销时自动匹配对应发票
- 账龄超过 30/60/90 天分色预警
- 付款审批走工作流，审批通过后生成付款凭证

#### 3.1.3 应收账款

**路由**: `/finance/accounts-receivable`
**布局**: `list`
**描述**: 客户往来管理，支持账龄分析、预收、核销

##### 应收列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 客户 | customerName | text | 是 | 关联客户档案 |
| 单据类型 | docType | tag | 否 | 销售发票/收款单 |
| 单据号 | docNo | text | 是 |  |
| 应收金额 | receivableAmount | money | 是 |  |
| 已收金额 | receivedAmount | money | 否 |  |
| 余额 | balance | money | 否 | 自动计算 |
| 应收日期 | dueDate | date | 是 |  |
| 账龄 | agingDays | number | 是 | 超期高亮 |
| 状态 | status | status | 是 | 待收款/部分收款/已结清 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新增收款 | primary | toolbar | navigate → /finance/accounts-receivable/receive |
| 批量核销 | default | toolbar | action |
| 账龄分析 | default | toolbar | navigate → /finance/accounts-receivable/aging |
| 信用监控 | default | toolbar | navigate → /finance/accounts-receivable/credit |

##### 业务规则

- 收款核销时自动匹配对应销售发票
- 客户信用额度超限自动拦截销售订单提交
- 账龄预警消息自动推送至相关销售负责人

#### 3.1.4 固定资产

**路由**: `/finance/fixed-assets`
**布局**: `list`
**描述**: 资产卡片全生命周期管理，支持折旧计提、调拨、清理

##### 资产列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 资产编号 | assetNo | text | 是 | 自动编码 |
| 资产名称 | assetName | text | 是 |  |
| 资产类别 | assetCategory | tag | 是 | dict-asset-category |
| 购置日期 | purchaseDate | date | 是 |  |
| 原值 | originalValue | money | 是 |  |
| 累计折旧 | accumulatedDepreciation | money | 否 | 自动计算 |
| 净值 | netValue | money | 否 | 自动计算 |
| 状态 | status | status | 是 | 在用/闲置/清理/报废 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新增资产 | primary | toolbar | navigate → /finance/fixed-assets/create |
| 计提折旧 | default | toolbar | action（批量/月结时触发） |
| 资产调拨 | default | row-more | modal |
| 资产清理 | default | row-more | modal |

##### 资产卡片表单（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 资产名称 | assetName | text | 是 |  |
| 资产类别 | assetCategory | select | 是 | dict-asset-category |
| 规格型号 | specification | text | 否 |  |
| 购置日期 | purchaseDate | date | 是 |  |
| 购置金额 | purchaseAmount | money | 是 |  |
| 预计使用年限 | usefulLifeYears | number | 是 | 单位：年 |
| 折旧方法 | depreciationMethod | select | 是 | dict-depreciation-method |
| 残值率 | residualRate | percent | 否 | 默认 5% |
| 使用部门 | usingDepartment | department | 是 |  |
| 存放地点 | location | text | 否 |  |
| 供应商 | supplierName | text | 否 |  |
| 备注 | remark | textarea | 否 |  |

##### 业务规则

- 折旧方法支持年限平均法、双倍余额递减法、工作量法
- 折旧计提自动生成总账凭证
- 资产调拨生成内部调拨单，影响折旧归属部门
- 清理时自动计算资产处置损益并生成凭证

#### 3.1.5 成本核算

**路由**: `/finance/cost-accounting`
**布局**: `dashboard`
**描述**: 生产成本计算与分析，支持标准成本与实际成本两种模式

##### 成本看板（statistic）

- 本期完工产品成本
- 本期在制成本
- 单位产品成本
- 成本差异率

##### 成本明细（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 产品编码 | productCode | text | 是 | 关联物料 |
| 产品名称 | productName | text | 是 |  |
| 产量 | quantity | number | 是 | 本期完工数量 |
| 直接材料 | materialCost | money | 是 | BOM 用量 × 实际单价 |
| 直接人工 | laborCost | money | 是 | 报工工时 × 工资率 |
| 制造费用 | overheadCost | money | 是 | 按工时分摊 |
| 总成本 | totalCost | money | 是 |  |
| 单位成本 | unitCost | money | 是 |  |
| 标准成本 | standardCost | money | 是 | P1 期仅记录 |
| 差异 | variance | money | 是 | 实际-标准 |

##### 业务规则

- 与生产工单联动：完工报告工时自动归集到对应工单
- 标准成本模式下，BOM 物料标准价格锁定，月结时计算差异
- 实际成本模式下，按月加权平均计算物料成本
- 制造费用按工时或机器工时比例分摊

---

### 3.2 采购管理

> 管理从供应商引入到采购入库的全链路，支持 MRP 自动生成采购需求、三单匹配核销。

#### 3.2.1 供应商管理

**路由**: `/procurement/suppliers`
**布局**: `list`
**描述**: 供应商档案、资质与绩效评估

##### 供应商列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 供应商编码 | supplierCode | text | 是 | 自动生成 |
| 供应商名称 | supplierName | text | 是 |  |
| 联系人 | contactPerson | text | 否 |  |
| 联系电话 | contactPhone | text | 否 |  |
| 供应商等级 | supplierLevel | tag | 是 | dict-supplier-level |
| 主营品类 | mainCategory | text | 否 |  |
| 合作状态 | cooperationStatus | status | 是 | 合作中/暂停/淘汰 |
| 合格率 | qualifiedRate | progress | 否 | 近 12 期来料合格率 |
| 评分 | rating | rate | 否 | 综合绩效评分 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新增供应商 | primary | toolbar | navigate → /procurement/suppliers/create |
| 编辑 | default | row | navigate → /procurement/suppliers/edit/:id |
| 绩效评估 | default | row-more | navigate → /procurement/suppliers/:id/rating |

##### 供应商表单（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 供应商名称 | supplierName | text | 是 |  |
| 供应商编码 | supplierCode | text | 否 | 自动生成 |
| 统一社会信用代码 | businessLicenseNo | text | 否 |  |
| 联系人 | contactPerson | text | 否 |  |
| 联系电话 | contactPhone | phone | 否 |  |
| 地址 | address | address | 否 |  |
| 供应商等级 | supplierLevel | select | 是 | dict-supplier-level |
| 主营品类 | mainCategory | text | 否 |  |
| 银行账号 | bankAccount | text | 否 |  |
| 开户行 | bankName | text | 否 |  |
| 资质证照 | certificates | upload | 否 | 多文件，支持到期提醒 |

##### 业务规则

- 供应商等级影响采购审批权限（等级越高审批越简化）
- 资质证照到期前 30 天自动预警
- 绩效评分由来料合格率、交期准确率、价格竞争力加权计算

#### 3.2.2 采购需求

**路由**: `/procurement/requisitions`
**布局**: `list`
**描述**: 汇总 MRP 运算结果与手工需求，生成采购申请

##### 需求列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 需求单号 | requisitionNo | text | 是 | 自动生成 |
| 物料编码 | materialCode | text | 是 | 关联物料档案 |
| 物料名称 | materialName | text | 是 |  |
| 需求数量 | requiredQty | number | 是 |  |
| 需求日期 | requiredDate | date | 是 |  |
| 来源 | source | tag | 否 | MRP/手工 |
| 优先级 | priority | tag | 是 | dict-priority |
| 状态 | status | status | 是 | 待转单/已转单/已关闭 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新增手工需求 | default | toolbar | navigate → /procurement/requisitions/create |
| 批量转采购订单 | primary | toolbar | action |
| MRP 运算 | default | toolbar | action（触发 MRP 计算） |

##### 业务规则

- MRP 运算根据销售订单/生产工单 BOM 自动计算净需求
- 手工需求可单独录入
- 采购需求可合并生成一张采购订单
- 低于最小起订量时提示，但允许强制提交

#### 3.2.3 采购订单

**路由**: `/procurement/orders`
**布局**: `list`
**描述**: 采购订单全生命周期管理，支持到货跟踪与变更

##### 订单列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 订单号 | orderNo | text | 是 | 自动生成 |
| 供应商 | supplierName | text | 是 | 关联供应商档案 |
| 订单日期 | orderDate | date | 是 |  |
| 订单金额 | totalAmount | money | 是 | 含税价 |
| 已到货金额 | receivedAmount | money | 否 | 自动汇总 |
| 到货进度 | deliveryProgress | progress | 否 | 已到/订单总量 |
| 交期 | deliveryDate | date | 是 |  |
| 状态 | status | status | 是 | 待确认/已确认/部分到货/已完成/已关闭 |
| 审批状态 | approvalStatus | status | 是 | 审批流状态 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新增订单 | primary | toolbar | navigate → /procurement/orders/create |
| 编辑 | default | row | navigate（仅未审核状态） |
| 查看 | default | row | navigate → detail |
| 变更 | default | row-more | navigate（生成变更记录） |
| 关闭 | default | row-more | action |
| 审批 | default | row | modal（移动端触发） |

##### 订单表单（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 供应商 | supplierId | select | 是 | dict 来源：供应商列表 |
| 订单日期 | orderDate | date | 是 | 默认当天 |
| 预计交期 | deliveryDate | date | 是 |  |
| 付款方式 | paymentMethod | select | 是 | dict-payment-method |
| 收货仓库 | receivingWarehouseId | select | 是 | dict 来源：仓库列表 |
| 备注 | remark | textarea | 否 |  |
| 订单明细 | orderLines | custom | 是 | 物料/数量/单价/交期 |
| 税率 | taxRate | percent | 否 | 默认 13% |

##### 业务规则

- 新增/变更需走审批流（根据金额阈值自动匹配审批节点）
- 订单关闭需填写关闭原因
- 到货数量超订单量 10% 时需重新审批

#### 3.2.4 到货入库

**路由**: `/procurement/receipts`
**布局**: `list`
**描述**: 到货入库与质检，支持三单匹配（到货单/质检单/发票）

##### 到货列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 到货单号 | receiptNo | text | 是 |  |
| 采购订单号 | orderNo | link | 是 | 跳转订单详情 |
| 供应商 | supplierName | text | 是 |  |
| 到货日期 | receiptDate | date | 是 |  |
| 到货数量 | receivedQty | number | 是 |  |
| 质检数量 | inspectedQty | number | 否 |  |
| 合格数量 | qualifiedQty | number | 否 |  |
| 发票状态 | invoiceStatus | status | 是 | 待匹配/部分匹配/已匹配 |
| 仓库 | warehouseName | text | 否 |  |
| 状态 | status | status | 是 | 待质检/质检中/已入库/部分入库 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新增到货 | primary | toolbar | navigate → /procurement/receipts/create |
| 质检录入 | default | row | modal |
| 入库确认 | default | row | action |
| 发票匹配 | default | row | modal（三单匹配界面） |

##### 业务规则

- 到货后先质检，合格数量才可入库
- 三单匹配：到货数量 + 质检结果 + 发票金额三方比对，差异超过 2% 不允许核销
- 入库后自动生成采购入库单，并触发应付账款生成
- 采购入库单可自动生成总账凭证

---

### 3.3 库存管理

> 多仓库统一管控，支持批次追溯、库存预警和定期盘点。

#### 3.3.1 仓库设置

**路由**: `/inventory/warehouses`
**布局**: `list`
**描述**: 仓库与库位的基础配置

##### 仓库列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 仓库编码 | warehouseCode | text | 是 | 自动生成 |
| 仓库名称 | warehouseName | text | 是 |  |
| 仓库类型 | warehouseType | tag | 是 | 原材料/成品/半成品/不良品 |
| 负责人 | managerName | text | 否 |  |
| 联系电话 | managerPhone | text | 否 |  |
| 地址 | address | text | 否 |  |
| 状态 | status | switch | 是 | 启用/停用 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新增仓库 | primary | toolbar | navigate → /inventory/warehouses/create |
| 库位管理 | default | row | navigate → /inventory/warehouses/:id/locations |
| 编辑 | default | row | navigate |

##### 库位管理

每个仓库下设多个库位（库区→排→位），支持导入导出。

#### 3.3.2 库存台账

**路由**: `/inventory/stock`
**布局**: `list`
**描述**: 实时库存查询，支持多仓库、多维度筛选

##### 库存列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 物料编码 | materialCode | text | 是 |  |
| 物料名称 | materialName | text | 是 |  |
| 规格 | specification | text | 否 |  |
| 仓库 | warehouseName | text | 是 |  |
| 库位 | locationCode | text | 否 |  |
| 批次号 | batchNo | text | 否 | 无批次则显示- |
| 库存数量 | qty | number | 是 |  |
| 可用量 | availableQty | number | 是 | 库存-锁定量 |
| 单位 | unit | text | 否 |  |
| 库存金额 | stockAmount | money | 是 |  |
| 保质期 | expiryDate | date | 否 |  |
| 状态 | status | tag | 否 | 正常/冻结/待检 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 筛选 | default | toolbar | form（仓库/物料/批次筛选） |
| 导出 | default | toolbar | download |
| 库存台账明细 | default | row | navigate → /inventory/stock/:materialId/ledger |
| 调拨 | default | row | modal（仓库调拨申请） |

##### 业务规则

- 冻结库存不参与可用量计算
- 批次物料批次间不可混用
- 调拨单需审批，调出仓库出库后调入仓库入库

#### 3.3.3 批次管理

**路由**: `/inventory/batches`
**布局**: `list`
**描述**: 批次号全程追溯，支持先进先出

##### 批次列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 批次号 | batchNo | text | 是 | 自动或手工生成 |
| 物料编码 | materialCode | text | 是 |  |
| 物料名称 | materialName | text | 是 |  |
| 仓库 | warehouseName | text | 是 |  |
| 库位 | locationCode | text | 否 |  |
| 批次数量 | batchQty | number | 是 |  |
| 生产/入库日期 | inboundDate | date | 是 |  |
| 保质期 | expiryDate | date | 否 |  |
| 供应商 | supplierName | text | 否 | 采购批次显示 |
| 追溯 | - | action | 否 | 查看批次流转记录 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 批次追溯 | default | row | navigate → /inventory/batches/:batchNo/trace |
| 导出 | default | toolbar | download |

##### 业务规则

- 批次号支持扫码录入
- 出库默认按先进先出（FIFO）自动推荐批次
- 保质期失效前 30 天自动预警
- 批次追溯可查看来源（采购/生产入库）和去向（销售/生产领料）

#### 3.3.4 库存预警

**路由**: `/inventory/alerts`
**布局**: `list`
**描述**: 最低/最高库存预警与呆滞料预警

##### 预警列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 物料 | materialName | text | 是 |  |
| 仓库 | warehouseName | text | 是 |  |
| 当前库存 | currentQty | number | 是 |  |
| 最低库存 | minQty | number | 否 | 预警规则 |
| 最高库存 | maxQty | number | 否 | 预警规则 |
| 预警类型 | alertType | tag | 是 | 低于最低/高于最高/呆滞 |
| 预警时间 | alertTime | datetime | 是 |  |
| 已通知 | notified | switch | 否 |  |
| 操作 | - | action | 否 | 处理/关闭 |

##### 业务规则

- 低于最低库存或呆滞（90 天无进出）自动生成预警记录
- 预警消息通过消息中心推送至相关采购/仓库人员
- 呆滞定义可配置：默认 90 天无进出动态调整

#### 3.3.5 盘点管理

**路由**: `/inventory/stocktaking`
**布局**: `list`
**描述**: 定期盘点与抽盘，差异处理

##### 盘点计划列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 盘点单号 | stocktakeNo | text | 是 |  |
| 盘点类型 | stocktakeType | tag | 是 | 全盘/抽盘/动态盘点 |
| 盘点仓库 | warehouseName | text | 是 |  |
| 盘点日期 | stocktakeDate | date | 是 |  |
| 盘点状态 | status | status | 是 | 盘点中/已审核/已过账 |
| 盘点人员 | stocktakeBy | text | 否 |  |
| 差异数量 | diffQty | number | 否 | 正数盘盈/负数盘亏 |
| 差异金额 | diffAmount | money | 否 |  |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新建盘点 | primary | toolbar | navigate → /inventory/stocktaking/create |
| 开始盘点 | default | row | action（冻结实时库存） |
| 录入盘点数据 | default | row | navigate → 盘点明细 |
| 审核 | default | row | action（确认差异） |
| 过账 | default | row | action（生成报溢报损单） |

##### 业务规则

- 盘点期间冻结该仓库实时库存操作
- 差异金额自动生成报溢报损凭证
- 抽盘比例可配置（如随机抽 20% 物料）

---

### 3.4 销售管理

> 覆盖从客户管理到收入确认的完整销售链路，支持分期发货、信用管控。

#### 3.4.1 客户管理

**路由**: `/sales/customers`
**布局**: `list`
**描述**: 客户档案、分类分级与信用额度管理

##### 客户列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 客户编码 | customerCode | text | 是 | 自动生成 |
| 客户名称 | customerName | text | 是 |  |
| 客户类型 | customerType | tag | 是 | 终端/渠道/集团客户 |
| 客户等级 | customerLevel | tag | 是 | dict-customer-level |
| 联系人 | contactPerson | text | 否 |  |
| 联系电话 | contactPhone | text | 否 |  |
| 信用额度 | creditLimit | money | 是 |  |
| 已用额度 | usedCredit | money | 否 |  |
| 可用额度 | availableCredit | money | 否 | 自动计算 |
| 合作状态 | cooperationStatus | status | 是 | 合作中/暂停 |
| 累计销售额 | totalSalesAmount | money | 是 | 历史累计 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新增客户 | primary | toolbar | navigate → /sales/customers/create |
| 编辑 | default | row | navigate |
| 信用调整 | default | row-more | modal |
| 查看交易 | default | row-more | navigate → /sales/customers/:id/transactions |

##### 客户表单（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 客户名称 | customerName | text | 是 |  |
| 客户类型 | customerType | select | 是 | dict-customer-type |
| 客户等级 | customerLevel | select | 是 | dict-customer-level |
| 联系人 | contactPerson | text | 否 |  |
| 联系电话 | contactPhone | phone | 否 |  |
| 地址 | address | address | 否 |  |
| 信用额度 | creditLimit | money | 否 | 默认 0 表示不限 |
| 账期天数 | paymentDays | number | 否 | 默认 30 天 |
| 税号 | taxNo | text | 否 |  |
| 开票信息 | invoiceInfo | textarea | 否 |  |

##### 业务规则

- 信用额度超限自动拦截销售订单提交
- 客户等级影响价格策略和审批流程
- 应收账款超期自动降低客户信用评级

#### 3.4.2 销售订单

**路由**: `/sales/orders`
**布局**: `list`
**描述**: 销售订单录入、变更与拆分，支持分期发货

##### 订单列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 订单号 | orderNo | text | 是 | 自动生成 |
| 客户 | customerName | text | 是 |  |
| 订单日期 | orderDate | date | 是 |  |
| 订单金额 | totalAmount | money | 是 | 含税 |
| 已发货金额 | shippedAmount | money | 否 |  |
| 已回款金额 | receivedAmount | money | 否 |  |
| 交期 | deliveryDate | date | 是 |  |
| 状态 | status | status | 是 | 待确认/已确认/部分发货/已完成/已关闭 |
| 审批状态 | approvalStatus | status | 是 |  |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新增订单 | primary | toolbar | navigate → /sales/orders/create |
| 编辑 | default | row | navigate（仅未审核） |
| 查看 | default | row | navigate |
| 变更 | default | row-more | modal（生成变更记录） |
| 分拆 | default | row-more | modal |
| 审批 | default | row | modal |

##### 订单明细（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 客户 | customerId | select | 是 | dict 来源：客户列表 |
| 订单日期 | orderDate | date | 是 | 默认当天 |
| 预交期 | deliveryDate | date | 是 |  |
| 付款方式 | paymentMethod | select | 是 | dict-payment-method |
| 收货地址 | deliveryAddress | address | 是 |  |
| 订单明细 | orderLines | custom | 是 | 物料/数量/单价/交期 |
| 税率 | taxRate | percent | 否 | 默认 13% |
| 备注 | remark | textarea | 否 |  |

##### 业务规则

- 提交时自动检查客户信用额度
- 订单变更记录完整版本历史
- 支持部分发货（发货数量可分多次）和部分收款
- 订单关闭需审批

#### 3.4.3 发货管理

**路由**: `/sales/deliveries`
**布局**: `list`
**描述**: 发货计划、物流跟踪与签收确认

##### 发货列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 发货单号 | deliveryNo | text | 是 |  |
| 销售订单号 | orderNo | link | 是 | 关联订单 |
| 客户 | customerName | text | 是 |  |
| 发货数量 | shippedQty | number | 是 |  |
| 收货地址 | deliveryAddress | text | 否 |  |
| 物流公司 | logisticsCompany | text | 否 |  |
| 物流单号 | trackingNo | text | 否 |  |
| 发货日期 | shippedDate | date | 是 |  |
| 签收状态 | signStatus | status | 是 | 待发货/在途中/已签收/异常 |
| 操作 | - | action | 否 | 发货/跟踪/确认签收 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 创建发货单 | primary | toolbar | navigate → /sales/deliveries/create |
| 发货 | default | row | action（触发库存扣减） |
| 填写物流 | default | row | modal |
| 确认签收 | default | row | action |

##### 业务规则

- 发货自动扣减库存（可用量校验）
- 发货后自动触发收入确认（按发货确认模式）
- 物流单号支持主流快递公司自动追踪
- 签收异常自动预警

#### 3.4.4 收入确认

**路由**: `/sales/revenue`
**布局**: `list`
**描述**: 按发货或收款进行收入确认

##### 收入确认列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 确认单号 | revenueNo | text | 是 |  |
| 关联发货单 | deliveryNo | link | 是 |  |
| 客户 | customerName | text | 是 |  |
| 确认金额 | confirmAmount | money | 是 |  |
| 税率 | taxRate | percent | 否 |  |
| 税额 | taxAmount | money | 否 | 自动计算 |
| 不含税金额 | netAmount | money | 否 | 自动计算 |
| 确认方式 | confirmMethod | tag | 是 | 发货确认/收款确认 |
| 确认日期 | confirmDate | date | 是 |  |
| 凭证状态 | voucherStatus | status | 是 | 已生成/未生成 |
| 操作 | - | action | 否 | 生成凭证/查看 |

##### 业务规则

- 支持按发货确认（发货即确认收入）和按收款确认两种模式
- 确认后自动生成销售出库单和应收凭证
- 收款确认模式下，款项到账才确认收入

---

### 3.5 生产管理

> BOM 维护、工单全流程管理与车间执行，支持移动端报工。

#### 3.5.1 BOM管理

**路由**: `/production/bom`
**布局**: `list`
**描述**: 多层物料清单维护，支持替代料和版本管理

##### BOM列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| BOM编码 | bomNo | text | 是 | 自动生成 |
| 产品编码 | productCode | text | 是 | 关联产成品 |
| 产品名称 | productName | text | 是 |  |
| BOM版本 | bomVersion | text | 是 | 支持多版本 |
| 版本状态 | versionStatus | tag | 是 | 草稿/生效/禁用 |
| 生效日期 | effectiveDate | date | 是 |  |
| 层级深度 | bomLevel | number | 否 | 最大子项层级 |
| 子项数量 | itemCount | number | 否 | 直接子项数量 |
| 操作 | - | action | 否 | 查看/编辑/复制/禁用 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新增BOM | primary | toolbar | navigate → /production/bom/create |
| BOM对比 | default | toolbar | modal |
| 导入BOM | default | toolbar | upload |

##### BOM明细（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 产品 | productId | select | 是 | 产成品物料 |
| BOM版本 | bomVersion | text | 是 |  |
| 生效日期 | effectiveDate | date | 是 |  |
| 工艺路线 | routeId | select | 否 | 关联工艺路线 |
| 损耗率 | scrapRate | percent | 否 | 默认 0 |
| 子项明细 | bomLines | custom | 是 | 物料/用量/工序/替代料 |

##### 业务规则

- BOM 支持多层嵌套（最多 10 层）
- 替代料：同一母件可配置多个替代物料，优先使用主料
- 版本变更保留历史版本，支持生效日期切换
- BOM 变更自动通知相关生产工单

#### 3.5.2 工艺路线

**路由**: `/production/routes`
**布局**: `list`
**描述**: 工序定义、工时定额与工艺参数

##### 工艺路线列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 路线编号 | routeNo | text | 是 |  |
| 路线名称 | routeName | text | 是 |  |
| 关联产品 | productName | text | 是 |  |
| 工序数量 | operationCount | number | 否 |  |
| 标准工时 | standardHours | number | 否 | 总标准工时 |
| 状态 | status | status | 是 |  |

##### 工艺路线表单（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 路线名称 | routeName | text | 是 |  |
| 工序明细 | operations | custom | 是 | 工序序号/名称/工作中心/标准工时/工艺参数 |

##### 业务规则

- 工序顺序决定生产顺序
- 标准工时用于成本核算和产能规划
- 工艺参数可关联质量检测标准

#### 3.5.3 生产工单

**路由**: `/production/work-orders`
**布局**: `list`
**描述**: 工单下达、领料、报工、完工全流程

##### 工单列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 工单编号 | workOrderNo | text | 是 | 自动生成 |
| 产品 | productName | text | 是 |  |
| 计划数量 | plannedQty | number | 是 |  |
| 已完成数量 | completedQty | number | 是 |  |
| 完成进度 | completionRate | progress | 否 |  |
| 计划开工 | plannedStartDate | date | 是 |  |
| 计划完工 | plannedEndDate | date | 是 |  |
| 实际开工 | actualStartDate | date | 否 |  |
| 实际完工 | actualEndDate | date | 否 |  |
| 状态 | status | status | 是 | 待下达/已下达/生产中/已完工/已关闭 |
| 优先级 | priority | tag | 是 | dict-priority |
| 工艺路线 | routeName | text | 否 |  |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新建工单 | primary | toolbar | navigate → /production/work-orders/create |
| 下达 | default | row | action |
| 领料 | default | row | modal（按 BOM 展开领料） |
| 报工 | default | row | modal（移动端为主） |
| 完工 | default | row | action |
| 关闭 | default | row-more | action |

##### 工单表单（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 产品 | productId | select | 是 | 关联 BOM |
| BOM版本 | bomVersion | select | 是 |  |
| 计划数量 | plannedQty | number | 是 |  |
| 计划开工日期 | plannedStartDate | date | 是 |  |
| 计划完工日期 | plannedEndDate | date | 是 |  |
| 优先级 | priority | select | 否 | dict-priority |
| 备注 | remark | textarea | 否 |  |

##### 业务规则

- 下达时自动锁定 BOM 版本
- 领料数量不允许超过 BOM 用量 × (1+损耗率)
- 报工后自动归集人工成本到工单
- 工单完工后触发入库（产成品入库）
- 完工报工自动计算在制成本

#### 3.5.4 车间执行

**路由**: `/production/workshop`
**布局**: `list`
**描述**: 工单派工与报工，移动端为主要操作入口

##### 车间看板（dashboard）

- 今日工单执行状态统计
- 各工序产出统计
- 产能利用率

##### 工单执行列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 工单号 | workOrderNo | link | 是 |  |
| 工序 | operationName | text | 是 | 当前工序 |
| 派工数量 | dispatchedQty | number | 是 |  |
| 已报工数量 | reportedQty | number | 是 |  |
| 合格数量 | qualifiedQty | number | 是 |  |
| 不良数量 | rejectQty | number | 否 |  |
| 报工工人 | reportedBy | text | 否 |  |
| 报工时间 | reportTime | datetime | 否 |  |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 派工 | primary | toolbar | modal（指派工序给工人） |
| 移动报工 | primary | toolbar | navigate → /production/workshop/mobile（PC 端入口） |
| 报工 | default | row | modal |

##### 移动报工界面

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 工序 | operationName | text | 否 | 当前待报工工序 |
| 报工数量 | reportedQty | number | 是 | 本次完成数量 |
| 合格数量 | qualifiedQty | number | 是 |  |
| 不良数量 | rejectQty | number | 否 |  |
| 工时 | workingHours | number | 否 | 本次报工工时 |
| 备注 | remark | textarea | 否 |  |

##### 业务规则

- 报工后自动推送下一工序派工任务
- 不良数量超过阈值（可配置）自动触发质量评审
- 报工数据实时同步到工单进度

---

### 3.6 多组织管理

> 支撑集团-子公司/事业部多层级架构，支持独立核算与内部交易。

#### 3.6.1 组织架构

**路由**: `/organization/tree`
**布局**: `custom`
**描述**: 组织树配置，集团-子公司/事业部-部门多层级

##### 组织树（custom/tree）

- 树形展示组织层级关系
- 支持拖拽调整组织归属（需权限）
- 点击节点查看组织详情

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 新增组织 | primary | toolbar | modal（选择类型：集团/子公司/事业部/部门） |
| 编辑 | default | row | modal |
| 禁用 | default | row | action |
| 查看下级 | default | row | expand（展开下级组织） |

##### 组织表单（form）

| 字段 | fieldKey | 类型 | 必填 | 说明 |
|------|----------|------|------|------|
| 组织名称 | orgName | text | 是 |  |
| 组织类型 | orgType | select | 是 | dict-org-type |
| 上级组织 | parentOrgId | treeselect | 否 | 顶级则不选 |
| 组织编码 | orgCode | text | 是 | 唯一 |
| 负责人 | managerId | user | 否 |  |
| 利润中心 | profitCenterId | select | 否 | 独立核算时填写 |
| 账簿 | ledgerId | select | 否 | 关联独立账簿 |
| 状态 | status | switch | 是 | 启用/停用 |

##### 业务规则

- 组织停用时自动检查是否有未关闭业务单据
- 利润中心设置后，该组织的收入/成本独立核算
- 内部交易需配置内部结算价

#### 3.6.2 内部交易

**路由**: `/organization/internal-orders`
**布局**: `list`
**描述**: 子公司/事业部之间的内部采购与销售

##### 内部交易列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 交易单号 | internalOrderNo | text | 是 |  |
| 销售组织 | sellingOrgName | text | 是 | 内部卖方 |
| 采购组织 | buyingOrgName | text | 是 | 内部买方 |
| 交易金额 | transactionAmount | money | 是 |  |
| 交易日期 | transactionDate | date | 是 |  |
| 状态 | status | status | 是 | 待确认/已确认/已结算 |

##### 业务规则

- 内部交易自动生成内部应收/应付
- 月末内部交易自动生成内部结转凭证
- 内部结算价可按转移价政策自动计算

#### 3.6.3 合并报表

**路由**: `/organization/consolidated-report`
**布局**: `dashboard`
**描述**: 集团层面自动汇总合并财务报表

##### 合并报表看板（dashboard）

- 集团总收入
- 集团总利润
- 各子公司贡献占比
- 内部交易抵消汇总

##### 业务规则

- 数据按组织隔离，仅集团层级可查看合并报表
- 自动抵销内部交易金额
- 支持穿透到子公司明细

---

### 3.7 权限管理与工作流

> 基于 RBAC 的功能权限与数据权限双重控制，可视化流程设计器。

#### 3.7.1 角色权限

**路由**: `/settings/roles`
**布局**: `list`
**描述**: 角色定义与权限分配

##### 角色列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 角色编码 | roleCode | text | 是 |  |
| 角色名称 | roleName | text | 是 |  |
| 角色类型 | roleType | tag | 是 | 系统角色/业务角色/自定义角色 |
| 描述 | description | text | 否 |  |
| 人数 | userCount | number | 否 | 绑定用户数 |
| 操作 | - | action | 否 | 编辑/复制/删除 |

##### 权限配置（form + tree）

| 配置维度 | 说明 |
|---------|------|
| 功能权限 | 模块级、页面级、操作级权限树 |
| 数据权限 | 组织级（本组织/下级组织/全部组织） |
| 字段权限 | 字段级读写控制（如：敏感字段对普通用户隐藏） |

##### 预置角色

| 角色 | 功能权限 | 数据权限 |
|------|---------|---------|
| 集团管理员 | 全模块 | 全部组织 |
| 子公司财务 | 财务全模块 | 本组织及下级 |
| 采购主管 | 采购+库存 | 本组织 |
| 仓库管理员 | 库存全模块 | 本仓库 |
| 销售主管 | 销售全模块 | 本组织 |
| 生产主管 | 生产全模块 | 本组织 |
| 普通员工 | 基础操作 | 本人数据 |

#### 3.7.2 流程设计

**路由**: `/settings/workflows`
**布局**: `list`
**描述**: 可视化流程设计器，配置审批流

##### 流程列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 流程名称 | workflowName | text | 是 |  |
| 关联业务 | businessType | tag | 是 | dict-workflow-business-type |
| 节点数 | nodeCount | number | 否 |  |
| 版本 | version | text | 否 |  |
| 状态 | status | status | 是 | 草稿/已发布/已禁用 |
| 操作 | - | action | 否 | 设计/发布/禁用/查看 |

##### 流程设计器（custom/canvas）

- 拖拽式节点：开始节点、审批节点（单人/会签/加签）、条件节点、结束节点
- 连接线配置：审批通过/驳回/转交
- 条件表达式：金额阈值、组织、申请人类别等
- 审批人规则：指定人/部门负责人/角色/发起人自选

##### 业务规则

- 流程发布后不可直接修改，需新建版本
- 条件节点支持 AND/OR 组合条件
- 会签节点：全部审批人通过才通过；或签节点：一票通过即通过
- 驳回支持驳回到发起人/上一节点/指定节点

---

### 3.8 数据安全（P1）

> 组织级数据隔离与敏感数据保护，操作审计追溯。

#### 3.8.1 审计日志

**路由**: `/settings/audit-logs`
**布局**: `list`
**描述**: 核心业务操作全程记录

##### 审计日志列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 操作时间 | operateTime | datetime | 是 |  |
| 操作人 | operatorName | text | 是 |  |
| 操作人组织 | operatorOrg | text | 否 |  |
| 操作类型 | operateType | tag | 是 | dict-operate-type |
| 操作模块 | operateModule | text | 是 |  |
| 操作描述 | operateDesc | text | 否 |  |
| 操作对象 | operateObject | text | 否 | 单据编号等 |
| IP地址 | ipAddress | text | 否 |  |
| 操作详情 | operateDetail | link | 否 | 展开查看变更前后 |

##### 操作

| 按钮 | 类型 | 位置 | 行为 |
|------|------|------|------|
| 筛选 | default | toolbar | form（时间/模块/操作人/类型） |
| 导出 | default | toolbar | download |

##### 业务规则

- 操作类型覆盖：登录、登出、新增、编辑、删除、审批、导入、导出
- 日志保留期限可配置（默认 2 年）
- 敏感操作（删除、权限变更）自动发送通知

---

### 3.9 报表中心（P1）

> 经营分析、自定义报表设计与定时推送。

#### 3.9.1 经营分析

**路由**: `/reports/dashboard`
**布局**: `dashboard`
**描述**: 多维度经营指标可视化

##### 看板（statistic + chart）

| 指标 | 说明 |
|------|------|
| 本月销售收入 | 含同比环比 |
| 本月采购成本 | 含占比 |
| 库存周转天数 | 本期 |
| 应收账款账龄分布 | 超期结构 |
| 销售趋势 | 折线图（月度） |
| 收入成本对比 | 柱状图（月度） |
| 库存金额分布 | 饼图（按仓库/品类） |

##### 维度筛选

支持按组织、时间范围（本月/本季/本年/自定义）筛选。

#### 3.9.2 自定义报表

**路由**: `/reports/designer`
**布局**: `custom`
**描述**: 拖拽式报表设计器

##### 设计器功能

| 功能 | 说明 |
|------|------|
| 数据源配置 | 选择主数据（物料/客户/供应商） |
| 维度配置 | 拖拽字段到行列 |
| 度量配置 | 聚合方式：求和/计数/平均/最大/最小 |
| 筛选器 | 添加报表级筛选条件 |
| 图表绑定 | 选择绑定柱状图/折线图/饼图/表格 |
| 定时推送 | 配置推送周期和接收人 |

##### 业务规则

- 报表元数据存储在数据库，支持版本管理
- 定时推送通过消息中心通道发送

---

### 3.10 消息中心（P1）

> 多渠道通知与统一待办入口。

#### 3.10.1 通知列表

**路由**: `/messages/notifications`
**布局**: `list`
**描述**: 站内信、邮件、APP 推送通知汇总

##### 通知列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 通知时间 | notifyTime | datetime | 是 |  |
| 标题 | title | text | 是 |  |
| 内容摘要 | contentSummary | text | 否 | 前 50 字 |
| 通知类型 | notifyType | tag | 是 | dict-notify-type |
| 已读 | isRead | switch | 是 |  |
| 操作 | - | action | 否 | 查看/删除 |

##### 业务规则

- 通知渠道可配置：站内信/邮件/APP 推送
- 库存预警、审批通知、到期提醒自动推送

#### 3.10.2 待办中心

**路由**: `/messages/todos`
**布局**: `list`
**描述**: 统一待办入口，所有审批和待办任务聚合

##### 待办列表（table）

| 列名 | fieldKey | 列类型 | 可排序 | 说明 |
|------|----------|--------|--------|------|
| 待办时间 | todoTime | datetime | 是 |  |
| 待办类型 | todoType | tag | 是 | 审批/通知/预警 |
| 来源单据 | sourceDoc | link | 是 | 跳转详情 |
| 来源模块 | sourceModule | text | 是 |  |
| 紧急程度 | urgency | tag | 是 | 普通/紧急 |
| 截止时间 | deadline | date | 否 | 超期高亮 |
| 操作 | - | action | 否 | 审批/处理 |

##### 业务规则

- 审批类待办点击直接进入审批界面
- 超期待办自动升级为紧急
- 待办处理后自动从列表移除

---

### 3.11 移动端（P0）

> 移动端 APP（iOS/Android），支持核心审批、库存查询与移动报表。

#### 3.11.1 移动审批

**路由**: `/mobile/approvals`
**布局**: `list`
**描述**: 采购订单、销售订单、付款申请等核心流程移动审批

##### 功能清单

| 功能 | 说明 |
|------|------|
| 待我审批 | 按紧急程度和截止时间排序 |
| 审批详情 | 查看单据全部内容（金额、附件、审批历史） |
| 审批操作 | 同意/驳回/转交/加签 |
| 审批意见 | 必填，支持语音输入 |
| 快捷审批 | 金额低于阈值时一键审批（可配置） |
| 审批历史 | 查看完整审批节点和每节点结果 |
| 我的申请 | 查看我发起的申请及当前状态 |

#### 3.11.2 库存查询

**路由**: `/mobile/inventory-query`
**布局**: `custom`
**描述**: 扫码查询库存、批次、库位信息

##### 功能清单

| 功能 | 说明 |
|------|------|
| 扫码查询 | 扫物料条码/批次号查询库存 |
| 库存详情 | 仓库/库位/批次/保质期/可用量 |
| 批次追溯 | 扫码后查看批次来源与去向 |
| 库存预警提醒 | 低于最低库存时主动推送 |

#### 3.11.3 移动报表

**路由**: `/mobile/reports`
**布局**: `dashboard`
**描述**: 经营看板与关键指标移动端可视化

##### 功能清单

| 功能 | 说明 |
|------|------|
| 经营看板 | 收入、成本、库存、资金流核心指标 |
| 销售进度 | 本月销售目标达成率 |
| 回款情况 | 应收账款回收进度 |
| 生产进度 | 今日工单完成率 |
| 库存预警 | 低于最低库存的物料列表 |
| 数据穿透 | 点击指标跳转明细 |

---

## 四、全局规则

### 4.1 角色权限

| 角色 | 描述 | 模块权限 |
|------|------|---------|
| 集团管理员 | 集团层面超级管理员 | 全模块读写，可管理组织和权限 |
| 子公司管理员 | 单个子公司管理员 | 本子公司全模块，可管理本组织用户 |
| 财务经理 | 财务模块负责人 | 财务全模块读写 |
| 财务专员 | 日常账务处理 | 总账/应收应付/固定资产操作 |
| 采购经理 | 采购管理负责人 | 采购+库存模块读写 |
| 采购员 | 采购执行 | 供应商管理、采购订单操作 |
| 仓库管理员 | 仓库日常管理 | 库存台账、出入库、盘点操作 |
| 销售经理 | 销售管理负责人 | 销售全模块读写 |
| 销售员 | 销售执行 | 客户管理、销售订单操作 |
| 生产经理 | 生产管理负责人 | 生产全模块读写 |
| 车间工人 | 报工操作 | 车间执行-报工操作 |
| 报表用户 | 数据查看 | 报表中心只读 |
| 普通员工 | 基础功能 | 按岗位分配基础模块 |

**权限控制原则**：
- 数据权限按组织架构隔离（集团可看子公司，子公司不可越级）
- 敏感字段（价格、成本、信用额度）对普通员工隐藏
- 审批权限不可委托（工作流配置中明确指定）

### 4.2 数据字典

#### dict-voucher-type（凭证字）

| 值 | 显示 | 颜色 |
|----|------|------|
|记 | 记账 | blue |
|转 | 转账 | green |
|收 | 收款 | orange |
|付 | 付款 | red |
|银 | 银行 | purple |

#### dict-supplier-level（供应商等级）

| 值 | 显示 | 颜色 |
|----|------|------|
| A | A级（优质） | green |
| B | B级（良好） | blue |
| C | C级（合格） | orange |
| D | D级（待观察） | red |

#### dict-customer-level（客户等级）

| 值 | 显示 | 颜色 |
|----|------|------|
| VIP | VIP客户 | gold |
| A | A级客户 | green |
| B | B级客户 | blue |
| C | C级客户 | orange |
| D | D级客户 | gray |

#### dict-customer-type（客户类型）

| 值 | 显示 | 颜色 |
|----|------|------|
|终端 | 终端客户 | blue |
|渠道 | 渠道商 | green |
|集团 | 集团客户 | purple |

#### dict-asset-category（资产类别）

| 值 | 显示 | 颜色 |
|----|------|------|
| 房屋建筑物 | 房屋建筑物 | blue |
| 机器设备 | 机器设备 | green |
| 运输设备 | 运输设备 | orange |
| 电子设备 | 电子设备 | purple |
| 办公家具 | 办公家具 | gray |

#### dict-depreciation-method（折旧方法）

| 值 | 显示 |
|----|------|
|年限平均法 | 年限平均法 |
|双倍余额递减法 | 双倍余额递减法 |
|工作量法 | 工作量法 |

#### dict-priority（优先级）

| 值 | 显示 | 颜色 |
|----|------|------|
|普通 | 普通 | gray |
|紧急 | 紧急 | orange |
|特急 | 特急 | red |

#### dict-payment-method（付款方式）

| 值 | 显示 |
|----|------|
| 款到发货 | 款到发货 |
| 货到付款 | 货到付款 |
| 月结30天 | 月结30天 |
| 月结60天 | 月结60天 |
| 票到付款 | 票到付款 |

#### dict-org-type（组织类型）

| 值 | 显示 |
|----|------|
|集团 | 集团 |
|子公司 | 子公司 |
|事业部 | 事业部 |
|部门 | 部门 |

#### dict-workflow-business-type（审批流业务类型）

| 值 | 显示 |
|----|------|
|采购订单审批 | 采购订单审批 |
|销售订单审批 | 销售订单审批 |
|付款申请审批 | 付款申请审批 |
|收款确认审批 | 收款确认审批 |
|采购入库审批 | 采购入库审批 |
|销售出库审批 | 销售出库审批 |
|工单下达审批 | 工单下达审批 |
|盘点确认审批 | 盘点确认审批 |
|调拨审批 | 调拨审批 |

#### dict-operate-type（操作类型）

| 值 | 显示 | 颜色 |
|----|------|------|
|登录 | 登录 | blue |
|登出 | 登出 | gray |
|新增 | 新增 | green |
|编辑 | 编辑 | blue |
|删除 | 删除 | red |
|审批 | 审批 | orange |
|导入 | 导入 | purple |
|导出 | 导出 | teal |

#### dict-notify-type（通知类型）

| 值 | 显示 |
|----|------|
|系统通知 | 系统通知 |
|审批通知 | 审批通知 |
|库存预警 | 库存预警 |
|到期提醒 | 到期提醒 |
|消息提醒 | 消息提醒 |

### 4.3 状态流转

#### 凭证

| 当前状态 | 操作 | 目标状态 | 条件 |
|---------|------|---------|------|
| 待审核 | 审核 | 已审核 | 审核人操作 |
| 已审核 | 过账 | 已过账 | 凭证借贷平衡 |
| 已审核 | 取消审核 | 待审核 | 审核人可撤销 |
| 已过账 | 凭证红冲 | 已冲销 | 生成红字凭证冲销 |

#### 采购订单

| 当前状态 | 操作 | 目标状态 | 条件 |
|---------|------|---------|------|
| 待确认 | 确认 | 已确认 | 审批通过 |
| 已确认 | 部分到货 | 部分到货 | 有到货记录 |
| 已确认 | 完全到货 | 已完成 | 全部到货 |
| 部分到货 | 继续到货 | 部分到货/已完成 | 持续到货 |
| 任意状态 | 关闭 | 已关闭 | 填写关闭原因 |

#### 销售订单

| 当前状态 | 操作 | 目标状态 | 条件 |
|---------|------|---------|------|
| 待确认 | 确认 | 已确认 | 审批通过 |
| 已确认 | 部分发货 | 部分发货 | 有发货记录 |
| 已确认 | 完全发货 | 已发货 | 全部发货 |
| 部分发货 | 继续发货 | 部分发货/已完成 | 持续发货 |
| 已发货 | 全部收款 | 已完成 | 款项全到账 |
| 任意状态 | 关闭 | 已关闭 | 填写关闭原因 |

#### 生产工单

| 当前状态 | 操作 | 目标状态 | 条件 |
|---------|------|---------|------|
| 待下达 | 下达 | 已下达 | 库存满足 |
| 已下达 | 开始 | 生产中 | 实际开工 |
| 生产中 | 报工 | 生产中 | 持续报工 |
| 生产中 | 完工 | 已完工 | 报工数量>=计划数量 |
| 已完工 | 入库 | 已入库 | 产成品入库完成 |
| 任意状态 | 关闭 | 已关闭 | 填写关闭原因 |

#### 盘点单

| 当前状态 | 操作 | 目标状态 | 条件 |
|---------|------|---------|------|
| 盘点中 | 提交 | 已提交 | 盘点数据录入完成 |
| 已提交 | 审核 | 已审核 | 审核人确认 |
| 已审核 | 过账 | 已过账 | 差异生成报溢报损凭证 |

---

## 附录

### A. 变更记录

| 版本 | 日期 | 变更内容 |
|------|------|---------|
| 1.0.0 | 2026-04-10 | 初版发布，基于通用 ERP 建设方案 v1.0.0 |
