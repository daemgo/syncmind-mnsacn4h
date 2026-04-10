// Voucher (凭证) type for General Ledger
export interface Voucher {
  id: string
  voucherNo: string
  voucherDate: string
  voucherType: string
  summary: string
  amount: number
  createdBy: string
  status: string
}

export type VoucherStatus = "pending" | "approved" | "posted" | "reversed"
export type VoucherType = "记" | "转" | "收" | "付" | "银"
