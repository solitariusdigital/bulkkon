import { useState, useEffect } from "react";
import classes from "./Table.module.scss";
import { convertNumber, getCurrentDate } from "@/services/utility";
import { getCurrencyApi } from "@/services/api";
import loaderImage from "@/assets/loader.png";
import Image from "next/legacy/image";

export default function Table() {
  const [currencyData, setCurrencyData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await getCurrencyApi();
        setCurrencyData(data);
      } catch (error) {
        showAlert("خطا در برقراری ارتباط");
      } finally {
        setLoader(true);
      }
    };
    fetchPrices();
  }, []);

  const showAlert = (message) => {
    setAlert(message);
  };

  return (
    <div className={classes.currencyTable}>
      <div className={classes.header}>
        <p>دلار</p>
        <p>يورو</p>
        <p>درهم</p>
        <p>طلا ۱۸</p>
        <p>انس طلا</p>
      </div>
      {loader && (
        <div className={classes.information}>
          <p>{convertNumber(currencyData.currency[0].price)}</p>
          <p>{convertNumber(currencyData.currency[1].price)}</p>
          <p>{convertNumber(currencyData.currency[2].price)}</p>
          <p>{convertNumber(currencyData.gold[6].price)}</p>
          <p>${convertNumber(currencyData.gold[5].price)}</p>
        </div>
      )}
      {!loader && (
        <div className={classes.note}>
          <Image
            width={50}
            height={50}
            src={loaderImage}
            alt="loader"
            unoptimized
          />
        </div>
      )}
      <p className={classes.note}>{getCurrentDate()}</p>
      {alert && <p className={classes.note}>{alert}</p>}
    </div>
  );
}
