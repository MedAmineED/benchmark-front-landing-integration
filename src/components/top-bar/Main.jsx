import { useEffect, useState } from "react";
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
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import useTokenVerification from "../../hooks/useTokenVerification";
import { useNavigate } from "react-router-dom";

function Main(props) {
  const [searchDropdown, setSearchDropdown] = useState(false);

  const navigate = useNavigate();

  const {isVerified, verificationResult}= useTokenVerification();
  const [userData, setUserData] = useState({
    userName : "",
    fullname : ""
  });
  


  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

    const logout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("userData");
    localStorage.removeItem("isAdmin");

    // Navigate to the login page
    navigate("/login");
  };

  useEffect(()=> {
    if(isVerified){
      setUserData({
        userName : verificationResult.user.name,
        fullname : verificationResult.user.fullname
      })
    }
    console.log("from top bar : ", verificationResult)
  }, [isVerified])

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="top-bar">
        {/* BEGIN: Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          className="-intro-x mr-auto hidden sm:flex"
        >
          <ol className="breadcrumb">
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
              onFocus={showSearchDropdown}
              onBlur={hideSearchDropdown}
            />
            <Lucide
              icon="Search"
              className="search__icon dark:text-slate-500"
            />
          </div>
        </div>
        {/* END: Search  */}
        {/* BEGIN: Notifications */}
        <Dropdown className="intro-x mr-auto sm:mr-6">
          <DropdownToggle
            tag="div"
            role="button"
            className="notification notification--bullet cursor-pointer"
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
        {/* END: Notifications  */}
        {/* BEGIN: Account Menu */}
        <Dropdown className="intro-x w-8 h-8">
          <DropdownToggle
            tag="div"
            role="button"
            className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
          >
            <img
              alt="Midone Tailwind HTML Admin Template"
              src={$f()[9].photos[0]}
            />
          </DropdownToggle>
          <DropdownMenu className="w-56">
            <DropdownContent className="bg-primary text-white">
              <DropdownHeader tag="div" className="!font-normal">
                <div className="font-medium">{userData.fullname}</div>
                <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                  {userData.userName}
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
              <DropdownItem onClick = {()=>{logout()}} className="hover:bg-white/5">
                <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
        {/* END: Account Menu */}
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;
