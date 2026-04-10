import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getBadgeClassName } from "@/lib/dict";

// --- Stats data ---
const stats = [
  {
    label: "本月销售收入",
    value: "¥ 1,823,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "emerald",
  },
  {
    label: "本月采购成本",
    value: "¥ 896,200",
    change: "+8.3%",
    trend: "up",
    icon: ShoppingCart,
    color: "blue",
  },
  {
    label: "在执行订单",
    value: "48",
    change: "+6",
    trend: "up",
    icon: TrendingUp,
    color: "violet",
  },
  {
    label: "待审批事项",
    value: "7",
    change: "-3",
    trend: "down",
    icon: Users,
    color: "amber",
  },
];

const colorMap: Record<string, string> = {
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

// --- Chart data ---
const salesTrendData = [
  { month: "10月", revenue: 1280000, cost: 720000 },
  { month: "11月", revenue: 1390000, cost: 810000 },
  { month: "12月", revenue: 1520000, cost: 890000 },
  { month: "1月", revenue: 1480000, cost: 830000 },
  { month: "2月", revenue: 1610000, cost: 920000 },
  { month: "3月", revenue: 1823500, cost: 896200 },
];

const orderStatusData = [
  { name: "待确认", value: 12, color: "var(--color-chart-1)" },
  { name: "已确认", value: 18, color: "var(--color-chart-2)" },
  { name: "部分发货", value: 10, color: "var(--color-chart-3)" },
  { name: "已完成", value: 22, color: "var(--color-chart-4)" },
];

const chartConfig = {
  revenue: { label: "销售收入", color: "var(--color-chart-1)" },
  cost: { label: "采购成本", color: "var(--color-chart-2)" },
  orders: { label: "订单数", color: "var(--color-chart-3)" },
} satisfies ChartConfig;

// --- Recent orders ---
const recentOrders = [
  { no: "SO-20260410-005", customer: "北京中盛贸易公司", amount: 95600, status: "pending" },
  { no: "SO-20260408-004", customer: "宁波华鼎汽配集团", amount: 420000, status: "partial" },
  { no: "SO-20260405-003", customer: "中山协力电子有限公司", amount: 67200, status: "confirmed" },
  { no: "PO-20260409-004", supplier: "杭州博创机械有限公司", amount: 215000, status: "pending" },
  { no: "PO-20260406-003", supplier: "中山市恒达电子厂", amount: 35600, status: "confirmed" },
];

// --- Activity timeline ---
const activities = [
  { time: "今天 10:32", text: "华通科技销售订单已完成收款", type: "success" },
  { time: "今天 09:15", text: "采购订单 PO-20260409-004 提交审批", type: "info" },
  { time: "昨天 17:42", text: "光明机械制造产品已发货", type: "info" },
  { time: "昨天 14:20", text: "月结凭证已全部过账", type: "success" },
  { time: "昨天 11:05", text: "库存预警：电子元器件低于最低库存", type: "warning" },
];

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">经营看板</h1>
        <p className="text-muted-foreground text-sm mt-1">实时掌握企业核心经营指标</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="mt-1.5 text-2xl font-bold tabular-nums">{stat.value}</p>
                    <div className="mt-2 flex items-center gap-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                      )}
                      <span className={cn(
                        "text-xs font-medium",
                        stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                      )}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">较上月</span>
                    </div>
                  </div>
                  <div className={cn("rounded-lg p-2.5", colorMap[stat.color])}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Revenue trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">销售收入趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[240px] w-full">
              <LineChart data={salesTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" tickFormatter={(v) => `¥${(v / 1000000).toFixed(1)}M`} />
                <ChartTooltipContent
                  formatter={(value) => [`¥${Number(value).toLocaleString()}`, ""]}
                />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="cost" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} strokeDasharray="4 2" />
              </LineChart>
            </ChartContainer>
            <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--color-chart-1)]" /> 销售收入
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--color-chart-2)]" /> 采购成本
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Order status breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">订单状态分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderStatusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tabular-nums">{item.value}</span>
                    <span className="text-xs text-muted-foreground">单</span>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="text-right">
              <span className="text-2xl font-bold">62</span>
              <span className="text-sm text-muted-foreground ml-1">总订单</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent orders + Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent orders */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">最近订单</CardTitle>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                查看全部 <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.no} className="flex items-center justify-between py-1.5">
                  <div className="min-w-0">
                    <p className="text-sm font-medium font-mono truncate">{order.no}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {"customer" in order ? (order as { customer: string }).customer : (order as { supplier: string }).supplier}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-sm font-semibold tabular-nums">¥{(order.amount / 10000).toFixed(1)}万</p>
                    <Badge variant="outline" className={cn(
                      "mt-1 text-xs border",
                      getBadgeClassName(order.status === "pending" ? "yellow" : order.status === "confirmed" ? "blue" : "orange")
                    )}>
                      {order.status === "pending" ? "待确认" : order.status === "confirmed" ? "已确认" : "部分发货"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity timeline */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">最新动态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((act, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full shrink-0 bg-[var(--color-chart-1)]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{act.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
