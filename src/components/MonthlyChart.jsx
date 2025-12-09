// src/components/MonthlyChart.jsx
import React, { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function MonthlyChart({ expenses = [] }) {
  // Aggregate expenses by month-year
  const data = useMemo(() => {
    const map = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      map[key] = (map[key] || 0) + Number(expense.amount || 0);
    });

    const arr = Object.entries(map).map(([key, total]) => {
      const [year, month] = key.split("-");
      const label = `${month}/${year.slice(-2)}`; // MM/YY format
      return { month: label, amount: Math.round(total * 100) / 100 };
    });

    // Sort by ascending month
    arr.sort((a, b) => {
      const [am, ay] = a.month.split("/");
      const [bm, by] = b.month.split("/");
      return Number("20" + ay) * 12 + Number(am) - (Number("20" + by) * 12 + Number(bm));
    });

    return arr;
  }, [expenses]);

  if (data.length === 0) {
    return <div className="card">No data to show</div>;
  }

  return (
    <div className="card chart-card">
      <h3>Monthly Spending</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" name="Amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
