import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Server,
  Box,
  Cpu,
  MemoryStick,
  HardDrive,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Terminal,
  Code2,
  FileText,
  Activity,
  ShieldCheck,
  Plus,
  RotateCw,
  ArrowUpDown,
  UserPlus,
  Database,
  Send,
  Pencil,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Workspace Overview — ArimaRun" },
      { name: "description", content: "Manage your Kubernetes-backed AI workspaces." },
    ],
  }),
});

const sparkline = "M0,18 L8,16 L16,12 L24,15 L32,8 L40,10 L48,5 L56,9 L64,4";

function Stat({
  label,
  value,
  sub,
  icon: Icon,
  spark,
}: {
  label: string;
  value: string;
  sub: React.ReactNode;
  icon: React.ElementType;
  spark?: boolean;
}) {
  return (
    <Card className="p-4 border-border/60">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
        </div>
        <div className="rounded-md bg-muted p-2 text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <div>{sub}</div>
        {spark && (
          <svg viewBox="0 0 64 20" className="h-5 w-16 text-accent">
            <path d={sparkline} fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </div>
    </Card>
  );
}

function PodGroup({ name, count }: { name: string; count: number }) {
  return (
    <div className="rounded-lg border border-dashed border-border p-3">
      <div className="text-[11px] font-medium text-muted-foreground mb-2">
        Namespace: {name}
      </div>
      <div className="flex items-center gap-1.5 mb-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-6 rounded-sm bg-accent/15 border border-accent/40 flex items-center justify-center"
          >
            <Box className="h-3 w-3 text-accent" />
          </div>
        ))}
      </div>
      <div className="text-[10px] text-muted-foreground text-center">{count} Pods</div>
    </div>
  );
}

function StatefulNode({ name, kind }: { name: string; kind: string }) {
  return (
    <div className="rounded-md border border-border bg-muted/30 px-3 py-2 text-center">
      <div className="text-xs font-semibold">{name}</div>
      <div className="text-[10px] text-muted-foreground">{kind}</div>
    </div>
  );
}

