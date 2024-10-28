import { useContext, Fragment, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./compare.module.scss";
import dynamic from "next/dynamic";
import {
  fourGenerator,
  convertNumber,
  findPriceDates,
  calculatePriceChange,
} from "@/services/utility";
import dbConnect from "@/services/dbConnect";
import companyModel from "@/models/Company";

const ChartCompare = dynamic(() => import("@/components/ChartCompare"), {
  ssr: false,
});

export default function Compare({ companyData }) {
  const { navigationBar, setNavigationBar } = useContext(StateContext);
  const [companyOne, setCompanyOne] = useState(null);
  const [companyTwo, setCompanyTwo] = useState(null);
  const [renderChart, setRenderChart] = useState(true);

  const [companies, setCompanies] = useState(
    companyData.map((company) => company.name)
  );

  useEffect(() => {
    navigationBar.map((nav) => {
      nav.active = false;
    });
    setNavigationBar([...navigationBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
                </div>
                <div className={classes.info}>
                  <p>{companyOne.name}</p>
                  <p>
                    {convertNumber(findPriceDates(companyOne.price, false))}
                  </p>
                  <p>{convertNumber(findPriceDates(companyOne.price, true))}</p>
                  <p
                    style={{
                      color:
                        calculatePriceChange(companyOne.price).direction === "+"
                          ? "#4eba5c"
                          : !calculatePriceChange(companyOne.price).direction
                          ? "#e43137"
                          : "#0a0a0a",
                      fontWeight: "500",
                    }}
                  >
                    {calculatePriceChange(companyOne.price).direction}
                    {calculatePriceChange(companyOne.price).percentageChange}
                  </p>
                </div>
                <div className={classes.info}>
                  <p>{companyTwo.name}</p>
                  <p>
                    {convertNumber(findPriceDates(companyTwo.price, false))}
                  </p>
                  <p>{convertNumber(findPriceDates(companyTwo.price, true))}</p>
                  <p
                    style={{
                      color:
                        calculatePriceChange(companyTwo.price).direction === "+"
                          ? "#4eba5c"
                          : !calculatePriceChange(companyTwo.price).direction
                          ? "#e43137"
                          : "#0a0a0a",
                      fontWeight: "500",
                    }}
                  >
                    {calculatePriceChange(companyTwo.price).direction}
                    {calculatePriceChange(companyTwo.price).percentageChange}
                  </p>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
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
