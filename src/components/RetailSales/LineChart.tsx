import * as d3 from 'd3';
import * as React from 'react';
import { useEffect } from 'react';

const formatDate = (date: string): string =>
  d3.timeFormat('%d/%b')(d3.timeParse('%Y-%m-%d')(date));

export interface ILineData {
  date: string;
  value: number;
}

interface IProps {
  data: ILineData[];
  color: string;
  className?: string;
}

export const LineChart: React.FC<IProps> = (props) => {
  const { data, color } = props;

  const d3Container = React.useRef(null);
  const margin = 40;
  const width = 800;
  const height = 150;

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);
      const timeDomain = data.map((d) => formatDate(d.date));
      const priceDomain = [
        0,
        d3.max(data, function (d) {
          return +d.value;
        }),
      ];

      let x = d3
        .scalePoint()
        .domain(timeDomain)
        .range([0 + margin, width - margin]);

      let y = d3
        .scaleLinear()
        .domain(priceDomain)
        .range([height - margin, 0 + margin]);

      const line = d3
        .line<ILineData>()
        .x((d) => x(formatDate(d.date)))
        .y((d) => y(d.value))
        .curve(d3.curveCatmullRom.alpha(0.4));
      const lineContainer = svg.append('g');

      lineContainer
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 3)
        .attr('d', line);
    }
  }, [data, color]);

  return (
    <svg
      className={props.className ?? ''}
      width={width}
      height={height}
      ref={d3Container}
    />
  );
};
