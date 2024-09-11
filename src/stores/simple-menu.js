import { atom } from "recoil";

const simpleMenu = atom({
  key: "simpleMenu",
  default: {
    menu: [
      {
        icon: "Home",
        title: "Dashboard",
        user : 3,
        subMenu: [
          {
            icon: "",
            pathname: "/home",
            title: "Home",
            user : 1,
          },
          {
            icon: "",
            pathname: "/user-menu",
            title: "Social Media",
            user : 3
          },
          {
            icon: "",
            pathname: "/user-list",
            title: "User List",
            user : 1
          },
        ],
      }
    ],
  },
});

export { simpleMenu };
