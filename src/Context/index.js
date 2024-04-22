import React  from "react";
const ReactContext=React.createContext({
    isDarkTheme:false,
    activeTab:'HOME',
    updateActiveTab:()=>{},
    setHomeTab: () => {
    },
    LogoutUser:()=>{},
    updateSavedVideos:()=>{
  
    },
    
    SavedVideosList:[],
    removeVideo:()=>{},
    LikedVideosList:[],
    DisLikedVideoList:[],
    addTolikedVideo:()=>{},
    addToDislikedVideo:()=>{},
    removeFromLikedVideo:()=>{},
    removeFromDisLikedVideo:()=>{}





})

export default ReactContext;