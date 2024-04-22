import { GoDotFill } from "react-icons/go";
import {Link} from "react-router-dom"
import ReactContext from "../../Context/index";
import "./index.css"

const GAMINGCARD=(props)=>{
    const{videoObj}=props
    const{id,thumbnailUrl,viewCount,title}=videoObj

   
  

    return(
        <Link to={`/videos/${id}`} className="link">
        <ReactContext.Consumer>{
            value=>{
  
       const{isDarkTheme}=value
       
       
       return ( <div className="gcard-container">
           <img className="gimg" src={thumbnailUrl} />
           <div className="gvideo-details-container">
              
            
                   <h1 className={isDarkTheme ? "ghead-dark" : "ghead-light"}>{title}</h1>
             

                
                       <p className={isDarkTheme ? "gpara-dark" : "gpara-light"}>{viewCount} Watching Worldwide </p>
                    
                       
                   
               
           </div>
       </div> )
    
  
            }}

        </ReactContext.Consumer></Link>
       
    )

}

export default GAMINGCARD