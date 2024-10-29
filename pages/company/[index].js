import { useContext, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./company.module.scss";
import Image from "next/legacy/image";
import dbConnect from "@/services/dbConnect";
import companyModel from "@/models/Company";

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
    <div className={classes.card}>
      <div className={classes.row}>
        <div className={classes.logo}>
          <Image
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
        <p
          className={classes.phone}
          onClick={() =>
            window.open(`tel:+98${companyData.contact.substring(1)}`, "_self")
          }
        >
          {companyData.contact}
        </p>
        <h4>نماینده: {companyData.manager}</h4>
      </div>
      <div className={classes.details}>
        <p className={classes.address}>آدرس: {companyData.address}</p>
        <p>{companyData.description}</p>
      </div>
    </div>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    let name = context.query.index;
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
