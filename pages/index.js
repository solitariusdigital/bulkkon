import { Fragment } from "react";
import classes from "./home.module.scss";
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
        title="Bulkkon"
        description="Bulkkon Price"
        canonical="https://www.bulkkon.com"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://www.bulkkon.com",
          title: "Bulkkon",
          description: "Bulkkon Price",
          siteName: "Bulkkon",
          images: {
            url: logo,
            width: 1200,
            height: 630,
            alt: "Bulkkon",
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
        <div className={classes.notes}>
          <p>.مالیات بر ارزش افزوده در جدول قیمت محاسبه نشده است</p>
          <p>.واحد قیمت در جدول، ریال / کیلوگرم است</p>
        </div>
        <div
          className={classes.image}
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
        >
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
