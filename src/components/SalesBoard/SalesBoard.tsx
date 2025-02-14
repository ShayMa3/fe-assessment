import React from 'react';
import { format } from 'date-fns';
import './SalesBoard.css';
import { ISale } from '../../service/api';

const columns: string[] = [
  'week ending',
  'retail sales',
  'wholesale sales',
  'unit sold',
  'retail margin',
];

interface ISalesBoardProps {
  sales: ISale[];
}

const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;

const SalesHeader: React.FC = () => (
  <div className="sales-header">
    {columns.map((header, i) => (
      <div key={i} className="sales-header-column">
        <span>{header}</span>
      </div>
    ))}
  </div>
);

const SalesRow: React.FC<{ weekData: ISale }> = ({ weekData }) => (
  <div className="sales-row">
    <div>
      <span>{format(new Date(`${weekData.weekEnding}T00:00:00`), 'MM-dd-yy')}</span>
      <span>{formatCurrency(weekData.retailSales)}</span>
      <span>{formatCurrency(weekData.wholesaleSales)}</span>
      <span>{weekData.unitsSold}</span>
      <span>{formatCurrency(weekData.retailerMargin)}</span>
    </div>
  </div>
);

export const SalesBoard: React.FC<ISalesBoardProps> = ({ sales }) => {
  if (!sales || sales.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="sales-board">
      <SalesHeader />
      {sales.map((weekData, i) => (
        <SalesRow key={i} weekData={weekData} />
      ))}
    </div>
  );
};
