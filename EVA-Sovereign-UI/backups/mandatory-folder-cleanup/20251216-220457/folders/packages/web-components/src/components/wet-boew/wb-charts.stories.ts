import type { Meta, StoryObj } from '@storybook/web-components';
import './wb-charts.js';
import type { ChartData } from './wb-charts.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-charts',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

const salesData: ChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales 2024',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: '#335075',
      borderColor: '#335075',
      borderWidth: 2
    },
    {
      label: 'Sales 2023',
      data: [45, 49, 60, 71, 46, 45],
      backgroundColor: '#26374a',
      borderColor: '#26374a',
      borderWidth: 2
    }
  ]
};

const pieData: ChartData = {
  labels: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  datasets: [
    {
      label: 'Population',
      data: [2930000, 675000, 1780000, 1340000, 1020000],
      backgroundColor: ['#335075', '#26374a', '#4a7c59', '#8b5a3c', '#6a5acd']
    }
  ]
};

export const BarChart: Story = {
  render: () => {
    const chart = document.createElement('wb-charts');
    chart.type = 'bar';
    chart.data = salesData;
    chart.title = 'Monthly Sales Comparison';
    return chart;
  }
};

export const LineChart: Story = {
  render: () => {
    const chart = document.createElement('wb-charts');
    chart.type = 'line';
    chart.data = salesData;
    chart.title = 'Sales Trend';
    return chart;
  }
};

export const PieChart: Story = {
  render: () => {
    const chart = document.createElement('wb-charts');
    chart.type = 'pie';
    chart.data = pieData;
    chart.title = 'Population by City';
    return chart;
  }
};

export const DonutChart: Story = {
  render: () => {
    const chart = document.createElement('wb-charts');
    chart.type = 'donut';
    chart.data = pieData;
    chart.title = 'Population Distribution';
    return chart;
  }
};

export const WithDataTable: Story = {
  render: () => {
    const chart = document.createElement('wb-charts');
    chart.type = 'bar';
    chart.data = salesData;
    chart.title = 'Sales with Data Table';
    chart.setAttribute('show-table', 'true');
    return chart;
  }
};

export const NoLegend: Story = {
  render: () => {
    const chart = document.createElement('wb-charts');
    chart.type = 'bar';
    chart.data = salesData;
    chart.title = 'Chart without Legend';
    chart.setAttribute('show-legend', 'false');
    return chart;
  }
};

export const BilingualFrench: Story = {
  render: () => {
    const container = document.createElement('div');
    container.lang = 'fr-CA';
    const chart = document.createElement('wb-charts');
    chart.type = 'bar';
    chart.data = {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
      datasets: [
        {
          label: 'Ventes 2024',
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: '#335075'
        }
      ]
    };
    chart.title = 'Graphique des ventes mensuelles';
    chart.setAttribute('show-table', 'true');
    container.appendChild(chart);
    return container;
  }
};