function ActivityRow({
  icon: Icon,
  title,
  meta,
  tint,
}: {
  icon: React.ElementType;
  title: string;
  meta: string;
  tint?: string;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className={`mt-0.5 rounded-full p-1.5 ${tint ?? "bg-muted text-muted-foreground"}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{meta}</div>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Title row */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Select defaultValue="k8s-production">
            <SelectTrigger className="w-[220px] h-11">
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] text-muted-foreground">Workspace</span>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="k8s-production">K8s-Production</SelectItem>
              <SelectItem value="k8s-staging">K8s-Staging</SelectItem>
              <SelectItem value="k8s-dev">K8s-Dev</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6 min-w-0">
          {/* Header */}
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Workspace Overview</h1>
              <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                <span className="text-sm">Kubernetes Production Workspace</span>
                <Pencil className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 text-sm">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-success" /> Running
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Provider</div>
                <div className="font-medium">Hybrid</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Region</div>
                <div className="font-medium">us-west-1 + On-Prem</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Created</div>
                <div className="font-medium">2 days ago</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Stat
              label="Nodes"
              value="12"
              icon={Server}
              sub={
                <span>
                  <span className="text-success">8 Ready</span> · <span className="text-warning">2 Warning</span> ·{" "}
                  <span className="text-destructive">2 Down</span>
                </span>
              }
            />
            <Stat
              label="Pods"
              value="56"
              icon={Box}
              sub={
                <span>
                  <span className="text-success">48 Running</span> · 5 Pending ·{" "}
                  <span className="text-destructive">3 Failed</span>
                </span>
              }
            />
            <Stat label="CPU Usage" value="42%" icon={Cpu} sub="2.1 / 5.0 vCPU" spark />
            <Stat label="Memory Usage" value="63%" icon={MemoryStick} sub="24.5 / 39.0 GB" spark />
            <Stat label="Storage Usage" value="58%" icon={HardDrive} sub="582 / 1000 GB" />
          </div>

          {/* Architecture map + Recent activity */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
            <Card className="p-4 border-border/60">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Architecture Map</h3>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><ZoomIn className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><ZoomOut className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Maximize2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
              <div className="space-y-5">
                <div className="flex justify-center">
                  <div className="rounded-md border border-border bg-muted/40 px-4 py-1.5 text-xs font-medium">
                    Load Balancer
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <PodGroup name="frontend" count={3} />
                  <PodGroup name="backend" count={4} />
                  <PodGroup name="data" count={2} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <StatefulNode name="Redis" kind="StatefulSet" />
                  <StatefulNode name="PostgreSQL" kind="StatefulSet" />
                  <StatefulNode name="MinIO" kind="StatefulSet" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-border/60">
              <h3 className="font-semibold mb-2">Recent Activity</h3>
              <div className="divide-y divide-border">
                <ActivityRow
                  icon={RotateCw}
                  tint="bg-accent/15 text-accent"
                  title="Deployment updated"
                  meta="backend-api · 1m ago"
                />
                <ActivityRow
                  icon={RotateCw}
                  tint="bg-warning/20 text-warning"
                  title="Pod restarted"
                  meta="worker-7f9c8d · 3m ago"
                />
                <ActivityRow
                  icon={ArrowUpDown}
                  title="Scaling completed"
                  meta="frontend · 5m ago"
                />
                <ActivityRow
                  icon={UserPlus}
                  title="New user added"
                  meta="john.doe · 15m ago"
                />
                <ActivityRow
                  icon={Database}
                  title="Backup completed"
                  meta="etcd-backup · 30m ago"
                />
              </div>
              <Button variant="link" size="sm" className="mt-2 px-0">
                View all activity →
              </Button>
            </Card>
          </div>

          {/* Quick actions */}
          <Card className="p-4 border-border/60">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                { icon: Terminal, label: "Launch Terminal" },
                { icon: Code2, label: "Open IDE (VS Code)" },
                { icon: FileText, label: "View Logs" },
                { icon: Activity, label: "Monitor" },
                { icon: ShieldCheck, label: "Connect via VPN" },
                { icon: Plus, label: "Create Backup" },
              ].map((a) => (
                <Button
                  key={a.label}
                  variant="outline"
                  className="justify-start gap-2 h-10 font-normal"
                >
                  <a.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{a.label}</span>
                </Button>
              ))}
            </div>
          </Card>

          {/* Terminal */}
          <Card className="p-0 border-border/60 overflow-hidden">
            <Tabs defaultValue="terminal">
              <div className="border-b border-border px-2">
                <TabsList className="bg-transparent h-11">
                  <TabsTrigger value="terminal">Terminal</TabsTrigger>
                  <TabsTrigger value="logs">Logs</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="terminal" className="m-0">
                <div className="font-mono text-xs p-4 bg-muted/20 min-h-[260px]">
                  <div className="text-foreground">
                    user@arimarun:~/workspace$ kubectl get pods -A
                  </div>
                  <div className="mt-2 grid grid-cols-[120px_240px_60px_120px_70px_60px] gap-x-4 text-muted-foreground">
                    <div>NAMESPACE</div><div>NAME</div><div>READY</div><div>STATUS</div><div>RESTARTS</div><div>AGE</div>
                    {[
                      ["frontend", "frontend-7f8d9c4d8-abcde", "1/1", "Running", "0", "2d"],
                      ["frontend", "frontend-7f8d9c4d8-fghij", "1/1", "Running", "1", "2d"],
                      ["backend", "backend-api-6c5d7f9b-xyz12", "1/1", "Running", "0", "2d"],
                      ["backend", "worker-7f9c8d7f6-ptuio", "0/1", "CrashLoopBackOff", "7", "1d"],
                      ["data", "postgres-0", "1/1", "Running", "0", "5d"],
                      ["data", "redis-master-0", "1/1", "Running", "0", "5d"],
                    ].map((row, i) => (
                      <div key={i} className="contents text-foreground/90">
                        <div>{row[0]}</div>
                        <div>{row[1]}</div>
                        <div>{row[2]}</div>
                        <div className={row[3] === "CrashLoopBackOff" ? "text-destructive" : "text-success"}>{row[3]}</div>
                        <div>{row[4]}</div>
                        <div>{row[5]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-foreground">
                    user@arimarun:~/workspace$ <span className="inline-block h-3 w-1.5 bg-accent animate-pulse align-middle ml-0.5" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="logs" className="m-0 p-6 text-sm text-muted-foreground">No logs yet.</TabsContent>
              <TabsContent value="events" className="m-0 p-6 text-sm text-muted-foreground">No events.</TabsContent>
              <TabsContent value="metrics" className="m-0 p-6 text-sm text-muted-foreground">Metrics coming soon.</TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          <Card className="p-4 border-border/60">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" /> AI Assistant
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Hi! I'm your AI infrastructure assistant. How can I help you today?
            </p>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
              Suggestions
            </div>
            <div className="space-y-1.5">
              {[
                "Why is my pod crashing?",
                "Show me CPU usage trends",
                "Explain this error\nCrashLoopBackOff",
                "Optimize my Kubernetes resources",
                "How to scale this deployment?",
              ].map((s, i) => (
                <button
                  key={i}
                  className="w-full text-left text-sm rounded-md border border-border bg-card hover:bg-muted/50 px-3 py-2 flex items-center justify-between gap-2"
                >
                  <span className="whitespace-pre-line">{s}</span>
                  <span className="text-muted-foreground">›</span>
                </button>
              ))}
            </div>
            <div className="relative mt-4">
              <Input placeholder="Ask anything..." className="pr-10 bg-muted/40" />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1 h-7 w-7">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>

          <Card className="p-4 border-border/60">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Context</div>
              <Button variant="outline" size="sm" className="h-6 text-xs">Change</Button>
            </div>
            <div className="text-sm font-semibold">K8s-Production</div>
            <div className="text-xs text-muted-foreground">12 Nodes · 56 Pods</div>
          </Card>

          <Card className="p-4 border-border/60">
            <h3 className="font-semibold mb-3">Environment Info</h3>
            <dl className="space-y-2 text-sm">
              {[
                ["Kubernetes Version", "1.28.2"],
                ["Cluster Type", "Hybrid"],
                ["Control Plane", "On-Prem"],
                ["Worker Nodes", "8 (Hybrid)"],
                ["Network", "Calico"],
                ["Ingress", "NGINX"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Avoid unused-import error from Sparkles by re-exporting in scope
import { Sparkles } from "lucide-react";
