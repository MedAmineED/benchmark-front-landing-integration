import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
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
            pathname: "/home/user-menu",
            title: "Social Media",
            user : 3
          },
          {
            icon: "",
            pathname: "/home/user-list",
            title: "User List",
            user : 1
          },
        ],
      }
    ],
  },
});

export { sideMenu };
