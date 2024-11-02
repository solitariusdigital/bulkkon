import { useContext, useState } from "react";
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
    <div className={classes.table}>
      <div className={classes.header}>
        <p style={{ color: "#ffffff" }}>شرکت</p>
        {screenSize === "desktop" && <p>شرکت</p>}
        <p>قیمت امروز</p>
        <p>قیمت دیروز</p>
        <p>تغییر</p>
        {screenSize !== "mobile" && <p>مقدار تغییر</p>}
        {screenSize !== "mobile" && (
          <p className={classes.icon}>
            <ExpandLessIcon sx={{ color: "#ffffff", fontSize: "24px" }} />
          </p>
        )}
      </div>
      {companyData.map((company, index) => (
        <div key={index}>
          <div
            className={classes.information}
            style={{ background: index % 2 !== 0 ? "#ffffff" : "#e7ecf0" }}
            onClick={() =>
              setExpandedItem(expandedItem === index ? null : index)
            }
          >
            <div className={classes.image}>
              <Image
                src={company.media}
                layout="fill"
                objectFit="contain"
                alt="logo"
                as="image"
              />
            </div>
            {screenSize === "desktop" && (
              <p className={classes.name}>{company.name}</p>
            )}
            <p>{convertNumber(findPriceDates(company.price, false))}</p>
            <p>{convertNumber(findPriceDates(company.price, true))}</p>
            <p
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
            </p>
            {screenSize !== "mobile" && (
              <p
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
              </p>
            )}
            {screenSize !== "mobile" && (
              <div className={classes.icon}>
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
              </div>
            )}
          </div>
          {expandedItem === index && screenSize !== "desktop" && (
            <div className={classes.details}>
              <p>شرکت: {company.name}</p>
            </div>
          )}
          {expandedItem === index && (
            <div className={classes.details} style={{ marginBottom: "40px" }}>
              <p>نماینده: {company.manager}</p>
              <p
                className={classes.phone}
                onClick={() =>
                  window.open(`tel:+98${company.contact.substring(1)}`, "_self")
                }
              >
                {company.contact}
              </p>
              <p
                className={classes.about}
                onClick={() => Router.push(`/company/${company.name}`)}
              >
                درباره
              </p>
            </div>
          )}
          {expandedItem === index && (
            <div>
              <Chart
                chartId={`chart-${fourGenerator()}`}
                companyData={company}
                legend={true}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
