import { useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Chart.module.scss";
import c3 from "c3";
import "c3/c3.css";

const ChartCompare = ({ chartId, legend, companyOne, companyTwo }) => {
  const { screenSize, setScreenSize } = useContext(StateContext);

  const dateValues = [
    ...new Set([
      ...Object.keys(companyOne.price),
      ...Object.keys(companyTwo.price),
    ]),
  ].sort();
  dateValues.unshift("x");

  const priceValuesOne = [companyOne.name];
  const priceValuesTwo = [companyTwo.name];

  dateValues.slice(1).forEach((date) => {
    priceValuesOne.push(companyOne.price[date] || null);
    priceValuesTwo.push(companyTwo.price[date] || null);
  });

  useEffect(() => {
    const chart = c3.generate({
      bindto: `#${chartId}`,
      data: {
        x: "x",
        columns: [dateValues, priceValuesOne, priceValuesTwo],
      },
      color: {
        pattern: ["#043d71", "#ff0d29"],
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%Y-%m-%d",
            count: generateAxisCount(),
          },
          label: {
            text: "تاریخ",
            position: "inner-right",
          },
        },
        y: {
          tick: {
            format: function (value) {
              return (value / 1000)
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Convert to thousands and format with commas
            },
            count: generateAxisCount(),
          },
          label: {
            text: "هزار تومان",
            position: "outer-top",
          },
        },
      },
      point: {
        show: false,
      },
      legend: {
        show: legend,
      },
      padding: {
        right: 40,
      },
      tooltip: {
        format: {
          value: (value, ratio, id) => {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          },
        },
      },
      grid: {
        y: {
          show: true,
        },
      },
    });

    return () => {
      chart.destroy(); // Cleanup on unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateAxisCount = () => {
    let count = 0;
    switch (screenSize) {
      case "desktop":
        count = 9;
        break;
      case "tablet-landscape":
        count = 7;
        break;
      case "tablet-portrait":
        count = 5;
        break;
      case "mobile":
        count = 4;
        break;
    }
    return count;
  };

  return <div id={chartId} className={classes.chart}></div>;
};

export default ChartCompare;
