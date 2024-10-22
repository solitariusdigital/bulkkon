import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Image from "next/legacy/image";
import secureLocalStorage from "react-secure-storage";
import { getSingleUserApi, getControlsApi } from "@/services/api";

export default function RootLayout({ children }) {
  const { language, setLanguage } = useContext(StateContext);
  const { languageType, setLanguageType } = useContext(StateContext);
  const { navigationBar, setNavigationBar } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [loadImage, setLoadImage] = useState(null);
  const [appLoader, setAppLoader] = useState(false);
  const [appLive, setAppLive] = useState(false);

  const router = useRouter();
  let pathname = router.pathname;

  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    let screenSize;
    if (width < 700) {
      screenSize = "mobile";
    } else if (width >= 700 && width < 1400) {
      screenSize = width > height ? "tablet-landscape" : "tablet-portrait";
    } else {
      screenSize = "desktop";
    }
    setScreenSize(screenSize);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigationBar.map((nav) => {
      if (nav.link === "/") {
        navigationBar[0].active = true;
      } else if (pathname.includes(nav.link)) {
        navigationBar[0].active = false;
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationBar([...navigationBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div>
        <section className="main">
          <main>{children}</main>
        </section>
        <section>
          <Footer />
        </section>
      </div>
    </Fragment>
  );
}
