// Purchase Order type for Procurement module
export interface PurchaseOrder {
  id: string
  orderNo: string
  supplierName: string
  orderDate: string
  totalAmount: number
  receivedAmount: number
  deliveryProgress: number
  deliveryDate: string
  status: string
  approvalStatus: string
}

export type OrderStatus = "pending" | "confirmed" | "partial" | "completed" | "closed"
export type ApprovalStatus = "draft" | "pending" | "approved" | "rejected"
