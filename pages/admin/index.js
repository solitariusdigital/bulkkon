import { useContext, Fragment, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./admin.module.scss";
import Company from "@/components/forms/Company";
import Router from "next/router";
import Price from "@/components/forms/Price";
import CompanyList from "@/components/CompanyList";
import dbConnect from "@/services/dbConnect";
import companyModel from "@/models/Company";

export default function Admin({ company }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [pageType, setPageType] = useState(
    "شرکت جدید" || "ثبت قیمت" || "شرکت‌ها"
  );

  const navigation = ["شرکت جدید", "ثبت قیمت", "شرکت‌ها"];

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
            className={pageType === nav ? classes.navActive : classes.nav}
            onClick={() => setPageType(nav)}
          >
            {nav}
          </p>
        ))}
      </div>
      {pageType === "شرکت جدید" && <Company />}
      {pageType === "ثبت قیمت" && <Price />}
      {pageType === "شرکت‌ها" && <CompanyList company={company} />}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const company = await companyModel.find();

    return {
      props: {
        company: JSON.parse(JSON.stringify(company)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
