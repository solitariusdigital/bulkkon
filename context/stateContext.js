import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [screenSize, setScreenSize] = useState(
    "desktop" || "tablet-landscape" || "tablet-portrait" || "mobile"
  );
  const [permissionControl, setPermissionControl] = useState("user" || "admin");
  const [navigationBar, setNavigationBar] = useState([
    {
      title: "صفحه اصلی",
      link: "/",
      active: false,
    },
    {
      title: "پورتال",
      link: "/admin",
      active: false,
    },
  ]);
  const stateContext = {
    navigationBar,
    setNavigationBar,
    currentUser,
    setCurrentUser,
    screenSize,
    setScreenSize,
    permissionControl,
    setPermissionControl,
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
