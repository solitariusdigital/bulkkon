import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Chart.module.scss";
import c3 from "c3";
import "c3/c3.css";

const Chart = ({ chartId, legend }) => {
  const { screenSize, setScreenSize } = useContext(StateContext);

  useEffect(() => {
    const chart = c3.generate({
      bindto: `#${chartId}`,
      data: {
        x: "x",
        columns: [
          [
            "x",
            "1403-07-01",
            "1403-07-02",
            "1403-07-03",
            "1403-07-04",
            "1403-07-05",
            "1403-07-06",
          ],
          ["data1", 320, 321, 325, 320, 323, 323],
          ["data2", 319, 321, 320, 323, 325, 321],
        ],
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
          show: screenSize !== "mobile",
        },
      },
      legend: {
        show: legend,
      },
      padding: {
        right: 20,
      },
    });

    return () => {
      chart.destroy(); // Cleanup on unmount
    };
  }, []);

  return <div id={chartId} className={classes.chart}></div>;
};

export default Chart;
