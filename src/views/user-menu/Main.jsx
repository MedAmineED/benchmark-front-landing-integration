import { socialMedia } from "../../utils/socialMedia";
import { useNavigate } from "react-router-dom";
import useTokenVerification from "../../hooks/useTokenVerification";


function Main() {

    const {isVerified, verificationResult} = useTokenVerification();
    const navigate = useNavigate();

    const navigateOnClick = (dataValue)=> {
        navigate('/home/social-media-insights', {state : {scMedia : dataValue}})
    }

    return (
      <>
        <div className="intro-y grid grid-cols-12 gap-6 mt-5">
          {/* BEGIN: Blog Layout */}
          {socialMedia.map((sc, scKey) => (
            <div
              key={scKey} 
              className="intro-y col-span-12 md:col-span-6 xl:col-span-4 box cursor-pointer"
              onClick={()=> {navigateOnClick(sc.title)}}
            >
              <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 px-5 py-4">
              </div>
              <div className="p-5">
                <div className="h-40 2xl:h-56 flex justify-center">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    className="rounded-md w-40 h-40"
                    src={sc.path}
                  />
                </div>
                <h1 className="block font-medium text-base flex justify-center">
                  {sc.title}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
  
  export default Main;
  