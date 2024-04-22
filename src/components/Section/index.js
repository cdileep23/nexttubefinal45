import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoTrendingUpOutline } from "react-icons/io5";
import { SiYoutubegaming } from "react-icons/si";
import { CiSaveDown2 } from "react-icons/ci";

import ReactContext from "../../Context/index";

import "./index.css"

const Section=(props)=>{
    const{sectionObj}=props
    const{eid,displayText}=sectionObj

  


    return(
        <ReactContext.Consumer>
            {value=>{
                const{isdarkTheme,activeTab,updateActiveTab}=value;
                const returnTabId=()=>{
                    updateActiveTab(eid);

                }
                const isActive=eid===activeTab;
               return(<Link className="section-link" to={eid === "HOME" ? "/" : eid === "SAVEDVIDEOS" ? "/saved-videos" : `/${eid.toLowerCase()}`}><li onClick={returnTabId} className="different-categories-container" >
                {eid==="HOME"&& <  FaHome className={isActive?"active-icon":"icon"}/>}
                {eid==="TRENDING"&& <IoTrendingUpOutline className={isActive?"active-icon":"icon"}/>}
                {eid==="GAMING" && <SiYoutubegaming className={isActive?"active-icon":"icon"}/>}
                {eid==="SAVEDVIDEOS" && <CiSaveDown2 className={isActive?"active-icon":"icon"}/>}

                <h1 className="head">{displayText}</h1>
        </li></Link> )
            }
            }
        </ReactContext.Consumer>
        
    )
}

export default Section