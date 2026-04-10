import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable, type ColumnConfig } from "@/components/biz/data-table";
import { DataFilter, type FilterField } from "@/components/biz/data-filter";
import { FormDialog, type FormField } from "@/components/biz/form-dialog";
import { voucherMock } from "@/mock/finance";
import type { Voucher } from "@/types/finance";

export const Route = createFileRoute("/finance/general-ledger/")({
  component: VoucherPage,
});

// === Configuration ===
const columns: ColumnConfig<Voucher>[] = [
  { key: "voucherNo", label: "凭证号", type: "mono" },
  { key: "voucherDate", label: "凭证日期", type: "date" },
  { key: "voucherType", label: "凭证字", type: "badge", dictId: "dict-voucher-type" },
  { key: "summary", label: "摘要" },
  { key: "amount", label: "金额", type: "money", align: "right" },
  { key: "createdBy", label: "制单人" },
  { key: "status", label: "审核状态", type: "badge", dictId: "dict-voucher-status" },
];

const filterFields: FilterField[] = [
  { key: "voucherNo", label: "凭证号", type: "text" },
  { key: "voucherType", label: "凭证字", type: "select", dictId: "dict-voucher-type" },
  { key: "status", label: "状态", type: "select", dictId: "dict-voucher-status" },
];

const formFields: FormField[] = [
  { key: "voucherType", label: "凭证字", type: "select", dictId: "dict-voucher-type", required: true },
  { key: "voucherDate", label: "凭证日期", type: "date", required: true },
  { key: "summary", label: "摘要", type: "text", required: true },
  { key: "amount", label: "金额", type: "number", required: true },
];

// === Page Component ===
function VoucherPage() {
  const navigate = useNavigate();
  const [data] = useState(voucherMock);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Voucher | undefined>();
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
          <h1 className="text-2xl font-bold tracking-tight">总账</h1>
          <p className="text-muted-foreground text-sm mt-1">凭证录入与账簿查询</p>
        </div>
        <Button onClick={() => { setEditingItem(undefined); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />新增凭证
        </Button>
      </div>
      <DataFilter fields={filterFields} values={filters} onChange={setFilters} />
      <DataTable
        columns={columns}
        data={filtered}
        onView={(item) => navigate({ to: "/finance/general-ledger/$id", params: { id: item.id } })}
        onEdit={(item) => { setEditingItem(item); setDialogOpen(true); }}
      />
      <FormDialog
        entityName="凭证"
        fields={formFields}
        data={editingItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
