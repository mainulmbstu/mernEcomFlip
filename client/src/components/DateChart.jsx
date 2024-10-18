import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const DateChart = ({ dateTotal }) => {
  let dateTotalObj = {};
  dateTotal.length &&
    dateTotal.map((item) => {
      let date = new Date(item.createdAt).toLocaleDateString();
      dateTotalObj[date] = (dateTotalObj[date] || 0) + item.total;
    });
  let date = Object.keys(dateTotalObj);
  let totalSale = Object.values(dateTotalObj);
  const [state, setstate] = useState("");

  useEffect(() => {
    setstate({
      options: {
        colors: ["#111EAA"],
        //   color: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],
        chart: {
          id: "apexchart-example",
        },
        xaxis: {
          categories: date,
        },
      },
      series: [
        {
          name: "Total Sale",
          data: totalSale,
        },
      ],
    });
  }, [dateTotal]);

  return (
    <div>
      {state && state?.series && (
        <Chart
          options={state?.options}
          series={state?.series}
          type="bar" //line, area, bar, pie, donut, scatter, bubble, heatmap, radialBar
          width={"100%"}
          height={320}
        />
      )}
    </div>
  );
};

export default DateChart;
