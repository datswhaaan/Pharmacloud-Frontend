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

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const DEFAULT_COLORS = [
    "#60A5FA", // blue-400  
    "#2563EB", // blue-600
    "#BFDBFE", // blue-200
];

interface Props {
  data: any;
  type: 'doughnut' | 'bar' | 'line';
  title?: string;
}

export default function BaseChart({title, data, type} : Props) {

    const chartLabels = data.labels || data.label || [];

    const rawValues = data.value || data.datasets || [];
    
    const unit = type === 'doughnut' ? '%' : ` ${data.unit}`;

    const formattedData = {
        labels: chartLabels,
        datasets: [
        {
            label: title,
            data: rawValues,
            backgroundColor: type === 'doughnut' ? DEFAULT_COLORS : DEFAULT_COLORS[0],
            borderColor: type === 'doughnut' ? "#ffffff" : DEFAULT_COLORS[0],
            borderWidth: type === 'doughnut' ? 2 : 1,
            borderRadius: type === 'bar' ? 8 : 0,
            barThickness: 60,
            maxBarThickness: 65,
            fill: type === 'line',
        },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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