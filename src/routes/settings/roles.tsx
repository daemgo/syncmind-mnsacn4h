import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export const Route = createFileRoute("/settings/roles")({
  component: PlaceholderPage,
});

function PlaceholderPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight mb-2">角色权限</h1>
      <Card>
        <CardContent className="py-16 flex flex-col items-center gap-4">
          <Building2 className="h-12 w-12 text-muted-foreground/40" />
          <div className="text-center">
            <p className="text-muted-foreground">该模块尚未生成</p>
            <p className="text-sm text-muted-foreground/60 mt-1">请继续对话生成完整页面</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
