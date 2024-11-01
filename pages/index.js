import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import Router from "next/router";
import Image from "next/legacy/image";
import Table from "@/components/Table";
import dbConnect from "@/services/dbConnect";
import companyModel from "@/models/Company";
import { NextSeo } from "next-seo";
import logo from "@/assets/logo.png";

export default function Home({ companyData }) {
  return (
    <Fragment>
      <NextSeo
        title="Kimpur"
        description="Kimpur Price"
        canonical="https://www.kimpur.com"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://www.kimpur.com",
          title: "Kimpur",
          description: "Kimpur Price",
          siteName: "Kimpur",
          images: {
            url: logo,
            width: 1200,
            height: 630,
            alt: "Kimpur",
          },
        }}
        robotsProps={{
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
        }}
      />
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
    </Fragment>
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
