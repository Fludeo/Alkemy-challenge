import React from "react";
import NavBar from "./NavBar"
import {Routes , Route} from 'react-router-dom'
import HomePage from "./HomePage";
import '../styles/home_page/logged_page.css'

type props = {
    token:string
    setAccessToken:(payload:string)=>void
}



const LoggedPage = ({token,setAccessToken}:props)=>{


    return(<div className="logged-page">
         <NavBar token={token} setAccessToken={setAccessToken}></NavBar>
         <div className="logged-page__main">
         <Routes>
             <Route path="/home" element={<HomePage token={token} ></HomePage>}></Route>
             <Route path="/crud" element={<HomePage token={token} ></HomePage>}></Route>
         </Routes>
         </div>
    </div>)
}


export default LoggedPage;