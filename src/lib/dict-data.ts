// All dictionary data for the ERP system

export interface DictItem {
  label: string
  value: string
  color?: string
}

export const dictionaries: Record<string, DictItem[]> = {
  // === Finance module ===
  "dict-voucher-type": [
    { label: "记账", value: "记", color: "blue" },
    { label: "转账", value: "转", color: "green" },
    { label: "收款", value: "收", color: "orange" },
    { label: "付款", value: "付", color: "red" },
    { label: "银行", value: "银", color: "purple" },
  ],

  "dict-voucher-status": [
    { label: "待审核", value: "pending", color: "yellow" },
    { label: "已审核", value: "approved", color: "blue" },
    { label: "已过账", value: "posted", color: "green" },
    { label: "已冲销", value: "reversed", color: "gray" },
  ],

  // === Procurement module ===
  "dict-supplier-level": [
    { label: "A级（优质）", value: "A", color: "green" },
    { label: "B级（良好）", value: "B", color: "blue" },
    { label: "C级（合格）", value: "C", color: "orange" },
    { label: "D级（待观察）", value: "D", color: "red" },
  ],

  "dict-order-status": [
    { label: "待确认", value: "pending", color: "yellow" },
    { label: "已确认", value: "confirmed", color: "blue" },
    { label: "部分到货", value: "partial", color: "orange" },
    { label: "已完成", value: "completed", color: "green" },
    { label: "已关闭", value: "closed", color: "gray" },
  ],

  "dict-approval-status": [
    { label: "草稿", value: "draft", color: "gray" },
    { label: "待审批", value: "pending", color: "yellow" },
    { label: "已审批", value: "approved", color: "green" },
    { label: "已驳回", value: "rejected", color: "red" },
  ],

  "dict-payment-method": [
    { label: "款到发货", value: "prepaid" },
    { label: "货到付款", value: "cod" },
    { label: "月结30天", value: "net30" },
    { label: "月结60天", value: "net60" },
    { label: "票到付款", value: "dop" },
  ],

  // === Sales module ===
  "dict-customer-level": [
    { label: "VIP客户", value: "VIP", color: "yellow" },
    { label: "A级客户", value: "A", color: "green" },
    { label: "B级客户", value: "B", color: "blue" },
    { label: "C级客户", value: "C", color: "orange" },
    { label: "D级客户", value: "D", color: "gray" },
  ],

  "dict-customer-type": [
    { label: "终端客户", value: "terminal", color: "blue" },
    { label: "渠道商", value: "channel", color: "green" },
    { label: "集团客户", value: "group", color: "purple" },
  ],

  "dict-cooperation-status": [
    { label: "合作中", value: "active", color: "green" },
    { label: "暂停", value: "paused", color: "orange" },
    { label: "已淘汰", value: "淘汰", color: "red" },
  ],

  // === Priority ===
  "dict-priority": [
    { label: "普通", value: "普通", color: "gray" },
    { label: "紧急", value: "紧急", color: "orange" },
    { label: "特急", value: "特急", color: "red" },
  ],

  // === Doc types ===
  "dict-doc-type": [
    { label: "采购发票", value: "purchase_invoice", color: "blue" },
    { label: "付款单", value: "payment", color: "orange" },
    { label: "销售发票", value: "sales_invoice", color: "green" },
    { label: "收款单", value: "receipt", color: "purple" },
  ],
}
