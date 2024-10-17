import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const DateChart = ({ dateTotal }) => {
  let date = Object.keys(dateTotal)
  let totalSale = Object.values(dateTotal)

  const [state, setstate] = useState("");

  useEffect(() => {
    setstate({
      options: {
        colors: ["#00AA55"],
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
          name: "series-1",
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
