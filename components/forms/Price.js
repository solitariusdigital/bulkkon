import { Fragment, useState } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { updateCompanyApi, getSingleCompanyApi } from "@/services/api";
import { convertNumber } from "@/services/utility";

export default function Price({ companyData }) {
  const [day, setDay] = useState(null);
  const [company, setCompany] = useState("");
  const [selectedCompany, setSelectedCompany] = useState({});
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [companies, setCompanies] = useState(
    companyData.map((company) => company.name)
  );
  const [disableButton, setDisableButton] = useState(false);
  const [alert, setAlert] = useState("");

  const handleSubmit = async () => {
    if (!company || !price || !date) {
      showAlert("همه موارد الزامیست");
      return;
    }

    setDisableButton(true);

    let getCompanyData = await getSingleCompanyApi(selectedCompany["_id"]);
    const companyObject = {
      ...getCompanyData,
      price: {
        ...getCompanyData.price,
        [date]: Number(price),
      },
    };

    await updateCompanyApi(companyObject);
    showAlert("ذخیره شد");
  };

  const assingDay = (day) => {
    setDay(day);
    const dateString = `${day.year}-${day.month}-${day.day}`;
    setDate(dateString);
    setDisableButton(false);
  };

  const selectCompany = (index) => {
    setCompany(companyData[index].name);
    setSelectedCompany(companyData[index]);
    setDisableButton(false);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 1500);
  };

  return (
    <div className={classes.form}>
      <div className={classes.input}>
        <select
          defaultValue={"default"}
          onChange={(e) => {
            selectCompany(e.target.value);
          }}
        >
          <option value="default" disabled>
            انتخاب شرکت
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
                قیمت ریال
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
            <p>{convertNumber(Number(price))} ریال</p>
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
