import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./compare.module.scss";
import dynamic from "next/dynamic";
import { fourGenerator } from "@/services/utility";

const Chart = dynamic(() => import("@/components/Chart"), { ssr: false });

export default function Compare() {
  const [companyOne, setCompanyOne] = useState("");
  const [companyTwo, setCompanyTwo] = useState("");

  const companies = ["شرکت قوام", "شرکت اوین", "شرکت خردمند"];

  return (
    <div className={classes.container}>
      <h3>مقایسه قیمت دو شرکت با یکدیگر</h3>
      <div className={classes.inputContainer}>
        <div className={classes.input}>
          <select
            defaultValue={"default"}
            onChange={(e) => {
              setCompanyOne(e.target.value);
            }}
          >
            <option value="default" disabled>
              انتخاب شرکت اول
            </option>
            {companies.map((company, index) => {
              return (
                <option key={index} value={company}>
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
              setCompanyTwo(e.target.value);
            }}
          >
            <option value="default" disabled>
              انتخاب شرکت دوم
            </option>
            {companies.map((company, index) => {
              return (
                <option key={index} value={company}>
                  {company}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {companyOne && companyTwo && (
        <Fragment>
          <div className={classes.text}>
            <p>مقایسه</p>
            <p className={classes.name}>{companyOne}</p>
            <p>با</p>
            <p className={classes.name}>{companyTwo}</p>
          </div>
          <div className={classes.chart}>
            <Chart chartId={`chart-${fourGenerator()}`} legend={true} />
          </div>
        </Fragment>
      )}
    </div>
  );
}
