import { GoDotFill } from "react-icons/go";
import {Link} from "react-router-dom"
import ReactContext from "../../Context/index";
import "./index.css"

const VideoCard=(props)=>{
    const{videoObj}=props
    const{channel,id,thumbnailUrl,publishedAt,viewCount,title}=videoObj
    const{name,profile_image_url}=channel
   
  

    return(
        <Link to={`/videos/${id}`} className="link">
        <ReactContext.Consumer>{
            value=>{
  
       const{isDarkTheme}=value
       
       
       return ( <div className="card-container">
           <img className="img" src={thumbnailUrl} />
           <div className="video-details-container">
               <img className="chanel-logo" src={profile_image_url} />
               <div>
                   <h1 className={isDarkTheme ? "head-dark" : "head-light"}>{title}</h1>
                   <p className={isDarkTheme ? "para-dark" : "para-light"}>{name}</p>

                   <div className="videos-count">
                       <p className={isDarkTheme ? "para-dark" : "para-light"}>{viewCount} Views</p>
                       <GoDotFill className="dot-icon" />
                       <p className={isDarkTheme ? "para-dark" : "para-light"}>{publishedAt}</p>
                   </div>
               </div>
           </div>
       </div> )
    
  
            }}

        </ReactContext.Consumer></Link>
       
    )

}

export default VideoCard