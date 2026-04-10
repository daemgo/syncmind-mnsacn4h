import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileText, User, Clock } from "lucide-react";
import { voucherMock } from "@/mock/finance";
import { getDictLabel, getBadgeClassName } from "@/lib/dict";
import type { Voucher } from "@/types/finance";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/finance/general-ledger/$id")({
  component: VoucherDetail,
});

function VoucherDetail() {
  const { id } = Route.useParams();
  const item = voucherMock.find((d) => d.id === id);
  if (!item) return <div className="p-6 text-muted-foreground">未找到凭证记录</div>;

  const statusColor = item.status === "posted" ? "green" : item.status === "approved" ? "blue" : item.status === "reversed" ? "gray" : "yellow";

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/finance/general-ledger"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">凭证详情</h1>
          <Badge variant="outline" className={cn("border font-medium", getBadgeClassName(statusColor))}>
            {getDictLabel("dict-voucher-status", item.status)}
          </Badge>
        </div>
      </div>

      {/* Basic info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4" />基本信息
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-muted-foreground">凭证号</dt>
              <dd className="mt-1 font-mono font-medium">{item.voucherNo}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">凭证字</dt>
              <dd className="mt-1">
                <Badge variant="outline" className={cn("border", getBadgeClassName(
                  item.voucherType === "记" ? "blue" :
                  item.voucherType === "转" ? "green" :
                  item.voucherType === "收" ? "orange" :
                  item.voucherType === "付" ? "red" : "purple"
                ))}>
                  {getDictLabel("dict-voucher-type", item.voucherType)}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">凭证日期</dt>
              <dd className="mt-1 font-medium">{item.voucherDate}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">凭证金额</dt>
              <dd className="mt-1 font-bold text-lg tabular-nums">¥{item.amount.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}</dd>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-muted-foreground flex items-center gap-1.5"><User className="h-3.5 w-3.5" />制单人</dt>
              <dd className="mt-1 font-medium">{item.createdBy}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />摘要</dt>
              <dd className="mt-1 font-medium">{item.summary}</dd>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accounting entries */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">分录明细</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">科目编码</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">科目名称</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">借方金额</th>
                  <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">贷方金额</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2.5 font-mono text-xs">1122</td>
                  <td className="px-4 py-2.5">应收账款</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">¥{item.amount.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono text-xs">6001</td>
                  <td className="px-4 py-2.5">主营业务收入</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">-</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">¥{item.amount.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr className="bg-muted/30 font-semibold">
                  <td colSpan={2} className="px-4 py-2.5">合计</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">¥{item.amount.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">¥{item.amount.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
