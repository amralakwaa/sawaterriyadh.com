"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface QuoteTrend {
  date: string;
  count: number;
}

interface StatusData {
  name: string;
  value: number;
  color: string;
}

export function QuotesChart({ trends, statusData }: { trends: QuoteTrend[]; statusData: StatusData[] }) {
  const totalQuotes = useMemo(() => trends.reduce((s, t) => s + t.count, 0), [trends]);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* Trends area chart */}
      <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-base">طلبات التسعير - آخر 14 يوم</h3>
            <p className="text-xs text-muted-foreground mt-0.5">إجمالي الطلبات: {totalQuotes}</p>
          </div>
        </div>
        {trends.length === 0 || totalQuotes === 0 ? (
          <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
            لا توجد بيانات كافية لعرض الرسم البياني
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trends} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorQuotes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "var(--foreground)", fontWeight: 700 }}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="الطلبات"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#colorQuotes)"
                dot={{ r: 3, fill: "var(--primary)" }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Status pie chart */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-display font-bold text-base mb-4">توزيع الحالات</h3>
        {statusData.every((s) => s.value === 0) ? (
          <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
            لا توجد بيانات
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
