import { useState, useContext, Fragment, useEffect } from "react";
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

  const priceValuesOne = dateValues.map(
    (date) => companyOne.price[date] || null
  );
  const priceValuesTwo = dateValues.map(
    (date) => companyTwo.price[date] || null
  );
  priceValuesOne.unshift(companyOne.name);
  priceValuesTwo.unshift(companyTwo.name);

  useEffect(() => {
    const chart = c3.generate({
      bindto: `#${chartId}`,
      data: {
        x: "x",
        columns: [dateValues, priceValuesOne, priceValuesTwo],
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%Y-%m-%d",
          },
          show: screenSize !== "mobile",
        },
        y: {
          show: false,
        },
      },
      legend: {
        show: legend,
      },
      padding: {
        left: 20,
        right: 20,
      },
      tooltip: {
        format: {
          value: (value, ratio, id) => {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          },
        },
      },
    });

    return () => {
      chart.destroy(); // Cleanup on unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id={chartId} className={classes.chart}></div>;
};

export default ChartCompare;
