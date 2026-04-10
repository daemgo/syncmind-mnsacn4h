import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable, type ColumnConfig } from "@/components/biz/data-table";
import { DataFilter, type FilterField } from "@/components/biz/data-filter";
import { FormDialog, type FormField } from "@/components/biz/form-dialog";
import { salesOrderMock } from "@/mock/sales";
import type { SalesOrder } from "@/types/sales";

export const Route = createFileRoute("/sales/orders/")({
  component: SalesOrderPage,
});

// === Configuration ===
const columns: ColumnConfig<SalesOrder>[] = [
  { key: "orderNo", label: "订单号", type: "mono" },
  { key: "customerName", label: "客户" },
  { key: "orderDate", label: "订单日期", type: "date" },
  { key: "totalAmount", label: "订单金额", type: "money", align: "right" },
  { key: "shippedAmount", label: "已发货", type: "money", align: "right" },
  { key: "receivedAmount", label: "已回款", type: "money", align: "right" },
  { key: "deliveryDate", label: "交期", type: "date" },
  { key: "status", label: "状态", type: "badge", dictId: "dict-order-status" },
  { key: "approvalStatus", label: "审批状态", type: "badge", dictId: "dict-approval-status" },
];

const filterFields: FilterField[] = [
  { key: "orderNo", label: "订单号", type: "text" },
  { key: "customerName", label: "客户", type: "text" },
  { key: "status", label: "状态", type: "select", dictId: "dict-order-status" },
  { key: "approvalStatus", label: "审批", type: "select", dictId: "dict-approval-status" },
];

const formFields: FormField[] = [
  { key: "customerName", label: "客户", type: "text", required: true },
  { key: "orderDate", label: "订单日期", type: "date", required: true },
  { key: "deliveryDate", label: "预交期", type: "date", required: true },
  { key: "totalAmount", label: "订单金额", type: "number", required: true },
];

// === Page Component ===
function SalesOrderPage() {
  const navigate = useNavigate();
  const [data] = useState(salesOrderMock);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SalesOrder | undefined>();
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
          <h1 className="text-2xl font-bold tracking-tight">销售订单</h1>
          <p className="text-muted-foreground text-sm mt-1">销售订单全流程管理</p>
        </div>
        <Button onClick={() => { setEditingItem(undefined); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />新增订单
        </Button>
      </div>
      <DataFilter fields={filterFields} values={filters} onChange={setFilters} />
      <DataTable
        columns={columns}
        data={filtered}
        onView={(item) => navigate({ to: "/sales/orders/$id", params: { id: item.id } })}
        onEdit={(item) => { setEditingItem(item); setDialogOpen(true); }}
      />
      <FormDialog
        entityName="销售订单"
        fields={formFields}
        data={editingItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
