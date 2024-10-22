import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./home.module.scss";
import Router from "next/router";
import Image from "next/legacy/image";
import Table from "@/components/Table";

export default function Home() {
  const { screenSize, setScreenSize } = useContext(StateContext);

  return (
    <div className={classes.container}>
      <button
        className={classes.button}
        onClick={() => Router.push("/compare")}
      >
        مقایسه قیمت
      </button>
      <div className={classes.table}>
        <Table />
      </div>
    </div>
  );
}
