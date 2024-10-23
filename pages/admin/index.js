import { useContext, Fragment, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./admin.module.scss";
import Company from "@/components/forms/Company";
import Router from "next/router";
import Price from "@/components/forms/Price";

export default function Admin() {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [formType, setFormType] = useState("شرکت" || "قیمت");

  const navigation = ["شرکت", "قیمت"];

  useEffect(() => {
    if (permissionControl !== "admin") {
      Router.push("/");
    }
  }, [permissionControl]);

  return (
    <div className={classes.container}>
      <h3>{currentUser?.name}</h3>
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
      {formType === "قیمت" && <Price />}
    </div>
  );
}
