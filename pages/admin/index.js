import { useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./admin.module.scss";
import Company from "@/components/forms/Company";
import Router from "next/router";
import Price from "@/components/forms/Price";
import CompanyList from "@/components/CompanyList";
import dbConnect from "@/services/dbConnect";
import companyModel from "@/models/Company";

export default function Admin({ companyData }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [pageType, setPageType] = useState(
    "فرم شرکت" || "ثبت قیمت" || "شرکت‌ها"
  );

  const navigation = ["فرم شرکت", "ثبت قیمت", "شرکت‌ها"];

  useEffect(() => {
    if (permissionControl !== "admin") {
      Router.push("/portal");
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
      {pageType === "فرم شرکت" && <Company companyData={companyData} />}
      {pageType === "ثبت قیمت" && <Price companyData={companyData} />}
      {pageType === "شرکت‌ها" && <CompanyList companyData={companyData} />}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const companyData = await companyModel.find();

    return {
      props: {
        companyData: JSON.parse(JSON.stringify(companyData)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
