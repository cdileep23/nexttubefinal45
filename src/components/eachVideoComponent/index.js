import Cookies from "js-cookie"
import { Component } from "react";
import React from "react";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { MdPlaylistAdd } from "react-icons/md";

import ReactPlayer from "react-player"
import { FaArrowTrendUp } from "react-icons/fa6";
import { Redirect } from "react-router-dom";
import {ThreeDots} from 'react-loader-spinner';
import { GoDotFill } from "react-icons/go";

import { RxCross2 } from "react-icons/rx";
import ReactContext from "../../Context/index";
import { IoMdSearch } from "react-icons/io";
import Header from "../Header/index"
import VideoCard from "../VideoCard/index"
import TrendingVideoCard from "../TrendingVideoCard";
import "./index.css"

import SideBar from "../Sidebar/index";

const ActiveTabs=[
   "HOME","TRENDING",'GAMING',"SAVEDVIDEOS"
]

const differentTabs=[{
   eid:"HOME",
   displayText:'Home',
   
},
{
   eid:"TRENDING",
   displayText:'Trending',
   
},
{
   eid:"GAMING",
   displayText:'Gaming',
   
},
{
   eid:"SAVEDVIDEOS",
   displayText:'Saved Videos',
   
}]
const FetchStatuses = ["EXECUTING", "SUCCESSFUL", "FAILURE"];
class eachVideoComponent extends Component{

   state = {
      videosDetails: {},
      showSubscription: true,
      fetchStatus: FetchStatuses[0],
   Liked:false,
   DisLiked:false,
   isSaved:false
  }

  componentDidMount=()=>{
   const{match}=this.props;
   const{params}=match;
   const{id}=params
      this.renderesult(id);
  }

  removeSubscription = () => {
      this.setState({ showSubscription: false })
  }

  renderLoader = () => (
      <div className="products-loader-container">
          <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
  )

  renderVideos = () => {
      console.log("hello")
      const { fetchStatus } = this.state;
     
      switch (fetchStatus) {
          case FetchStatuses[0]:
              return this.renderLoader();
          case FetchStatuses[1]:
              return this.renderVideosContent();
          case FetchStatuses[2]:
              return  this.renderFailureView();
          default:
              return null;
      }
  }

 
  
  renderAgainInFailureView=()=>{
    this.setState({fetchStatus:FetchStatuses[0]},this.renderesult)
   

  }

  
  renderFailureView=()=>{
     
     
    

      return(
          <ReactContext.Consumer>
              {value=>{

                  const{isDarkTheme}=value
                      return(
<>
                           <div  className="no-found-conatiner">
                              <img className="nofoundImage" src={isDarkTheme?"https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png":"https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"}/>

                          </div>
                          <div className="retry-btn-container">
                          <button className="retrybtn" onClick={this.renderAgainInFailureView}>Retry</button>

                          </div>
                          </>
                          )
                                      }}
          </ReactContext.Consumer>
      )
      
  }


