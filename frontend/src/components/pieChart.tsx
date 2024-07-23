// src/components/PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface PieChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const categoryColors: { [key: string]: string } = {
  food: '#5AE37C',
  transport: '#FFDE59',
  gift: '#FFBD5D',
  bills: '#F88997',
  education: '#0CC0DF',
  salary:'#FFDE59',
  bonus:'#FFBD5D'
};

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.labels.map(label => categoryColors[label] || '#FF6384'),
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-16 rounded-lg">
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
