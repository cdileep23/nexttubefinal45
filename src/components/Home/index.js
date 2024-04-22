import Cookies from "js-cookie"
import { Component } from "react";
import { Redirect } from "react-router-dom";
import {ThreeDots} from 'react-loader-spinner';
import { RxCross2 } from "react-icons/rx";
import ReactContext from "../../Context/index";
import { IoMdSearch } from "react-icons/io";
import Header from "../Header/index"
import VideoCard from "../VideoCard/index"
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
class Home extends Component{

   state = {
      videosList: [],
      showSubscription: true,
      fetchStatus: FetchStatuses[0],
      searchValinput:''
  }

  componentDidMount=()=>{
      this.renderesult();
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
                           <div  className="render-failure-container">
                              <img className="nofoundImage" src={isDarkTheme?"https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png":"https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"}/>
                              <div className="retry-btn-container">
                          <button className="retrybtn" onClick={this.renderAgainInFailureView}>Retry</button>

                          </div>
                          </div>
                         
                          </>
                          )
                                      }}
          </ReactContext.Consumer>
      )
      
  }

  renderVideosContent=()=>{
      const{videosList,searchValinput}=this.state;
      const searchedVideos=videosList.filter((e)=>(e.title.toLowerCase().includes(searchValinput.toLowerCase())))
    

      return(
          <ReactContext.Consumer>
              {value=>{

                  const{isDarkTheme}=value
                      return(

                          <div>
                            {searchedVideos.length===0?( <div  className="no-found-conatiner">
                              <img className="nofoundImage" src={isDarkTheme?"https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png":"https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"}/>
                          </div>):(<ul className="uList">
                              {searchedVideos.map((e) => (
                              <VideoCard videoObj={e} key={e.id} />
                              ))}
                          </ul>
)}  
                              
                         
                          </div>
                          
                          )
                                      }}
          </ReactContext.Consumer>
      )
      
  }
 
  renderesult=async()=>{
      const url="https://apis.ccbp.in/videos/all?search=";
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
  console.log(data.videos);

  const videoslist=data.videos;
  const formattedData = videoslist.map((e) => ({
      channel: e.channel,
      id: e.id,
      publishedAt: e.published_at,
      thumbnailUrl: e.thumbnail_url,
      title:e.title,
      viewCount:e.view_count
  }));

  this.setState({
      fetchStatus:FetchStatuses[1],videosList:formattedData
  },this.renderVideos)
  
      
      
  }}

  searchVideos=(event)=>{
      this.setState({searchValinput:event.target.value},this.renderVideos);
  }



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
                
                      <div className={isDarkTheme?"videos-container-dark":"videos-container-light"}>
                      {showSubscription && (
                                <div className={isDarkTheme ? "subscription-cont-dark" : "subscription-cont-light"}>
                                    <div >
                                        <img className="subscription-icon" src={isDarkTheme ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"} alt="NXT Watch Logo"/>
                                        <h1 className={isDarkTheme ? "head-dark" : "head-light"}>Buy NXT watch premium prepaid plans with UPI</h1>
                                        <button className="btn-dark">BUY NOW</button>
                                    </div>
                                    <div className="delete-icon-cont">
                                        <button onClick={this.removeSubscription} className="delete-icon-button">
                                            <RxCross2 className={isDarkTheme ? "delete-icon-dark" : "delete-icon"} />
                                        </button>
                                    </div>
                                </div>
                            )}
                           <div className={isDarkTheme ? "videos-container-dark" : "videos-container-light"} >
                                <div className="search-bar-container">
                                    <input onChange={this.searchVideos} className="search-icon-input" type="text" />
                                    <IoMdSearch className="search-icon" />
                                </div>
                               
                                {this.renderVideos()} 
                               

                            </div>


                     </div>

                   
                     
            </div>
        
        </div>
      )
   }}
</ReactContext.Consumer>
   )
}



}



 


export default Home