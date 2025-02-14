import React from 'react';
import { ILineData, LineChart } from './LineChart';
import { months } from './consts';
import { ISale } from '../../service/api';
import './RetailSales.css';

interface IRetailSalesProps {
  sales: ISale[];
}

const createChartData = (sales: ISale[], field: keyof ISale): ILineData[] => {
  return sales.map((x) => ({
    date: x.weekEnding,
    value: Number(x[field]),
  }));
};


const SalesChart: React.FC<{ data: ILineData[]; color: string; title: string }> = ({
  data,
  color,
  title,
}) => (
  <div className="sales-chart-container">
    <h4>{title}</h4>
    <LineChart data={data} color={color} />
  </div>
);

export const RetailSales: React.FC<IRetailSalesProps> = ({ sales }) => {
  if (!sales || sales.length === 0) {
    return <div>No sales data available</div>;
  }

  const retailSalesChartData = createChartData(sales, 'retailSales');
  const wholeSaleChartData = createChartData(sales, 'wholesaleSales');

  return (
    <div className="retail-sales-container">
      <div className="graph-container">
        <SalesChart data={retailSalesChartData} color="#40a5f6" title="Retail Sales" />
        <SalesChart
          data={wholeSaleChartData}
          color="gray"
          title="Wholesale Sales"
        />
        <div className="retail-sales-months">
          {months.map((x, i) => (
            <span key={i}>{x}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
