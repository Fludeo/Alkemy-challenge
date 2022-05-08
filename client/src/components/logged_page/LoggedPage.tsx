import React, { useEffect } from "react";
import NavBar from "./NavBar"
import {Routes , Route, useNavigate, useLocation} from 'react-router-dom'
import HomePage from "./home_page/HomePage";
import '../styles/logged_page/logged_page.css'
import CrudPage from "./crud_page/CrudPage";

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
             <Route path="/crud" element={<CrudPage token={token}></CrudPage>}></Route>
         </Routes>
         </div>
    </div>)
}




export default LoggedPage;