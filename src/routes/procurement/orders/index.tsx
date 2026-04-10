import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable, type ColumnConfig } from "@/components/biz/data-table";
import { DataFilter, type FilterField } from "@/components/biz/data-filter";
import { FormDialog, type FormField } from "@/components/biz/form-dialog";
import { purchaseOrderMock } from "@/mock/procurement";
import type { PurchaseOrder } from "@/types/procurement";

export const Route = createFileRoute("/procurement/orders/")({
  component: PurchaseOrderPage,
});

// === Configuration ===
const columns: ColumnConfig<PurchaseOrder>[] = [
  { key: "orderNo", label: "订单号", type: "mono" },
  { key: "supplierName", label: "供应商" },
  { key: "orderDate", label: "订单日期", type: "date" },
  { key: "totalAmount", label: "订单金额", type: "money", align: "right" },
  { key: "deliveryProgress", label: "到货进度", type: "badge", dictId: "dict-order-status" },
  { key: "deliveryDate", label: "交期", type: "date" },
  { key: "status", label: "状态", type: "badge", dictId: "dict-order-status" },
  { key: "approvalStatus", label: "审批状态", type: "badge", dictId: "dict-approval-status" },
];

const filterFields: FilterField[] = [
  { key: "orderNo", label: "订单号", type: "text" },
  { key: "supplierName", label: "供应商", type: "text" },
  { key: "status", label: "状态", type: "select", dictId: "dict-order-status" },
  { key: "approvalStatus", label: "审批", type: "select", dictId: "dict-approval-status" },
];

const formFields: FormField[] = [
  { key: "supplierName", label: "供应商", type: "text", required: true },
  { key: "orderDate", label: "订单日期", type: "date", required: true },
  { key: "deliveryDate", label: "预计交期", type: "date", required: true },
  { key: "totalAmount", label: "订单金额", type: "number", required: true },
];

// === Page Component ===
function PurchaseOrderPage() {
  const navigate = useNavigate();
  const [data] = useState(purchaseOrderMock);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PurchaseOrder | undefined>();
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = data.filter((item) => {
    return Object.entries(filters).every(([key, val]) => {
      if (!val) return true;
      const fieldVal = String((item as Record<string, unknown>)[key] ?? "");
      return fieldVal.toLowerCase().includes(val.toLowerCase());
    });
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">采购订单</h1>
          <p className="text-muted-foreground text-sm mt-1">采购订单全流程管理</p>
        </div>
        <Button onClick={() => { setEditingItem(undefined); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />新增订单
        </Button>
      </div>
      <DataFilter fields={filterFields} values={filters} onChange={setFilters} />
      <DataTable
        columns={columns}
        data={filtered}
        onView={(item) => navigate({ to: "/procurement/orders/$id", params: { id: item.id } })}
        onEdit={(item) => { setEditingItem(item); setDialogOpen(true); }}
      />
      <FormDialog
        entityName="采购订单"
        fields={formFields}
        data={editingItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
