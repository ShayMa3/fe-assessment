import apiData from '../assets/Webdev_data2.json';

export interface ISale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

export interface IRetailItem {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  tags: string[];
  sales: ISale[];
}

export const fetchData = (): Promise<IRetailItem[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve((apiData as unknown) as IRetailItem[]), 600);
  });
