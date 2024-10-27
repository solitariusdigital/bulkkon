import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import Router from "next/router";
import Image from "next/legacy/image";
import Table from "@/components/Table";
import dbConnect from "@/services/dbConnect";
import companyModel from "@/models/Company";

export default function Home({ companyData }) {
  const { screenSize, setScreenSize } = useContext(StateContext);

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
