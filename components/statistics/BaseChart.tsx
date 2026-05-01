"use client"

import { Doughnut, Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler);

const DEFAULT_COLORS = [
    "#60A5FA", // blue-400  
    "#2563EB", // blue-600
    "#BFDBFE", // blue-200
];

interface Props {
  data: any;
  type: 'doughnut' | 'bar' | 'line';
  title?: string;
  onSelect?: (data: { label: string; value: number; key: string }) => void;
  selectedKey?: string | null;
}

export default function BaseChart({title, data, type, onSelect, selectedKey} : Props) {

    const getColorWithOpacity = (hex: string, opacity: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const chartLabels = data.labels || data.label || [];

    const rawValues = data.value || data.datasets || [];
    
    const unit = " รายการ";

    const hasSelection = selectedKey !== null && selectedKey !== undefined;

    const formattedData = {
        labels: chartLabels,
        datasets: [
        {
            label: title,
            data: rawValues,
            backgroundColor:
                type === 'doughnut'
                    ? chartLabels.map((_: any, i: number) => {
                        const key = data.meta?.[i]?.key;
                        const baseColor = DEFAULT_COLORS[i % DEFAULT_COLORS.length];

                        if (!hasSelection) return baseColor;

                        return key === selectedKey
                        ? baseColor
                        : getColorWithOpacity(baseColor, 0.3);
                    })
                    : chartLabels.map((_: any, i: number) => {
                        const key = data.meta?.[i]?.key;
                        const baseColor = DEFAULT_COLORS[0];
                        if (!hasSelection) return baseColor;
                        return key === selectedKey
                            ? baseColor
                            : getColorWithOpacity(baseColor, 0.3);
                    }),
            borderColor: type === 'doughnut' ? "#ffffff" : DEFAULT_COLORS[0],
            borderWidth:
                type === 'bar'
                    ? chartLabels.map((_: any, i: number) => {
                        const key = data.meta?.[i]?.key;

                        if (!hasSelection) return 0;

                        return key === selectedKey ? 2 : 0;
                    })
                    : 1,
            borderRadius: type === 'bar' ? 8 : 0,
            pointRadius:
                type === 'line'
                    ? (chartLabels as any[]).map((_: any, i: number) => {
                        const key = data.meta?.[i]?.key;
                        if (!hasSelection) return 3;
                        return key === selectedKey ? 5 : 3;
                    })
                    : 0,
            pointHoverRadius:
                type === 'line'
                    ? (chartLabels as any[]).map((_: any, i: number) => {
                        const key = data.meta?.[i]?.key;
                        if (!hasSelection) return 5;
                        return key === selectedKey ? 10 : 5;
                    })
                    : 0,


            offset: chartLabels.map((_: any, i: number) => {
                const key = data.meta?.[i]?.key;
                return key === selectedKey ? 24 : 0;
            }),

            barThickness: 60,
            maxBarThickness: 65,
            fill: false,
        },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (event: any, elements: any[]) => {
            if (!elements.length) return;

            const index = elements[0].index;

            const selected = (data as any).meta[index];

            onSelect?.(selected);
        },
        plugins: {
            legend: {
                display: type === 'doughnut',
                position: "bottom" as const,
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 10,
                    boxHeight: 10,
                    padding: 16,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                    const value = context.raw;
                    return `${value}${unit}`;
                    },
                },
            },
        },
    };

    return (
        <div className={`flex justify-center items-center h-70 ${type == 'doughnut' ? 'w-fit' : 'w-full'}`}>
        {type == 'doughnut' && (
            <Doughnut
                options={options}
                data={formattedData}
                />
        )}
        {type == 'bar' && (
            <Bar
                options={options}
                data={formattedData}
                />
        )}
        {type == 'line' && (
            <Line
                options={options}
                data={formattedData}
                />
        )}
        </div>
    )
}