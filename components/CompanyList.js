import { useContext, Fragment, useState } from "react";
import classes from "./CompanyList.module.scss";
import Image from "next/legacy/image";

export default function CompanyList({ company }) {
  return (
    <div className={classes.container}>
      {company.map((comp, index) => (
        <div key={index} className={classes.card}>
          <h3>{comp.name}</h3>
          <div className={classes.row}>
            <p
              className={classes.phone}
              onClick={() =>
                window.open(`tel:+98${comp.contact.substring(1)}`, "_self")
              }
            >
              {comp.contact}
            </p>
            <h4>{comp.manager}</h4>
          </div>
          <p>{comp.address}</p>
          <p>{comp.description}</p>
        </div>
      ))}
    </div>
  );
}
