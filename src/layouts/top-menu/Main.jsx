import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { helper as $h } from "@/utils";
import { topMenu as useTopMenuStore } from "@/stores/top-menu";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import { useRecoilValue } from "recoil";
import { linkTo, nestedMenu } from "@/layouts/side-menu";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
} from "@/base-components";
import logoUrl from "@/assets/images/logo.svg";
import classnames from "classnames";
import MobileMenu from "@/components/mobile-menu/Main";
import MainColorSwitcher from "@/components/main-color-switcher/Main";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";

function Main() {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState([]);
  const topMenuStore = useRecoilValue(useTopMenuStore);
  const topMenu = () => nestedMenu($h.toRaw(topMenuStore.menu), location);

  useEffect(() => {
    dom("body").removeClass("error-page").removeClass("login").addClass("main");
    setFormattedMenu(topMenu());
  }, [topMenuStore, location.pathname]);

  return (
    <div className="py-5 md:py-0 -mx-3 px-3 sm:-mx-8 sm:px-8 bg-black/[0.15] dark:bg-transparent">
      {/* <DarkModeSwitcher /> dark mode switcher
      <MainColorSwitcher />     change color of view */}
      <MobileMenu />
      {/* BEGIN: Top Bar */}
      <div className="top-bar-boxed border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:mx-0 px-4 sm:px-8 md:px-6 mb-10 md:mb-8">
        <div className="h-full flex items-center">
          {/* BEGIN: Logo */}
          <Link
            to="/top-menu/home"
            className="-intro-x hidden md:flex"
          >
            <img
              alt="Midone Tailwind HTML Admin Template"
              className="w-6"
              src={logoUrl}
            />
            <span className="text-white text-lg ml-3"> Tinker </span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <nav aria-label="breadcrumb" className="-intro-x h-full mr-auto">
            <ol className="breadcrumb breadcrumb-light">
              <li className="breadcrumb-item">
                <a href="#">Application</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
          {/* END: Breadcrumb */}
          {/* BEGIN: Search */}
          <div className="intro-x relative mr-3 sm:mr-6">
            <div className="search hidden sm:block">
              <input
                type="text"
                className="search__input form-control border-transparent"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="search__icon dark:text-slate-500"
              />
            </div>
          </div>
          {/* END: Search */}
          {/* BEGIN: Notifications */}
          <Dropdown className="intro-x mr-4 sm:mr-6">
            <DropdownToggle
              tag="div"
              role="button"
              className="notification notification--light notification--bullet cursor-pointer"
            >
              <Lucide
                icon="Bell"
                className="notification__icon dark:text-slate-500"
              />
            </DropdownToggle>
            <DropdownMenu className="notification-content pt-2">
              <DropdownContent tag="div" className="notification-content__box">
                <div className="notification-content__title">Notifications</div>
                {$_.take($f(), 5).map((faker, fakerKey) => (
                  <div
                    key={fakerKey}
                    className={classnames({
                      "cursor-pointer relative flex items-center": true,
                      "mt-5": fakerKey,
                    })}
                  >
                    <div className="w-12 h-12 flex-none image-fit mr-1">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={faker.photos[0]}
                      />
                      <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                    </div>
                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <a href="" className="font-medium truncate mr-5">
                          {faker.users[0].name}
                        </a>
                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                          {faker.times[0]}
                        </div>
                      </div>
                      <div className="w-full truncate text-slate-500 mt-0.5">
                        {faker.news[0].shortContent}
                      </div>
                    </div>
                  </div>
                ))}
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Notifications */}
          {/* BEGIN: Account Menu */}
          <Dropdown className="intro-x w-8 h-8">
            <DropdownToggle
              tag="div"
              role="button"
              className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
            >
              <img
                alt="Midone Tailwind HTML Admin Template"
                src={$f()[9].photos[0]}
              />
            </DropdownToggle>
            <DropdownMenu className="w-56">
              <DropdownContent className="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                <DropdownHeader tag="div" className="!font-normal">
                  <div className="font-medium">{$f()[0].users[0].name}</div>
                  <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                    {$f()[0].jobs[0]}
                  </div>
                </DropdownHeader>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="Edit" className="w-4 h-4 mr-2" /> Add Account
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Reset Password
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="HelpCircle" className="w-4 h-4 mr-2" /> Help
                </DropdownItem>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Account Menu */}
        </div>
      </div>
      {/* END: Top Bar */}
      {/* BEGIN: Top Menu */}
      <nav className="top-nav">
        <ul>
          {formattedMenu.map((menu, menuKey) => (
            <li key={menuKey}>
              <a
                href={menu.subMenu ? "#" : menu.pathname}
                className={classnames({
                  "top-menu": true,
                  "top-menu--active": menu.active,
                })}
                onClick={(event) => {
                  event.preventDefault();
                  linkTo(menu, navigate);
                }}
              >
                <div className="top-menu__icon">
                  <Lucide icon={menu.icon} />
                </div>
                <div className="top-menu__title">
                  {menu.title}
                  {menu.subMenu && (
                    <Lucide icon="ChevronDown" className="top-menu__sub-icon" />
                  )}
                </div>
              </a>
              {/* BEGIN: Second Child */}
              {menu.subMenu && (
                <ul>
                  {menu.subMenu.map((subMenu, subMenuKey) => (
                    <li key={subMenuKey}>
                      <a
                        href={subMenu.subMenu ? "#" : subMenu.pathname}
                        className="top-menu"
                        onClick={(event) => {
                          event.preventDefault();
                          linkTo(subMenu, navigate);
                        }}
                      >
                        <div className="top-menu__icon">
                          <Lucide icon="Activity" />
                        </div>
                        <div className="top-menu__title">
                          {subMenu.title}
                          {subMenu.subMenu && (
                            <Lucide
                              icon="ChevronDown"
                              className="top-menu__sub-icon"
                            />
                          )}
                        </div>
                      </a>
                      {/* BEGIN: Third Child */}
                      {subMenu.subMenu && (
                        <ul>
                          {subMenu.subMenu.map(
                            (lastSubMenu, lastSubMenuKey) => (
                              <li key={lastSubMenuKey}>
                                <a
                                  href={
                                    lastSubMenu.subMenu
                                      ? "#"
                                      : lastSubMenu.pathname
                                  }
                                  className="top-menu"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    linkTo(lastSubMenu, navigate);
                                  }}
                                >
                                  <div className="top-menu__icon">
                                    <Lucide icon="Zap" />
                                  </div>
                                  <div className="top-menu__title">
                                    {lastSubMenu.title}
                                  </div>
                                </a>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                      {/* END: Third Child */}
                    </li>
                  ))}
                </ul>
              )}
              {/* END: Second Child */}
            </li>
          ))}
        </ul>
      </nav>
      {/* END: Top Menu */}
      {/* BEGIN: Content */}
      <div className="content content--top-nav">
        <Outlet />
      </div>
      {/* END: Content */}
    </div>
  );
}

export default Main;
