import {
  Lucide,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@/base-components";
import ReportDonutChart from "@/components/report-donut-chart/Main";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useTokenVerification from "../../hooks/useTokenVerification";
import axios from "axios";

function Main() {

  const {isVerified, verificationResult} = useTokenVerification();
  const [isLoading, setIsLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);

  const location = useLocation();
  const { scMedia } = location.state || {};

//fake data {token, pageId}
//----
const accessToken = 'EAF05Oi4hdikBOZBW58wej6pucAK3gvUZCC9cUCMszqk293nKQGxK90xUkkRETfhyMG7D3dCWeRowwr928bBc2smvAQQ1as42ZCpbHJSfYxga33xtt1Xw3UKCyVBYHTFwDJUchvcQ56sMklNbeeTXrikeo9hNgJi292DJjhnQoN5VIhBw0zYl9Qb';
const pageId = '133436743388217';
//--

//fake data {followersData, pageInsights}
//--
const [followersData, setFollowersData]= useState([20, 10, 28, 22]);
const [pageInsights, setPageInsitghts] = useState({
  followers : 500,
  all :  {
    posts : 80,
    likes : 200,
    comments : 70,
    shares : 56
  },
  lastWeek : {
    posts : 5,
    likes : 12,
    comments : 6,
    shares : 4
  }
})
//----



//fuction to get all the pages
//-----
const getPages = async () => {
    try {
        const url = `https://graph.facebook.com/v20.0/me/accounts`;
        const response = await axios.get(url, {
            params: {
                access_token: accessToken
            }
        });

        const pages = response.data.data;
        if (pages.length > 0) {
            const page = pages.find(page => page.id === pgId); 
            if (page) {
                //for test
                console.log(`Page Name: ${page.name}, Page ID: ${page.id}, Page Access Token: ${page.access_token}`);
                return page.access_token; 
            } else {
                console.log('Page not found.');
                return null;
            }
        } else {
            console.log('No pages found.');
            return null;
        }

    } catch (error) {
        console.error('Error fetching page stats:', error.response ? error.response.data : error.message);
    }
};
//-----


//get insights of page (not working)
//------
const getPageInsights = async () => {
  const tokenPage = await getPages();
  try {
      const url = `https://graph.facebook.com/v20.0/${pageId}/insights`;
      const response = await axios.get(url, {
          params: {
              access_token: accessToken,
              period: 'day'
          }
      });
      console.log("insights  : ")
      console.log(response.data);
  } catch (error) {
      console.error('Error fetching page insights:', error.response ? error.response.data : error.message);
  }
};
//------



  useEffect(()=> {
    //just for testing 
    //--
    getPages();
    getPageInsights();
    //--


    //user verification
    //--
    if(!isVerified){
        setIsLoading(true);
    }else{
      setIsLoading(false)
    }
    //--
  }, [isVerified])



  return (
    isLoading? <div>loading...</div> : 
    !showStats? 
    <div className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
     <input type="text" placeholder= {scMedia + " Page Id"} className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0" name="topic" />
     <button onClick={()=>{setShowStats(true)}} className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3" >
         Search
     </button>
     </div> :
    <>
    <div className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
     <input type="text" placeholder= {scMedia + " Page Id"} className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0" name="topic" />
     <button onClick={()=>{setShowStats(true)}} className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3" >
         Search
     </button>
     </div> 
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 2xl:col-span-9">
          <div className="grid grid-cols-12 gap-6">
            {/* BEGIN: General Report */}
            <div className="col-span-12 xl:col-span-9 mt-8">
              <div className="intro-y flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Page Insights
                </h2>
              </div>
              <div className="report-box-2 intro-y mt-5">
                <div className="box grid grid-cols-12">
                  <div className="col-span-12 lg:col-span-4 px-8 py-12 flex flex-col justify-center">
                    <Lucide
                      icon="PieChart"
                      className="w-10 h-10 text-pending"
                    />
                    <div className="justify-start flex items-center text-slate-600 dark:text-slate-300 mt-12">
                      Followers
                    </div>
                    <div className="flex items-center justify-start mt-4">
                      <div className="relative text-2xl font-medium pl-3 ml-0.5">
                        {pageInsights.followers}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-8 p-8 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-darkmode-300 border-dashed">
                    <TabGroup>
                      <TabList
                        className="nav-pills w-60 border border-slate-300 dark:border-darkmode-300 border-dashed rounded-md mx-auto p-1 mb-8"
                        role="tablist"
                      >
                        <Tab className="w-full py-1.5 px-2" tag="button">
                            All Insights
                        </Tab>
                      </TabList>
                      <TabPanels className="px-5 pb-5">
                        <TabPanel className="grid grid-cols-12 gap-y-8 gap-x-10">
                          <div className="col-span-6 sm:col-span-6 md:col-span-4">
                            <div className="text-slate-500">posts</div>
                            <div className="mt-1.5 flex items-center">
                              <div className="text-base">
                                {pageInsights.all.posts}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <div className="text-slate-500">Shares</div>
                            <div className="mt-1.5 flex items-center">
                              <div className="text-base">
                                {pageInsights.all.shares}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <div className="text-slate-500">
                              Likes
                            </div>
                            <div className="mt-1.5 flex items-center">
                              <div className="text-base">
                                {pageInsights.all.likes}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <div className="text-slate-500">comments</div>
                            <div className="mt-1.5 flex items-center">
                              <div className="text-base">
                                {pageInsights.all.comments}
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                      </TabPanels>
                    </TabGroup>
                  </div>
                  <div className="col-span-12 lg:col-span-12 p-8 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-darkmode-300 border-dashed">
                    <TabGroup>
                      <TabList
                        className="nav-pills w-60 border border-slate-300 dark:border-darkmode-300 border-dashed rounded-md mx-auto p-1 mb-8"
                        role="tablist"
                      >
                        <Tab className="w-full py-1.5 px-2" tag="button">
                            Last Week Insights
                        </Tab>
                      </TabList>
                      <TabPanels className="px-5 pb-5">
                        <TabPanel className="grid grid-cols-12 gap-y-8 gap-x-10">
                          <div className="col-span-6 sm:col-span-6 md:col-span-4">
                            <div className="text-slate-500">posts</div>
                            <div className="mt-1.5 flex items-center">
                              <div className="text-base">{pageInsights.lastWeek.posts}</div>
                            </div>
                          </div>
                          <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <div className="text-slate-500">Shares</div>
                            <div className="mt-1.5 flex items-center">
                              <div className="text-base">
                                {pageInsights.lastWeek.shares}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <div className="text-slate-500">
                              Likes
                            </div>
                            <div className="mt-1.5 flex items-center">
                              <div className="text-base">
                                {pageInsights.lastWeek.likes}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <div className="text-slate-500">comments</div>
                            <div className="mt-1.5 flex items-center">
                              <div className="text-base">
                                {pageInsights.lastWeek.comments}
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                      </TabPanels>
                    </TabGroup>
                  </div>
                </div>
              </div>
            </div>
            {/* END: General Report */}
            {/* BEGIN: Sales Report */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 row-start-4 lg:row-start-3 xl:row-start-auto mt-6 xl:mt-8">
              <div className="intro-y flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Followers Report
                </h2>
              </div>
              <div className="report-box-2 before:hidden xl:before:block intro-y mt-5">
                <div className="box p-5">
                  <div className="mt-3">
                    <ReportDonutChart height={196} data = {followersData} labels = {["31 - 50 Years old", ">= 50 Years old", "18 - 30 Years old", "< 18 years old"]}/>
                  </div>
                  <div className="w-52 sm:w-auto mx-auto mt-8">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-danger rounded-full mr-3"></div>
                      <span className="truncate">&lt; 18 Years old</span>
                      <span className="font-medium ml-auto">10%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                      <span className="truncate">18 - 30 Years old</span>
                      <span className="font-medium ml-auto">52%</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                      <span className="truncate">31 - 50 Years old</span>
                      <span className="font-medium ml-auto">33%</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="truncate">&gt;= 50 Years old</span>
                      <span className="font-medium ml-auto">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END: Sales Report */}
            {/* BEGIN: Official Store */}
            {/* END: Weekly Best Sellers */}
            {/* BEGIN: Visitors */}
            {/* END: Visitors */}
            {/* BEGIN: Most Viewed Pages */}
            {/* END: Most Viewed Pages */}
            {/* BEGIN: Top Search Items */}
            {/* END: Top Search Items */}
            {/* BEGIN: Weekly Top Products */}
            {/* END: Weekly Top Products */}
          </div>
        </div>
        <div className="col-span-12 2xl:col-span-3">
          <div className="2xl:border-l -mb-10 pb-10">
            <div className="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
              {/* BEGIN: Important Notes */}
              {/* END: Important Notes */}
              {/* BEGIN: Recent Activities */}
              {/* END: Recent Activities */}
              {/* BEGIN: Transactions */}
              {/* END: Transactions */}
              {/* BEGIN: Schedules */}
              {/* END: Schedules */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
