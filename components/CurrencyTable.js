import { useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Table.module.scss";
import { convertNumber, getCurrentDate } from "@/services/utility";
import { getCurrencyApi } from "@/services/api";

export default function Table({ companyData, productType }) {
  const [currencyData, setCurrencyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await getCurrencyApi();
        setCurrencyData(data);
      } catch (error) {
        showAlert("خطا در برقراری ارتباط");
      } finally {
        setLoading(false);
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
      {!loading && (
        <div className={classes.information}>
          <p>{convertNumber(currencyData.currency[0].price)}</p>
          <p>{convertNumber(currencyData.currency[1].price)}</p>
          <p>{convertNumber(currencyData.currency[2].price)}</p>
          <p>${convertNumber(currencyData.gold[5].price)}</p>
          <p>{convertNumber(currencyData.gold[6].price)}</p>
        </div>
      )}
      <p className={classes.note}>{getCurrentDate()}</p>
      {alert && <p className={classes.note}>{alert}</p>}
    </div>
  );
}
