import { Fragment, useEffect, useState } from "react";
import classes from "./home.module.scss";
import Router from "next/router";
import Table from "@/components/Table";
import { NextSeo } from "next-seo";
import logo from "@/assets/logo.png";
import { getCompanyApi } from "@/services/api";

export default function Home() {
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const companyData = await getCompanyApi();
      setCompanyData(companyData.filter((comp) => comp.active && comp.price));
    };
    fetchData();
  }, [companyData]);

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
      <section className={classes.container}>
        <button
          className={classes.button}
          onClick={() => Router.push("/compare")}
        >
          ابزار مقایسه قیمت
        </button>
        <div className={classes.table}>
          <Table companyData={companyData} />
        </div>
      </section>
    </Fragment>
  );
}
