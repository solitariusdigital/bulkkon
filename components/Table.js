import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Table.module.scss";
import logo from "@/assets/logo.svg";
import Image from "next/legacy/image";
import Router from "next/router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import dynamic from "next/dynamic";
import { fourGenerator } from "@/services/utility";

const Chart = dynamic(() => import("@/components/Chart"), { ssr: false });

export default function Table() {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [expandedItem, setExpandedItem] = useState(null);

  const companies = [
    {
      name: "شرکت",
      today: 340000,
      yesterday: 338000,
      logo: logo,
    },
    {
      name: "شرکت",
      today: 338000,
      yesterday: 340000,
      logo: logo,
    },
    {
      name: "شرکت",
      today: 345000,
      yesterday: 338000,
      logo: logo,
    },
    {
      name: "شرکت",
      today: 340000,
      yesterday: 340000,
      logo: logo,
    },
  ];

  const expandInformation = (index) => {
    setExpandedItem(index);
    if (expandedItem === index) {
      setExpandedItem(null);
    }
  };

  const calculateChange = (data) => {
    const { today, yesterday } = data;
    // Calculate the change amount
    const changeAmount = today - yesterday;
    // Calculate the percentage change
    const percentageChange = ((changeAmount / yesterday) * 100).toFixed(2); // Fixed to 2 decimal places
    // Determine if it went up or down
    const direction = changeAmount > 0 ? "+" : changeAmount < 0 ? " " : " ";
    return {
      percentageChange: percentageChange + "%",
      changeAmount: changeAmount,
      direction: direction,
    };
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.header}>
          <th>شرکت</th>
          <th>قیمت امروز</th>
          {screenSize !== "mobile" && <th>قیمت دیروز</th>}
          <th>تغییر</th>
          <th className={classes.icon}>
            <ExpandLessIcon sx={{ color: "#ffffff" }} />
          </th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company, index) => (
          <Fragment key={index}>
            <tr
              className={classes.information}
              onClick={() =>
                setExpandedItem(expandedItem === index ? null : index)
              }
            >
              <td className={classes.logo}>
                <div className={classes.image}>
                  <Image
                    src={company.logo}
                    layout="fill"
                    objectFit="contain"
                    alt="logo"
                    as="image"
                    priority
                  />
                </div>
              </td>
              <td>{company.today}</td>
              {screenSize !== "mobile" && <td>{company.yesterday}</td>}
              <td
                style={{
                  color:
                    calculateChange(company).direction === "+"
                      ? "#4eba5c"
                      : "#e43137",
                  fontWeight: "500",
                }}
              >
                {calculateChange(company).direction}
                {calculateChange(company).percentageChange}
              </td>
              <td className={classes.icon}>
                {expandedItem === index ? (
                  <ExpandLessIcon
                    className="icon"
                    onClick={() => expandInformation(index)}
                  />
                ) : (
                  <ExpandMoreIcon
                    className="icon"
                    onClick={() => expandInformation(index)}
                  />
                )}
              </td>
            </tr>
            {expandedItem === index && (
              <td colSpan={screenSize !== "mobile" ? 5 : 4}>
                <Chart chartId={`chart-${fourGenerator()}`} legend={false} />
              </td>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
