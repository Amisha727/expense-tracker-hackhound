import React, { useEffect, useRef } from 'react';
import { Expense, ExpenseCategory, ChartData } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface ChartProps {
  data: ChartData;
  type: 'bar' | 'pie' | 'line';
  title: string;
  height?: number;
}

const Chart: React.FC<ChartProps> = ({ 
  data, 
  type, 
  title,
  height = 300
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  // This is a mock implementation of chart rendering
  // In a real application, you would use a library like Chart.js
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Clear previous chart
        ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);
        
        // Set dimensions
        const canvas = chartRef.current;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = height * dpr;
        
        ctx.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${height}px`;
        
        // Draw mock chart based on type
        if (type === 'pie') {
          drawMockPieChart(ctx, data, rect.width, height);
        } else if (type === 'bar') {
          drawMockBarChart(ctx, data, rect.width, height);
        } else if (type === 'line') {
          drawMockLineChart(ctx, data, rect.width, height);
        }
      }
    }

    return () => {
      if (chartInstance.current) {
        // Clean up if using a real chart library
      }
    };
  }, [data, type, height]);
  
  // Mock chart drawing functions
  const drawMockPieChart = (
    ctx: CanvasRenderingContext2D, 
    data: ChartData, 
    width: number, 
    height: number
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    let startAngle = 0;
    const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0) || 1;
    
    data.datasets[0].data.forEach((value, i) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      ctx.fillStyle = data.datasets[0].backgroundColor[i] || '#ccc';
      ctx.fill();
      
      // Draw label if slice is large enough
      if (sliceAngle > 0.2) {
        const midAngle = startAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(midAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(midAngle) * (radius * 0.7);
        
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '12px sans-serif';
        
        // Only draw if there's enough space
        if (value / total > 0.05) {
          ctx.fillText(data.labels[i], labelX, labelY);
        }
      }
      
      startAngle += sliceAngle;
    });
  };
  
  const drawMockBarChart = (
    ctx: CanvasRenderingContext2D, 
    data: ChartData, 
    width: number, 
    height: number
  ) => {
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    const barCount = data.labels.length;
    const barWidth = chartWidth / barCount * 0.8;
    const barSpacing = chartWidth / barCount * 0.2;
    
    // Find max value for scaling
    const maxValue = Math.max(...data.datasets[0].data) * 1.1 || 10;
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.strokeStyle = '#ccc';
    ctx.stroke();
    
    // Draw bars
    data.datasets[0].data.forEach((value, i) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding.left + (i * (barWidth + barSpacing)) + barSpacing/2;
      const y = height - padding.bottom - barHeight;
      
      ctx.fillStyle = data.datasets[0].backgroundColor[i] || '#ccc';
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Draw label
      ctx.fillStyle = '#888';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.font = '10px sans-serif';
      ctx.fillText(data.labels[i], x + barWidth/2, height - padding.bottom + 5);
      
      // Draw value
      ctx.fillStyle = '#333';
      ctx.textBaseline = 'bottom';
      if (barHeight > 20) {
        ctx.fillText(value.toString(), x + barWidth/2, y);
      }
    });
  };
  
  const drawMockLineChart = (
    ctx: CanvasRenderingContext2D, 
    data: ChartData, 
    width: number, 
    height: number
  ) => {
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    const pointCount = data.labels.length;
    
    // Find max value for scaling
    const maxValue = Math.max(...data.datasets[0].data) * 1.1 || 10;
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.strokeStyle = '#ccc';
    ctx.stroke();
    
    // Draw line
    ctx.beginPath();
    data.datasets[0].data.forEach((value, i) => {
      const x = padding.left + (i / (pointCount - 1)) * chartWidth;
      const y = height - padding.bottom - (value / maxValue) * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      // Draw point
      ctx.fillStyle = data.datasets[0].backgroundColor[0] || '#ccc';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw label
      ctx.fillStyle = '#888';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.font = '10px sans-serif';
      ctx.fillText(data.labels[i], x, height - padding.bottom + 5);
    });
    
    ctx.strokeStyle = data.datasets[0].borderColor?.[0] || '#3b82f6';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas ref={chartRef} />
      </CardContent>
    </Card>
  );
};

export default Chart;