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
  calculateSevenDaysAverage,
} from "@/services/utility";

const ChartCompare = dynamic(() => import("@/components/ChartCompare"), {
  ssr: false,
});

export default function Compare({ companyData }) {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { products, setProducts } = useContext(StateContext);
  const [companyOne, setCompanyOne] = useState(null);
  const [companyTwo, setCompanyTwo] = useState(null);
  const [renderChart, setRenderChart] = useState(true);
  const [productType, setProductType] = useState("");

  const [companies, setCompanies] = useState(
    companyData.map((company) => company.name)
  );

  return (
    <Fragment>
      <NextSeo
        title="Bulkkon"
        description="Bulkkon Price"
        canonical="https://www.bulkkon.com"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://www.bulkkon.com",
          title: "Bulkkon",
          description: "Bulkkon Price",
          siteName: "Bulkkon",
          images: {
            url: logo,
            width: 1200,
            height: 630,
            alt: "Bulkkon",
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
        <div className={classes.input} style={{ marginBottom: "20px" }}>
          <select
            defaultValue={"default"}
            onChange={(e) => {
              setProductType(e.target.value);
            }}
          >
            <option value="default" disabled>
              انتخاب محصول
            </option>
            {products.map((product, index) => {
              return (
                <option key={index} value={product.type}>
                  {product.name}
                </option>
              );
            })}
          </select>
        </div>
        {companyOne && companyTwo && productType && (
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
                    productType={productType}
                    legend={true}
                  />
                </div>
                <div className={classes.notes}>
                  <p>.واحد قیمت در جدول، ریال / کیلوگرم است</p>
                  <p>.واحد قیمت در نمودار، تومان / کیلوگرم است</p>
                  <p>.مالیات بر ارزش افزوده در جدول قیمت محاسبه نشده است</p>
                </div>
                <div className={classes.infoContainer}>
                  <div className={classes.header}>
                    <p>شرکت</p>
                    <p>قیمت امروز</p>
                    <p>میانگین ۷ روز</p>
                    <p>تغییر</p>
                    {screenSize !== "mobile" && <p>مقدار تغییر</p>}
                  </div>
                  <div className={classes.info}>
                    <p>{companyOne.name}</p>
                    <p>
                      {convertNumber(
                        findPriceDates(companyOne.price[productType], false)
                      )}
                    </p>
                    <p>
                      {companyOne.price[productType]
                        ? convertNumber(
                            calculateSevenDaysAverage(
                              companyOne.price[productType]
                            )
                          )
                        : "-"}
                    </p>
                    <p
                      style={{
                        color:
                          calculatePriceChange(companyOne.price[productType])
                            .direction === "+"
                            ? "#4eba5c"
                            : !calculatePriceChange(
                                companyOne.price[productType]
                              ).direction
                            ? "#e43137"
                            : "#0a0a0a",
                      }}
                    >
                      {
                        calculatePriceChange(companyOne.price[productType])
                          .direction
                      }
                      {
                        calculatePriceChange(companyOne.price[productType])
                          .percentageChange
                      }
                    </p>
                    {screenSize !== "mobile" && (
                      <p
                        style={{
                          color:
                            calculatePriceChange(companyOne.price[productType])
                              .direction === "+"
                              ? "#4eba5c"
                              : !calculatePriceChange(
                                  companyOne.price[productType]
                                ).direction
                              ? "#e43137"
                              : "#0a0a0a",
                        }}
                      >
                        {
                          calculatePriceChange(companyOne.price[productType])
                            .direction
                        }
                        {convertNumber(
                          calculatePriceChange(companyOne.price[productType])
                            .changeAmount
                        )}
                      </p>
                    )}
                  </div>
                  <div className={classes.info}>
                    <p>{companyTwo.name}</p>
                    <p>
                      {convertNumber(
                        findPriceDates(companyTwo.price[productType], false)
                      )}
                    </p>
                    <p>
                      {companyTwo.price[productType]
                        ? convertNumber(
                            calculateSevenDaysAverage(
                              companyTwo.price[productType]
                            )
                          )
                        : "-"}
                    </p>
                    <p
                      style={{
                        color:
                          calculatePriceChange(companyTwo.price[productType])
                            .direction === "+"
                            ? "#4eba5c"
                            : !calculatePriceChange(
                                companyTwo.price[productType]
                              ).direction
                            ? "#e43137"
                            : "#0a0a0a",
                      }}
                    >
                      {
                        calculatePriceChange(companyTwo.price[productType])
                          .direction
                      }
                      {
                        calculatePriceChange(companyTwo.price[productType])
                          .percentageChange
                      }
                    </p>
                    {screenSize !== "mobile" && (
                      <p
                        style={{
                          color:
                            calculatePriceChange(companyTwo.price[productType])
                              .direction === "+"
                              ? "#4eba5c"
                              : !calculatePriceChange(
                                  companyTwo.price[productType]
                                ).direction
                              ? "#e43137"
                              : "#0a0a0a",
                        }}
                      >
                        {
                          calculatePriceChange(companyTwo.price[productType])
                            .direction
                        }
                        {convertNumber(
                          calculatePriceChange(companyTwo.price[productType])
                            .changeAmount
                        )}
                      </p>
                    )}
                  </div>
                </div>
                <div className={classes.infoBox}>
                  <div className={classes.infoContainer}>
                    <div className={classes.header}>
                      <p>شرکت</p>
                      <p>مدیر فروش</p>
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
                      <p>مدیر فروش</p>
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
