import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./compare.module.scss";
import dynamic from "next/dynamic";
import dbConnect from "@/services/dbConnect";
import companyModel from "@/models/Company";
import { NextSeo } from "next-seo";
import logo from "@/assets/logo.png";
import {
  fourGenerator,
  convertNumber,
  findPriceDates,
  calculatePriceChange,
} from "@/services/utility";

const ChartCompare = dynamic(() => import("@/components/ChartCompare"), {
  ssr: false,
});

export default function Compare({ companyData }) {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [companyOne, setCompanyOne] = useState(null);
  const [companyTwo, setCompanyTwo] = useState(null);
  const [renderChart, setRenderChart] = useState(true);

  const [companies, setCompanies] = useState(
    companyData.map((company) => company.name)
  );

  return (
    <Fragment>
      <NextSeo
        title="Kimpur"
        description="Kimpur Price"
        canonical="https://www.kimpur.com"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://www.kimpur.com",
          title: "Kimpur",
          description: "Kimpur Price",
          siteName: "Kimpur",
          images: {
            url: logo,
            width: 1200,
            height: 630,
            alt: "Kimpur",
          },
        }}
        robotsProps={{
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
        }}
      />
      <div className={classes.container}>
        <h3>مقایسه قیمت دو شرکت با یکدیگر</h3>
        <div className={classes.inputContainer}>
          <div className={classes.input}>
            <select
              defaultValue={"default"}
              onChange={(e) => {
                setCompanyOne(companyData[e.target.value]);
                setRenderChart(false);
                setTimeout(() => {
                  setRenderChart(true);
                }, 10);
              }}
            >
              <option value="default" disabled>
                انتخاب شرکت اول
              </option>
              {companies.map((company, index) => {
                return (
                  <option key={index} value={index}>
                    {company}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={classes.input}>
            <select
              defaultValue={"default"}
              onChange={(e) => {
                setCompanyTwo(companyData[e.target.value]);
                setRenderChart(false);
                setTimeout(() => {
                  setRenderChart(true);
                }, 10);
              }}
            >
              <option value="default" disabled>
                انتخاب شرکت دوم
              </option>
              {companies.map((company, index) => {
                return (
                  <option key={index} value={index}>
                    {company}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {companyOne && companyTwo && (
          <Fragment>
            <div className={classes.textContainer}>
              <div className={classes.text}>
                <p>مقایسه</p>
                <p>{companyOne.name}</p>
                <p>با</p>
                <p>{companyTwo.name}</p>
              </div>
            </div>
            {renderChart && (
              <Fragment>
                <div className={classes.chart}>
                  <ChartCompare
                    chartId={`chart-${fourGenerator()}`}
                    companyOne={companyOne}
                    companyTwo={companyTwo}
                    legend={true}
                  />
                </div>
                <div className={classes.infoContainer}>
                  <div className={classes.header}>
                    <p>شرکت</p>
                    <p>قیمت امروز</p>
                    <p>قیمت دیروز</p>
                    <p>تغییر</p>
                    {screenSize !== "mobile" && <p>مقدار تغییر</p>}
                  </div>
                  <div className={classes.info}>
                    <p>{companyOne.name}</p>
                    <p>
                      {convertNumber(findPriceDates(companyOne.price, false))}
                    </p>
                    <p>
                      {convertNumber(findPriceDates(companyOne.price, true))}
                    </p>
                    <p
                      style={{
                        color:
                          calculatePriceChange(companyOne.price).direction ===
                          "+"
                            ? "#4eba5c"
                            : !calculatePriceChange(companyOne.price).direction
                            ? "#e43137"
                            : "#0a0a0a",
                      }}
                    >
                      {calculatePriceChange(companyOne.price).direction}
                      {calculatePriceChange(companyOne.price).percentageChange}
                    </p>
                    {screenSize !== "mobile" && (
                      <p
                        style={{
                          color:
                            calculatePriceChange(companyOne.price).direction ===
                            "+"
                              ? "#4eba5c"
                              : !calculatePriceChange(companyOne.price)
                                  .direction
                              ? "#e43137"
                              : "#0a0a0a",
                        }}
                      >
                        {calculatePriceChange(companyOne.price).direction}
                        {convertNumber(
                          calculatePriceChange(companyOne.price).changeAmount
                        )}
                      </p>
                    )}
                  </div>
                  <div className={classes.info}>
                    <p>{companyTwo.name}</p>
                    <p>
                      {convertNumber(findPriceDates(companyTwo.price, false))}
                    </p>
                    <p>
                      {convertNumber(findPriceDates(companyTwo.price, true))}
                    </p>
                    <p
                      style={{
                        color:
                          calculatePriceChange(companyTwo.price).direction ===
                          "+"
                            ? "#4eba5c"
                            : !calculatePriceChange(companyTwo.price).direction
                            ? "#e43137"
                            : "#0a0a0a",
                      }}
                    >
                      {calculatePriceChange(companyTwo.price).direction}
                      {calculatePriceChange(companyTwo.price).percentageChange}
                    </p>
                    {screenSize !== "mobile" && (
                      <p
                        style={{
                          color:
                            calculatePriceChange(companyTwo.price).direction ===
                            "+"
                              ? "#4eba5c"
                              : !calculatePriceChange(companyTwo.price)
                                  .direction
                              ? "#e43137"
                              : "#0a0a0a",
                        }}
                      >
                        {calculatePriceChange(companyTwo.price).direction}
                        {convertNumber(
                          calculatePriceChange(companyTwo.price).changeAmount
                        )}
                      </p>
                    )}
                  </div>
                </div>
                <div className={classes.infoBox}>
                  <div className={classes.infoContainer}>
                    <div className={classes.header}>
                      <p>شرکت</p>
                      <p>نماینده</p>
                      <p>تماس</p>
                    </div>
                    <div className={classes.info}>
                      <p>{companyOne.name}</p>
                      <p>{companyOne.manager}</p>
                      <p
                        className={classes.phone}
                        onClick={() =>
                          window.open(
                            `tel:+98${companyOne.contact.substring(1)}`,
                            "_self"
                          )
                        }
                      >
                        {companyOne.contact}
                      </p>
                    </div>
                    <p className={classes.address}>
                      آدرس: {companyOne.address}
                    </p>
                  </div>
                  <div className={classes.infoContainer}>
                    <div className={classes.header}>
                      <p>شرکت</p>
                      <p>نماینده</p>
                      <p>تماس</p>
                    </div>
                    <div className={classes.info}>
                      <p>{companyTwo.name}</p>
                      <p>{companyTwo.manager}</p>
                      <p
                        className={classes.phone}
                        onClick={() =>
                          window.open(
                            `tel:+98${companyTwo.contact.substring(1)}`,
                            "_self"
                          )
                        }
                      >
                        {companyTwo.contact}
                      </p>
                    </div>
                    <p className={classes.address}>
                      آدرس: {companyTwo.address}
                    </p>
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const companyData = await companyModel.find();
    let activeCompanyData = companyData.filter(
      (comp) => comp.active && comp.price
    );

    return {
      props: {
        companyData: JSON.parse(JSON.stringify(activeCompanyData)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
