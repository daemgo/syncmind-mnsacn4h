import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Building, Calendar, Truck, CheckCircle2, CreditCard } from "lucide-react";
import { salesOrderMock } from "@/mock/sales";
import { getDictLabel, getBadgeClassName } from "@/lib/dict";
import type { SalesOrder } from "@/types/sales";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sales/orders/$id")({
  component: SalesOrderDetail,
});

function SalesOrderDetail() {
  const { id } = Route.useParams();
  const item = salesOrderMock.find((d) => d.id === id);
  if (!item) return <div className="p-6 text-muted-foreground">未找到销售订单</div>;

  const statusColor = item.status === "completed" ? "green" : item.status === "partial" ? "orange" : item.status === "confirmed" ? "blue" : "yellow";
  const approvalColor = item.approvalStatus === "approved" ? "green" : item.approvalStatus === "pending" ? "yellow" : item.approvalStatus === "rejected" ? "red" : "gray";
  const shippedPct = Math.round((item.shippedAmount / item.totalAmount) * 100);
  const receivedPct = Math.round((item.receivedAmount / item.totalAmount) * 100);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/sales/orders"><ArrowLeft className="h-4 w-4" /></Link>
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
          <TabsTrigger value="delivery">发货管理</TabsTrigger>
          <TabsTrigger value="payment">回款情况</TabsTrigger>
        </TabsList>

        <TabsContent value="detail" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building className="h-4 w-4" />客户信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-muted-foreground">客户名称</dt>
                  <dd className="mt-1 font-medium">{item.customerName}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />订单日期</dt>
                  <dd className="mt-1 font-medium">{item.orderDate}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" />预交期</dt>
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

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Truck className="h-4 w-4" />发货进度
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">已发货金额</span>
                    <span className="font-semibold tabular-nums">¥{item.shippedAmount.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <Progress value={shippedPct} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">{shippedPct}%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />回款进度
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">已回款金额</span>
                    <span className="font-semibold tabular-nums">¥{item.receivedAmount.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <Progress value={receivedPct} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">{receivedPct}%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="delivery">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground text-sm py-12">暂无发货记录</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground text-sm py-12">暂无收款记录</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
