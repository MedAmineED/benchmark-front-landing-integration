import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import SimpleMenu from "../layouts/simple-menu/Main";
import TopMenu from "../layouts/top-menu/Main";
import HomePage from "../views/home-page/Main";
import SocialMediaIndights from "../views/social-media-insights/Main";
import UserList from "../views/users-list/Main";
import Login from "../views/login/Main";
import Register from "../views/register/Main";
import ErrorPage from "../views/error-page/Main";
import UserMenu from "../views/user-menu/Main";
import LandingPage from "../views/landingPage/LandingPage";
import Navbar from "../layouts/Navbar/navbar";
import About from "../views/About/About";
import Features from "../views/Features/features";
import Solutions from "../views/Solutions/solutions";


function Router() {

  const routes = [
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/features",
          element: <Features />,
        },
        {
          path: "/solution",
          element: <Solutions />,
        },
      ]
     }
      ,
    {
      path: "/home",
      element:<SideMenu />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "user-menu",
          element: <UserMenu />,
        },
        {
          path: "social-media-insights",
          element: <SocialMediaIndights />,
        },
        {
          path: "user-list",
          element: <UserList />,
        },
      ],
    },
    {
      path: "/simple-menu",
      element: <SimpleMenu />,
      children: [
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "user-menu",
          element: <UserMenu />,
        },
        {
          path: "social-media-insights",
          element: <SocialMediaIndights />,
        },
        {
          path: "user-list",
          element: <UserList />,
        },
      ],
    },
    {
      path: "/top-menu",
      element: <TopMenu />,
      children: [
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "user-menu",
          element: <UserMenu />,
        },
        {
          path: "social-media-insights",
          element: <SocialMediaIndights />,
        },
        {
          path: "user-list",
          element: <UserList />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
