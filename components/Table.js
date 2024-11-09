import { useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Table.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import dynamic from "next/dynamic";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  fourGenerator,
  convertNumber,
  findPriceDates,
  calculatePriceChange,
  calculateSevenDaysAverage,
} from "@/services/utility";

const Chart = dynamic(() => import("@/components/Chart"), { ssr: false });

export default function Table({ companyData, productType }) {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { products, setProducts } = useContext(StateContext);

  const [expandedItem, setExpandedItem] = useState(null);

  const expandInformation = (index) => {
    setExpandedItem(index);
    if (expandedItem === index) {
      setExpandedItem(null);
    }
  };

  return (
    <div className={classes.table}>
      <div className={classes.note}>
        <p>جدول قیمت</p>
        <p>{products.filter((pro) => pro.type === productType)[0].name} </p>
      </div>
      <div className={classes.header}>
        <p style={{ color: "#ffffff" }}>شرکت</p>
        {screenSize !== "mobile" && <p>شرکت</p>}
        <p>قیمت امروز</p>
        <p>میانگین ۷ روز</p>
        <p>تغییر</p>
        {screenSize !== "mobile" && <p>مقدار تغییر</p>}
        {screenSize !== "mobile" && (
          <p className={classes.icon}>
            <ExpandLessIcon sx={{ color: "#ffffff", fontSize: "24px" }} />
          </p>
        )}
      </div>
      {companyData?.map((company, index) => (
        <div key={index}>
          <div
            className={classes.information}
            style={{ background: index % 2 !== 0 ? "#ffffff" : "#e7ecf0" }}
            onClick={() =>
              setExpandedItem(expandedItem === index ? null : index)
            }
          >
            <div className={classes.imageContainer}>
              <div className={classes.image}>
                <Image
                  className={classes.logo}
                  src={company.media}
                  layout="fill"
                  objectFit="contain"
                  alt="logo"
                  as="image"
                />
              </div>
              {screenSize === "mobile" && (
                <p className={classes.name}>{company.name}</p>
              )}
            </div>
            {screenSize !== "mobile" && (
              <p className={classes.name}>{company.name}</p>
            )}
            <p>
              {convertNumber(findPriceDates(company.price[productType], false))}
            </p>
            <p>
              {company.price[productType]
                ? convertNumber(
                    calculateSevenDaysAverage(company.price[productType])
                  )
                : "-"}
            </p>
            <p
              style={{
                color:
                  calculatePriceChange(company.price[productType]).direction ===
                  "+"
                    ? "#4eba5c"
                    : !calculatePriceChange(company.price[productType])
                        .direction
                    ? "#e43137"
                    : "#0a0a0a",
                fontWeight: "500",
              }}
            >
              {calculatePriceChange(company.price[productType]).direction}
              {
                calculatePriceChange(company.price[productType])
                  .percentageChange
              }
            </p>
            {screenSize !== "mobile" && (
              <p
                style={{
                  color:
                    calculatePriceChange(company.price[productType])
                      .direction === "+"
                      ? "#4eba5c"
                      : !calculatePriceChange(company.price[productType])
                          .direction
                      ? "#e43137"
                      : "#0a0a0a",
                }}
              >
                {calculatePriceChange(company.price[productType]).direction}
                {convertNumber(
                  calculatePriceChange(company.price[productType]).changeAmount
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
          {expandedItem === index && screenSize === "mobile" && (
            <div className={classes.details}>
              <p>شرکت: {company.name}</p>
            </div>
          )}
          {expandedItem === index && (
            <div className={classes.details}>
              <p>مدیر فروش: {company.manager}</p>

              <p
                className={classes.about}
                onClick={() => Router.push(`/company/${company.name}`)}
              >
                درباره
              </p>
            </div>
          )}
          {expandedItem === index && (
            <div
              className={classes.details}
              onClick={() =>
                window.open(`tel:+98${company.contact.substring(1)}`, "_self")
              }
            >
              <PhoneIcon />
              <p className={classes.phone}>{company.contact}</p>
            </div>
          )}
          {expandedItem === index && (
            <div>
              <Chart
                chartId={`chart-${fourGenerator()}`}
                companyData={company}
                productType={productType}
                legend={true}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
