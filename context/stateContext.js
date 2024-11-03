import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [screenSize, setScreenSize] = useState(
    "desktop" || "tablet-landscape" || "tablet-portrait" || "mobile"
  );
  const [permissionControl, setPermissionControl] = useState("user" || "super");
  const [navigationBar, setNavigationBar] = useState([
    {
      title: "جدول قیمت",
      link: "/",
      active: false,
    },
    {
      title: "ابزار مقایسه",
      link: "/compare",
      active: false,
    },
    {
      title: "پورتال",
      link: "/admin",
      active: false,
    },
  ]);
  const [products, setProducts] = useState([
    {
      name: "ایزو MDI",
      type: "one",
    },
    {
      name: "فوم‌ سخت Rigid",
      type: "two",
    },
    {
      name: "فوم‌ انعطاف‌پذیر Flexible",
      type: "three",
    },
    {
      name: "زیره کفش",
      type: "four",
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
    products,
    setProducts,
  };
  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
