import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import "@/styles/globals.css";
import { AppShell } from "@/components/layout/app-shell";
import type { MenuItem } from "@/components/layout/sidebar";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Warehouse,
  TrendingUp,
  Factory,
  Building,
  BarChart3,
  Bell,
  Settings,
  Smartphone,
} from "lucide-react";

const menuItems: MenuItem[] = [
  { label: "经营看板", href: "/", icon: LayoutDashboard },
  { label: "财务管理", href: "/finance/general-ledger", icon: FileText, group: "财务" },
  { label: "采购管理", href: "/procurement/orders", icon: ShoppingCart, group: "供应链" },
  { label: "库存管理", href: "/inventory/stock", icon: Warehouse, group: "供应链" },
  { label: "销售管理", href: "/sales/orders", icon: TrendingUp, group: "销售" },
  { label: "生产管理", href: "/production/work-orders", icon: Factory, group: "生产" },
  { label: "多组织管理", href: "/organization/tree", icon: Building, group: "组织" },
  { label: "报表中心", href: "/reports/dashboard", icon: BarChart3, group: "分析" },
  { label: "消息中心", href: "/messages/notifications", icon: Bell, group: "系统" },
  { label: "系统设置", href: "/settings/roles", icon: Settings, group: "系统" },
  { label: "移动端", href: "/mobile/approvals", icon: Smartphone, group: "移动" },
];

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ERP 系统" },
      { name: "description", content: "统一 ERP 管理平台" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="zh-CN">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', 'Noto Sans SC', system-ui, sans-serif" }}>
        <AppShell title="ERP 系统" items={menuItems}>
          <Outlet />
        </AppShell>
        <Scripts />
        <NavBridgeScript />
      </body>
    </html>
  );
}

function NavBridgeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function() {
  if (window === window.parent) return;
  var notify = function() {
    window.parent.postMessage({
      type: 'preview-navigation',
      pathname: location.pathname,
      url: location.href
    }, '*');
  };
  notify();
  var origPush = history.pushState;
  var origReplace = history.replaceState;
  history.pushState = function() {
    origPush.apply(this, arguments);
    notify();
  };
  history.replaceState = function() {
    origReplace.apply(this, arguments);
    notify();
  };
  window.addEventListener('popstate', notify);
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'preview-command') {
      if (e.data.command === 'back') history.back();
      if (e.data.command === 'forward') history.forward();
      if (e.data.command === 'navigate') {
        window.location.href = e.data.url;
      }
    }
  });
})();`,
      }}
    />
  );
}
