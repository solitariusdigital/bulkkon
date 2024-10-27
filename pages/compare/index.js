import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./compare.module.scss";
import dynamic from "next/dynamic";
import { fourGenerator } from "@/services/utility";
import dbConnect from "@/services/dbConnect";
import companyModel from "@/models/Company";

const ChartCompare = dynamic(() => import("@/components/ChartCompare"), {
  ssr: false,
});

export default function Compare({ companyData }) {
  const [companyOne, setCompanyOne] = useState(null);
  const [companyTwo, setCompanyTwo] = useState(null);
  const [renderChart, setRenderChart] = useState(false);

  const [companies, setCompanies] = useState(
    companyData.map((company) => company.name)
  );

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
              <p className={classes.name}>{companyOne.name}</p>
              <p>با</p>
              <p className={classes.name}>{companyTwo.name}</p>
            </div>
          </div>
          {renderChart && (
            <div className={classes.chart}>
              <ChartCompare
                chartId={`chart-${fourGenerator()}`}
                companyOne={companyOne}
                companyTwo={companyTwo}
                legend={true}
              />
            </div>
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

    return {
      props: {
        companyData: JSON.parse(JSON.stringify(companyData)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
