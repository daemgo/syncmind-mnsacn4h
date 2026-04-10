// Sales Order type for Sales module
export interface SalesOrder {
  id: string
  orderNo: string
  customerName: string
  orderDate: string
  totalAmount: number
  shippedAmount: number
  receivedAmount: number
  deliveryDate: string
  status: string
  approvalStatus: string
}

export type SalesStatus = "pending" | "confirmed" | "partial" | "completed" | "closed"
