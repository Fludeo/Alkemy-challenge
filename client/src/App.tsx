

import React, {  useEffect, useState } from 'react';
import { Route, Routes, } from 'react-router-dom';
import './App.css';
import LoggedPage from './components/home_page/LoggedPage';
import LoginPage from './components/login_page/LoginPage';



function App() {


  const [token,setToken] = useState<string>('')

 
  const refreshSession = async()=>{
   if(token===''){return console.log('no hay session')}
   try{
    const response =  await fetch('/auth/session',{method:'POST'})
    const token = await response.json()
   
    setToken( await token.accessToken)
   }catch(err){


    console.log(err)

   }


 }



  useEffect(()=>{
    //token refresh after 14min. the access token has a 15 min duration.
   const refresh = setTimeout(refreshSession,1000*60*14)

    return () =>{
      clearTimeout(refresh)
    }
  },[token])


  return (
    <div className="App">
  
      <Routes>
      <Route path='/' element={
       <LoginPage  setAccessToken={(payload:string)=>setToken(payload) }></LoginPage>}>
       </Route>
      <Route path='/logged/*' element={
       <LoggedPage token={token} setAccessToken={(payload:string)=>setToken(payload) }></LoggedPage>}>
      </Route>
      </Routes>

    </div>
  );
}

export default App;