  renderVideosContent=()=>{
      const{videosDetails}=this.state;
      console.log(videosDetails)
    const{channel,videoUrl,title, description,viewCount,publishedAt}=videosDetails;
    console.log(channel)


      return(
          <ReactContext.Consumer>
              {value=>{

                  const{isDarkTheme,updateSavedVideos,SavedVideosList,removeVideo,DisLikedVideoList,LikedVideosList,removeFromDisLikedVideo,removeFromLikedVideo,addToDislikedVideo,addTolikedVideo}=value
                  const isSaved=SavedVideosList.some((e)=>(
                    e.id===videosDetails.id
                  ))
                  const isLiked=LikedVideosList.some((e)=>(
                      e.id===videosDetails.id
                    ))
                    const isDisLiked=DisLikedVideoList.some((e)=>(
                      e.id===videosDetails.id
                    ))
                  const addtoSavedVideos=()=>{
                    if(isSaved){
                      removeVideo(videosDetails)
                    }else{
                    updateSavedVideos(videosDetails);}
                  }

                  const onClickaddtoLikedVideos=()=>{
                    if(isDisLiked){
                      removeFromDisLikedVideo(videosDetails)
                    }
                    addTolikedVideo(videosDetails)
                   
                    
                  }

                  const onClickaddToDislike=()=>{
                 if(isLiked){
                 
                  removeFromLikedVideo(videosDetails)
                  
                 }
                  addToDislikedVideo(videosDetails)

      
                    
                     
                    
                   
                  }


          
                 

                      return(

                      <div className="video-player-main-cont">
                       
                        <ReactPlayer width="100%"  height="500px"  url={videoUrl}/>
                        <h1 className={isDarkTheme?"head-dark":"head-light"}>{title}</h1>
                     
                     <div className="video-details-container">
                        <div className="video-likes-dislikes">
                          <p className={isDarkTheme?"p-dark":"p-light"}>{viewCount}</p>
                          <GoDotFill className={isDarkTheme?"dot-dark":"dot-light"}/>
                          <p className={isDarkTheme?"p-dark":"p-light"}>{publishedAt}</p>
                        </div>

                        <div className="whole-container">
                        <div className="like-container">
                           <button onClick={onClickaddtoLikedVideos}  className="save-button">
                           <BiLike className={isDarkTheme ? (isLiked ? "head-dark-saved icons" : "head-dark icons") : (isLiked ? "head-light-saved icons" : "head-light icons")} />

                           </button>
                           <p className={isDarkTheme?"p-dark":"p-light"}>{isLiked?<p className="text-active-one">Liked</p>:<p>Like</p>}</p>
                          </div>
                          <div className="like-container">
                           <button onClick={onClickaddToDislike}  className="save-button">
                           <BiDislike className={isDarkTheme ? (isDisLiked ? "head-dark-saved icons" : "head-dark icons") : (isDisLiked ? "head-light-saved icons" : "head-light icons")} />

                           </button>
                           <p className={isDarkTheme?"p-dark":"p-light"}>{isDisLiked?<p className="text-active-one">DisLiked</p>:<p>DisLike</p>}</p>
                          </div>
                          <div className="like-container">
                           <button onClick={addtoSavedVideos}  className="save-button">
                           <MdPlaylistAdd className={isDarkTheme ? (isSaved ? "head-dark-saved icons" : "head-dark icons") : (isSaved ? "head-light-saved icons" : "head-light icons")} />

                           </button>
                           <p className={isDarkTheme?"p-dark":"p-light"}>{isSaved?<p className="text-active-one">Saved</p>:<p>Save</p>}</p>
                          </div>
                        </div>
                     </div>
                     <hr/>
                     <div className="channel-details">

                     <img className="channel-logo" src={channel.profile_image_url}/>
                     <div >
                        <h1 className={isDarkTheme?"head-dark":"head-light" }>{channel.name}</h1>
                        <p className={isDarkTheme?"p-dark":"p-light"}>{channel.subscriber_count}</p>
                        <p className={isDarkTheme?"head-dark":"head-light"}>{description}</p>
                     </div>
                     </div>
                      </div>
                          
                          )
                                      }}
          </ReactContext.Consumer>
      )
      
  }
 
  renderesult=async(id)=>{
      const url=`https://apis.ccbp.in/videos/${id}`;
    const jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU";
      const opt={
      method:"GET",
      headers: {
          
          'Authorization': `Bearer ${jwt}` 
      
        }
    }
      const response=await fetch(url,opt);
      const data= await response.json()
      if(response.status===401){
          this.setState({fetchStatus:FetchStatuses[2]},this.renderVideos)
      }else{
         console.log("complete video")
const fvideoDetails=data.video_details;

const finalVideoDetails={
   id: fvideoDetails.id,
   channel:fvideoDetails.channel,
   description:fvideoDetails.description,
   publishedAt:fvideoDetails.published_at,
   thumbnailUrl:fvideoDetails.thumbnail_url,
   title:fvideoDetails.title,
   videoUrl:fvideoDetails.video_url,
   viewCount:fvideoDetails.view_count


}
  


this.setState({videosDetails:finalVideoDetails,fetchStatus:FetchStatuses[1]})

  
      
      
  }}



render(){
const{activeTab}=this.state

   const jwtToken=Cookies.get("jwt_token");
   if(jwtToken===undefined){
      return <Redirect to="/login"/>
   }
   
return(  <ReactContext.Consumer>
   {value=>{
      const{isDarkTheme}=value;
      const{showSubscription}=this.state

      return(
         <div className={isDarkTheme?"home-main-container-dark":"home-main-container"}>

        
            <Header/>
            <div className="main-content-container">
                     <SideBar/>
                
                      < div className={isDarkTheme?"videos-container-dark":"videos-container-light"}>

                          
                               
                                {this.renderVideos()} 
                               

                        


                     </div>

                   
                     
            </div>
        
        </div>
      )
   }}
</ReactContext.Consumer>
   )
}



}



 


export default eachVideoComponent