import { Fragment, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import Table from "@/components/Table";
import CurrencyTable from "@/components/CurrencyTable";
import dbConnect from "@/services/dbConnect";
import companyModel from "@/models/Company";
import { NextSeo } from "next-seo";
import logo from "@/assets/logo.png";
import Image from "next/legacy/image";

export default function Home({ companyData }) {
  const { products, setProducts } = useContext(StateContext);
  const [productType, setProductType] = useState("one");

  const activateNav = (type, index) => {
    setProductType(type);
    products.map((product, i) => {
      if (i === index) {
        product.active = true;
      } else {
        product.active = false;
      }
    });
    setProducts([...products]);
  };

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
          <CurrencyTable />
        </div>
        <div className={classes.notes}></div>
        <div className={classes.navigation}>
          {products.map((product, index) => (
            <Fragment key={index}>
              <p
                className={
                  !product.active ? classes.product : classes.productActive
                }
                onClick={() => activateNav(product.type, index)}
              >
                {product.name}
              </p>
            </Fragment>
          ))}
        </div>
        <div className={classes.table}>
          <Table companyData={companyData} productType={productType} />
        </div>
        <div className={classes.notes}>
          <p>.واحد قیمت در جدول، ریال / کیلوگرم است</p>
          <p>.واحد قیمت در نمودار، تومان / کیلوگرم است</p>
          <p>.قیمت درج شده تنها برای اطلاع رسانی میباشد</p>
          <p>.این سامانه مسئولیتی در قبال قیمت ندارد</p>
          <p>.قیمت دقیق باید از طریق تماس با مدیر فروش شرکت دریافت شود</p>
          <p>.مالیات بر ارزش افزوده در جدول قیمت محاسبه نشده است</p>
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
    activeCompanyData.sort((a, b) => {
      if (a.order === 0) return 1;
      if (b.order === 0) return -1;
      return a.order - b.order;
    });
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
