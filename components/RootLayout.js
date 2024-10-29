import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import Menu from "@/components/Menu";
import Image from "next/legacy/image";
import logo from "@/assets/logo.png";
import secureLocalStorage from "react-secure-storage";
import { getSingleUserApi } from "@/services/api";

export default function RootLayout({ children }) {
  const { navigationBar, setNavigationBar } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [appLoader, setAppLoader] = useState(false);

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

  // checks user login and set user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = JSON.parse(
          secureLocalStorage.getItem("currentUser")
        );
        if (currentUser) {
          const userData = await getSingleUserApi(currentUser["_id"]);
          setCurrentUser(userData);
          secureLocalStorage.setItem("currentUser", JSON.stringify(userData));
          if (userData.permission === "admin") {
            setPermissionControl("admin");
          } else {
            setPermissionControl("user");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setTimeout(() => {
      setAppLoader(true);
    }, 1000);
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
      {appLoader ? (
        <div>
          <section>
            <Menu />
          </section>
          <section className="main">
            <main>{children}</main>
          </section>
        </div>
      ) : (
        <div className="appload">
          <Image
            width={220}
            height={150}
            src={logo}
            alt="logo"
            as="image"
            priority
          />
        </div>
      )}
    </Fragment>
  );
}
