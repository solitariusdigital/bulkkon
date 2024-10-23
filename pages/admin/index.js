import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./admin.module.scss";
import Company from "@/components/forms/Company";

export default function Admin() {
  const [formType, setFormType] = useState("شرکت" || "قیمت");

  const navigation = ["شرکت", "قیمت"];

  return (
    <div className={classes.container}>
      <div className={classes.navigation}>
        {navigation.map((nav, index) => (
          <p
            key={index}
            className={formType === nav ? classes.navActive : classes.nav}
            onClick={() => setFormType(nav)}
          >
            {nav}
          </p>
        ))}
      </div>
      {formType === "شرکت" && <Company />}
      {formType === "قیمت" && <Company />}
    </div>
  );
}
