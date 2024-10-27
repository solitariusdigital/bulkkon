import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Table.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import dynamic from "next/dynamic";
import {
  fourGenerator,
  convertFaToEn,
  convertNumber,
} from "@/services/utility";

const Chart = dynamic(() => import("@/components/Chart"), { ssr: false });

export default function Table({ companyData }) {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [expandedItem, setExpandedItem] = useState(null);

  const expandInformation = (index) => {
    setExpandedItem(index);
    if (expandedItem === index) {
      setExpandedItem(null);
    }
  };

  const calculateChange = (priceObject) => {
    let today = findPriceDates(priceObject, false);
    let yesterday = findPriceDates(priceObject, true);
    const changeAmount = today - yesterday;
    const percentageChange = ((changeAmount / yesterday) * 100).toFixed(2); // Fixed to 2 decimal places
    const direction = changeAmount > 0 ? "+" : changeAmount < 0 ? null : null;
    if (today !== "-" && yesterday !== "-") {
      return {
        percentageChange: percentageChange + "%",
        changeAmount: changeAmount,
        direction: direction,
      };
    } else {
      return {
        percentageChange: "-",
      };
    }
  };

  const findPriceDates = (price, isYesterday) => {
    let todayDate = getCurrentDate(isYesterday);
    let value;
    for (const key in price) {
      if (key === convertFaToEn(todayDate)) {
        value = price[key];
      }
    }
    return value ? value : "-";
  };

  const getCurrentDate = (isYesterday = false) => {
    const now = new Date();
    if (isYesterday) {
      now.setDate(now.getDate() - 1);
    }
    const date = now.toLocaleDateString("fa-IR", {
      timeZone: "Asia/Tehran",
    });
    return date;
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.header}>
          <th>شرکت</th>
          <th>قیمت امروز</th>
          <th>قیمت دیروز</th>
          <th>تغییر</th>
          {screenSize !== "mobile" && (
            <th className={classes.icon}>
              <ExpandLessIcon sx={{ color: "#ffffff", fontSize: "30px" }} />
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {companyData.map((company, index) => (
          <Fragment key={index}>
            <tr
              className={classes.information}
              onClick={() =>
                setExpandedItem(expandedItem === index ? null : index)
              }
            >
              <td>
                <div className={classes.logo}>
                  <Image
                    src={company.media}
                    layout="fill"
                    objectFit="contain"
                    alt="logo"
                    as="image"
                  />
                </div>
              </td>
              <td>{convertNumber(findPriceDates(company.price, false))}</td>
              <td>{convertNumber(findPriceDates(company.price, true))}</td>
              <td
                style={{
                  color:
                    calculateChange(company.price).direction === "+"
                      ? "#4eba5c"
                      : "#e43137",
                  fontWeight: "500",
                }}
              >
                {calculateChange(company.price).direction}
                {calculateChange(company.price).percentageChange}
              </td>
              {screenSize !== "mobile" && (
                <td className={classes.icon}>
                  {expandedItem === index ? (
                    <ExpandLessIcon
                      sx={{ color: "#13426b", fontSize: "30px" }}
                      className="icon"
                      onClick={() => expandInformation(index)}
                    />
                  ) : (
                    <ExpandMoreIcon
                      sx={{ color: "#13426b", fontSize: "30px" }}
                      className="icon"
                      onClick={() => expandInformation(index)}
                    />
                  )}
                </td>
              )}
            </tr>
            <tr>
              {expandedItem === index && (
                <td>
                  <Chart
                    chartId={`chart-${fourGenerator()}`}
                    companyData={company}
                    legend={true}
                  />
                </td>
              )}
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
