import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Form.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";

export default function Price() {
  const [day, setDay] = useState(null);
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const companies = ["شرکت قوام", "شرکت اوین", "شرکت خردمند"];

  const handleSubmit = () => {
    if (!company || !price || !date) {
      showAlert("همه موارد الزامیست");
      return;
    }
    showAlert("ذخیره شد");
    setDisableButton(true);
  };

  const assingDay = (day) => {
    setDay(day);
    const dateString = `${day.year}-${day.month}-${day.day}`;
    setDate(dateString);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <div className={classes.form}>
      <div className={classes.input}>
        <select
          defaultValue={"default"}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        >
          <option value="default" disabled>
            انتخاب شرکت
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
      {company && (
        <div className={classes.calendar}>
          <Calendar
            value={day}
            onChange={(day) => assingDay(day)}
            shouldHighlightWeekends
            locale="fa"
          />
        </div>
      )}
      {day && (
        <Fragment>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                <span>*</span>
                قیمت
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setPrice(0)}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              type="number"
              id="price"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              autoComplete="off"
            ></input>
          </div>
          <div className={classes.priceInfo}>
            <p>{company}</p>
            <p>{price}</p>
            <p>{date}</p>
          </div>
          <div className={classes.formAction}>
            <p className={classes.alert}>{alert}</p>
            <button disabled={disableButton} onClick={() => handleSubmit()}>
              ذخیره داده
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
}
