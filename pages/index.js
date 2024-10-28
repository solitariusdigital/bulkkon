import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import Router from "next/router";
import Image from "next/legacy/image";
import Table from "@/components/Table";
import dbConnect from "@/services/dbConnect";
import companyModel from "@/models/Company";

export default function Home({ companyData }) {
  return (
    <div className={classes.container}>
      <button
        className={classes.button}
        onClick={() => Router.push("/compare")}
      >
        ابزار مقایسه قیمت
      </button>
      <div className={classes.table}>
        <Table companyData={companyData} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const companyData = await companyModel.find();
    let activeCompanyData = companyData.filter(
      (comp) => comp.active && comp.price
    );

    return {
      props: {
        companyData: JSON.parse(JSON.stringify(activeCompanyData)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
