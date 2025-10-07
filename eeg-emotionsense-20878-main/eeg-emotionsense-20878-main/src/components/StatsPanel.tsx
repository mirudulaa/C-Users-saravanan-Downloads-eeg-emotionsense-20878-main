import { Card } from "@/components/ui/card";
import { Activity, Brain, Zap, TrendingUp } from "lucide-react";

interface StatsPanelProps {
  isActive: boolean;
}

export const StatsPanel = ({ isActive }: StatsPanelProps) => {
  const stats = [
    {
      label: "Signal Quality",
      value: isActive ? "98.5%" : "0%",
      icon: Activity,
      color: "text-accent",
    },
    {
      label: "Processing Speed",
      value: isActive ? "45ms" : "0ms",
      icon: Zap,
      color: "text-emotion-joy",
    },
    {
      label: "Channels Active",
      value: isActive ? "14/14" : "0/14",
      icon: Brain,
      color: "text-primary",
    },
    {
      label: "Accuracy",
      value: isActive ? "94.2%" : "0%",
      icon: TrendingUp,
      color: "text-emotion-calm",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="p-4 border-primary/20 bg-gradient-card hover:border-primary/40 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className={`${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
