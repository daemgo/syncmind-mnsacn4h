import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Building2, Calendar, Truck, CheckCircle2 } from "lucide-react";
import { purchaseOrderMock } from "@/mock/procurement";
import { getDictLabel, getBadgeClassName } from "@/lib/dict";
import type { PurchaseOrder } from "@/types/procurement";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/procurement/orders/$id")({
  component: PurchaseOrderDetail,
});

function PurchaseOrderDetail() {
  const { id } = Route.useParams();
  const item = purchaseOrderMock.find((d) => d.id === id);
  if (!item) return <div className="p-6 text-muted-foreground">未找到采购订单</div>;

  const statusColor = item.status === "completed" ? "green" : item.status === "partial" ? "orange" : item.status === "confirmed" ? "blue" : "yellow";
  const approvalColor = item.approvalStatus === "approved" ? "green" : item.approvalStatus === "pending" ? "yellow" : item.approvalStatus === "rejected" ? "red" : "gray";

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/procurement/orders"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold font-mono">{item.orderNo}</h1>
          <Badge variant="outline" className={cn("border font-medium", getBadgeClassName(statusColor))}>
            {getDictLabel("dict-order-status", item.status)}
          </Badge>
          <Badge variant="outline" className={cn("border font-medium", getBadgeClassName(approvalColor))}>
            审批：{getDictLabel("dict-approval-status", item.approvalStatus)}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="detail">
        <TabsList>
          <TabsTrigger value="detail">基本信息</TabsTrigger>
          <TabsTrigger value="delivery">到货跟踪</TabsTrigger>
          <TabsTrigger value="invoice">发票管理</TabsTrigger>
        </TabsList>

        <TabsContent value="detail" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4" />供应商信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-muted-foreground">供应商名称</dt>
                  <dd className="mt-1 font-medium">{item.supplierName}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />订单日期</dt>
                  <dd className="mt-1 font-medium">{item.orderDate}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" />预计交期</dt>
                  <dd className="mt-1 font-medium">{item.deliveryDate}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">订单金额</dt>
                  <dd className="mt-1 font-bold text-lg tabular-nums">
                    ¥{item.totalAmount.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}
                  </dd>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Truck className="h-4 w-4" />到货进度
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">已到货金额</span>
                  <span className="font-semibold tabular-nums">¥{item.receivedAmount.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}</span>
                </div>
                <Progress value={item.deliveryProgress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>¥{(item.receivedAmount / 10000).toFixed(1)}万</span>
                  <span>{item.deliveryProgress}%</span>
                  <span>¥{(item.totalAmount / 10000).toFixed(1)}万</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">订单明细</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">物料编码</th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">物料名称</th>
                      <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">数量</th>
                      <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">单价</th>
                      <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">金额</th>
                      <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">已到</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-2.5 font-mono text-xs">MAT-2026-001</td>
                      <td className="px-4 py-2.5">电子元器件-A型</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">1,000</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">¥42.50</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">¥42,500.00</td>
                      <td className="px-4 py-2.5 text-center"><CheckCircle2 className="h-4 w-4 mx-auto text-green-500" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground text-sm py-12">暂无到货记录</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoice">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground text-sm py-12">暂无发票记录</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
