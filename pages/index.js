import { Fragment } from "react";
import classes from "./home.module.scss";
import Router from "next/router";
import Table from "@/components/Table";
import dbConnect from "@/services/dbConnect";
import companyModel from "@/models/Company";
import { NextSeo } from "next-seo";
import logo from "@/assets/logo.png";
import Image from "next/legacy/image";

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
        <div className={classes.table}>
          <Table companyData={companyData} />
        </div>
        <div className={classes.image}>
          <Image
            width={220}
            height={150}
            src={logo}
            alt="logo"
            as="image"
            priority
          />
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
