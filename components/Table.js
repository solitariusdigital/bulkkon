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
  convertNumber,
  findPriceDates,
  calculatePriceChange,
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

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.header}>
          <th style={{ color: "#ffffff" }}>شرکت</th>
          {screenSize === "desktop" && <th>شرکت</th>}
          <th>قیمت امروز</th>
          <th>قیمت دیروز</th>
          <th>تغییر</th>
          {screenSize !== "mobile" && <th>مقدار تغییر</th>}
          {screenSize !== "mobile" && (
            <th className={classes.icon}>
              <ExpandLessIcon sx={{ color: "#ffffff", fontSize: "24px" }} />
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {companyData.map((company, index) => (
          <Fragment key={index}>
            <tr
              style={{ background: index % 2 !== 0 ? "#ffffff" : "#e7ecf0" }}
              className={classes.information}
              onClick={() =>
                setExpandedItem(expandedItem === index ? null : index)
              }
            >
              <td className={classes.image}>
                <Image
                  src={company.media}
                  layout="fill"
                  objectFit="contain"
                  alt="logo"
                  as="image"
                />
              </td>
              {screenSize === "desktop" && (
                <td className={classes.name}>{company.name}</td>
              )}
              <td>{convertNumber(findPriceDates(company.price, false))}</td>
              <td>{convertNumber(findPriceDates(company.price, true))}</td>
              <td
                style={{
                  color:
                    calculatePriceChange(company.price).direction === "+"
                      ? "#4eba5c"
                      : !calculatePriceChange(company.price).direction
                      ? "#e43137"
                      : "#0a0a0a",
                  fontWeight: "500",
                }}
              >
                {calculatePriceChange(company.price).direction}
                {calculatePriceChange(company.price).percentageChange}
              </td>
              {screenSize !== "mobile" && (
                <td
                  style={{
                    color:
                      calculatePriceChange(company.price).direction === "+"
                        ? "#4eba5c"
                        : !calculatePriceChange(company.price).direction
                        ? "#e43137"
                        : "#0a0a0a",
                  }}
                >
                  {calculatePriceChange(company.price).direction}
                  {convertNumber(
                    calculatePriceChange(company.price).changeAmount
                  )}
                </td>
              )}
              {screenSize !== "mobile" && (
                <td className={classes.icon}>
                  {expandedItem === index ? (
                    <ExpandLessIcon
                      sx={{ fontSize: "24px" }}
                      className="icon"
                      onClick={() => expandInformation(index)}
                    />
                  ) : (
                    <ExpandMoreIcon
                      sx={{ fontSize: "24px" }}
                      className="icon"
                      onClick={() => expandInformation(index)}
                    />
                  )}
                </td>
              )}
            </tr>
            {expandedItem === index && screenSize !== "desktop" && (
              <tr className={classes.details}>
                <td>شرکت: {company.name}</td>
              </tr>
            )}
            {expandedItem === index && (
              <tr className={classes.details} style={{ marginBottom: "40px" }}>
                <td>نماینده: {company.manager}</td>
                <td
                  className={classes.phone}
                  onClick={() =>
                    window.open(
                      `tel:+98${company.contact.substring(1)}`,
                      "_self"
                    )
                  }
                >
                  {company.contact}
                </td>
                <td
                  className={classes.about}
                  onClick={() => Router.push(`/company/${company.name}`)}
                >
                  درباره
                </td>
              </tr>
            )}
            {expandedItem === index && (
              <tr className={classes.chart}>
                <td>
                  <Chart
                    chartId={`chart-${fourGenerator()}`}
                    companyData={company}
                    legend={true}
                  />
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
