import {
  Lucide,
  Tippy
} from "@/base-components";
import ReportPieChart from "@/components/report-pie-chart/Main";
import { useEffect, useRef, useState } from "react";
import useTokenVerification from "../../hooks/useTokenVerification";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShieldCheck } from "lucide-react";

function Main() {
  const importantNotesRef = useRef();
  const {isVerified, verificationResult} = useTokenVerification();
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState({
    allUsersCount : 0,
    activeUser : {
      count : 0,
      percent : 0
    },
    verifiedUsers : {
      count : 0,
      percent : 0
    },
    adminCount : 0
  })
  const navigate = useNavigate();


  const getUsersCount = async ()=> {
                const token = localStorage.getItem("userData");
                setLoading(true);
                const usersCount = await axios.get("http://localhost:8000/api/users/count", {
                  headers : {
                    'authorization': `Bearer ${token}`,
                  }
                });
                const allUsers = usersCount.data.allUsers;
                const active = usersCount.data.activeUsers;
                const verified = usersCount.data.verifiedUsers;
                setInsights({ activeUser : {
                                  count : active, 
                                  percent : ((active / allUsers) * 100).toFixed(2)
                              },
                              verifiedUsers : {
                                count : verified,
                                percent : ((verified / allUsers) * 100).toFixed(2),
                              },
                              allUsersCount : allUsers,
                              adminCount : usersCount.data.adminCount})
  }


  useEffect(()=> {
    if(isVerified && !verificationResult.user.isAdmin){
          navigate('/notFound');
      }
  }, [isVerified])

  useEffect(()=> {
    getUsersCount();
  }, [])


  return (
    (isVerified && verificationResult.user.isAdmin ) && <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 2xl:col-span-9">
        <div className="grid grid-cols-12 gap-6">
          {/* BEGIN: General Report */}
          <div className="col-span-12 mt-8">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                General Report
              </h2>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="User"
                        className="report-box__icon text-success"
                      />
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                     {insights.allUsersCount}
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Users
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <ShieldCheck />
                      <div className="ml-auto">
                        <Tippy
                          tag="div"
                          className="report-box__indicator bg-success cursor-pointer"
                          content="33% Higher than last month"
                        >
                          {insights.activeUser.percent}%
                        </Tippy>
                      </div>
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      {insights.activeUser.count}
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Active users
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="CreditCard"
                        className="report-box__icon text-pending"
                      />
                      <div className="ml-auto">
                        <Tippy
                          tag="div"
                          className="report-box__indicator bg-success cursor-pointer"
                          content="2% Lower than last month"
                        >
                          {insights.verifiedUsers.percent}%
                        </Tippy>
                      </div>
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      {insights.verifiedUsers.count}
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Verified users
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="Monitor"
                        className="report-box__icon text-warning"
                      />
                      <div className="ml-auto">
                      </div>
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      {insights.adminCount}
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Admins
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report */}
          {/* BEGIN: Sales Report */}
          {/* END: Sales Report */}
          {/* BEGIN: Weekly Top Seller */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-6 mt-8">
            <div className="intro-y box p-5 mt-5">
              <h1>Active Users</h1>
              <div className="mt-3">
                <ReportPieChart 
                          labels = {["Active Users", "Not Avtive Users"]}
                          height={213} 
                          data={[insights.activeUser.count, insights.allUsersCount - insights.activeUser.count]}/>
              </div>
              <div className="w-52 sm:w-auto mx-auto mt-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  <span className="truncate">active users</span>
                  <span className="font-medium ml-auto">{insights.activeUser.percent}%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-danger rounded-full mr-3"></div>
                  <span className="truncate">Not Active Users</span>
                  <span className="font-medium ml-auto">{100 - insights.activeUser.percent}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-6 mt-8">
            <div className="intro-y box p-5 mt-5">
              <h1>Verified Users</h1>
              <div className="mt-3">
                <ReportPieChart 
                        labels = {["Verified Users", "Not Verified Users"]}
                        height={213} 
                        data={[insights.verifiedUsers.count, insights.allUsersCount - insights.verifiedUsers.count]}/>
              </div>
              <div className="w-52 sm:w-auto mx-auto mt-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  <span className="truncate">verified users</span>
                  <span className="font-medium ml-auto">{insights.verifiedUsers.percent}%</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-danger rounded-full mr-3"></div>
                  <span className="truncate">Not Verified Users</span>
                  <span className="font-medium ml-auto">{100 - insights.verifiedUsers.percent}%</span>
                </div>
              </div>
            </div>
          </div>
          {/* END: Weekly Top Seller */}
          {/* BEGIN: Sales Report */}
        </div>
      </div>
    </div>
  );
}

export default Main;
