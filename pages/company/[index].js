import { Fragment, useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./company.module.scss";
import Image from "next/legacy/image";
import dbConnect from "@/services/dbConnect";
import companyModel from "@/models/Company";
import { NextSeo } from "next-seo";
import PhoneIcon from "@mui/icons-material/Phone";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { replaceSpacesAndHyphens } from "@/services/utility";

export default function Company({ companyData }) {
  const { navigationBar, setNavigationBar } = useContext(StateContext);

  useEffect(() => {
    navigationBar.map((nav) => {
      nav.active = false;
    });
    setNavigationBar([...navigationBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <NextSeo
        title={replaceSpacesAndHyphens(companyData.name)}
        description={companyData.description}
        canonical={`https://bulkkon.com/company/${replaceSpacesAndHyphens(
          companyData.name
        )}`}
        openGraph={{
          type: "article",
          locale: "fa_IR",
          url: `https://bulkkon.com/company/${replaceSpacesAndHyphens(
            companyData.name
          )}`,
          title: `${replaceSpacesAndHyphens(companyData.name)}`,
          description: `${companyData.description}`,
          siteName: "bulkkon",
          article: {
            publishedTime: companyData.createdAt,
            modifiedTime: companyData.updatedAt,
            authors: ["https://www.bulkkon.com"],
          },
          images: {
            url: companyData.media,
            width: 1200,
            height: 630,
            alt: replaceSpacesAndHyphens(companyData.name),
          },
        }}
        robotsProps={{
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
        }}
      />
      <div className={classes.card}>
        <div className={classes.row}>
          <div className={classes.image}>
            <Image
              className={classes.logo}
              src={companyData.media}
              layout="fill"
              objectFit="contain"
              alt="logo"
              as="image"
            />
          </div>
          <h3>{companyData.name}</h3>
        </div>
        <div className={classes.row}>
          <div
            className={classes.row}
            onClick={() =>
              window.open(`tel:+98${companyData.contact.substring(1)}`, "_self")
            }
          >
            <PhoneIcon sx={{ fontSize: 20 }} />
            <p className={classes.phone}>{companyData.contact}</p>
          </div>
          <h4>مدیر فروش: {companyData.manager}</h4>
        </div>
        {companyData.site && (
          <div
            className={classes.row}
            onClick={() => window.open(companyData.site, "_ self")}
          >
            <div className={classes.row}>
              <OpenInNewIcon sx={{ fontSize: 20 }} />
              <p className={classes.link}>{companyData.site}</p>
            </div>
          </div>
        )}
        <div className={classes.details}>
          <p className={classes.address}>آدرس: {companyData.address}</p>
          <p>{companyData.description}</p>
        </div>
      </div>
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    let name = replaceSpacesAndHyphens(context.query.index);
    const companyData = await companyModel.findOne({ name });

    return {
      props: {
        companyData: JSON.parse(JSON.stringify(companyData)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
