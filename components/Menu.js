import { useContext, Fragment, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Menu.module.scss";
import Image from "next/legacy/image";
import Router from "next/router";

export default function Menu() {
  const { language, setLanguage } = useContext(StateContext);
  const { navigationBar, setNavigationBar } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);

  const activateNav = (link, index) => {
    navigationBar.map((nav, i) => {
      if (i === index) {
        Router.push(link);
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationBar([...navigationBar]);
  };

  return (
    <div className={classes.menu}>
      <div className={classes.navigation}>
        {navigationBar.map((nav, index) => (
          <Fragment key={index}>
            <a
              className={!nav.active ? classes.nav : classes.navActive}
              onClick={() => activateNav(nav.link, index)}
            >
              {nav.title}
            </a>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
