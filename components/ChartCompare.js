import { useContext, useEffect, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Chart.module.scss";
import c3 from "c3";
import "c3/c3.css";
import { convertPersianToGregorian } from "@/services/utility";

const ChartCompare = ({
  chartId,
  legend,
  companyOne,
  companyTwo,
  productType,
}) => {
  const { screenSize, setScreenSize } = useContext(StateContext);

  const productTypeValueOne = companyOne.price[productType];
  const productTypeValueTwo = companyTwo.price[productType];

  const dateValues = [
    ...new Set([
      ...Object.keys(productTypeValueOne || {}),
      ...Object.keys(productTypeValueTwo || {}),
    ]),
  ].sort((a, b) => convertPersianToGregorian(a) - convertPersianToGregorian(b));
  dateValues.unshift("x");

  const priceValuesOne = [companyOne.name];
  const priceValuesTwo = [companyTwo.name];

  let previousPriceOne = null;
  let previousPriceTwo = null;
  // Populate price values, using the previous price as a placeholder if the current date's price is not available
  if (productTypeValueOne && productTypeValueTwo) {
    dateValues.slice(1).forEach((date) => {
      const currentPriceOne =
        productTypeValueOne[date] !== undefined
          ? productTypeValueOne[date]
          : previousPriceOne;
      const currentPriceTwo =
        productTypeValueTwo[date] !== undefined
          ? productTypeValueTwo[date]
          : previousPriceTwo;
      priceValuesOne.push(currentPriceOne);
      priceValuesTwo.push(currentPriceTwo);
      // Update previous prices for the next iteration
      previousPriceOne = currentPriceOne;
      previousPriceTwo = currentPriceTwo;
    });
  }

  useEffect(() => {
    if (!productTypeValueOne && !productTypeValueTwo) return;
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
              return (value / 10000)
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            return value / 10000;
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
  }, [productType]);

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

  return (
    <Fragment>
      {productTypeValueOne && productTypeValueTwo ? (
        <div id={chartId} className={classes.chart}></div>
      ) : (
        <p className={classes.note}>.قیمت برای نمایش نمودار وجود ندارد</p>
      )}
    </Fragment>
  );
};

export default ChartCompare;
