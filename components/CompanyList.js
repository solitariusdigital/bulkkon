import { useContext, Fragment, useState } from "react";
import classes from "./CompanyList.module.scss";
import Image from "next/legacy/image";

export default function CompanyList({ companyData }) {
  return (
    <div className={classes.container}>
      {companyData.map((comp, index) => (
        <div key={index} className={classes.card}>
          <div className={classes.row}>
            <div className={classes.logo}>
              <Image
                src={comp.media}
                layout="fill"
                objectFit="contain"
                alt="logo"
                as="image"
              />
            </div>
            <h3>{comp.name}</h3>
          </div>
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
          <p className={classes.address}>{comp.address}</p>
          <p>{comp.description}</p>
        </div>
      ))}
    </div>
  );
}
