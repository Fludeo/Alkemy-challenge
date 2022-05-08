

import React, {  useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import LoggedPage from './components/logged_page/LoggedPage';
import LoginPage from './components/login_page/LoginPage';



function App() {


  const [token,setToken] = useState<string>('')

  const location = useLocation()
  const navigate = useNavigate()


  


  const refreshSession = async()=>{
   try{
    const response =  await fetch('/auth/session',{method:'POST'})
    const token = await response.json()
   
    setToken( await token.accessToken)
   }catch(err){


    console.log(err)

   }

  

 }

 
   const isLogged = (token:string) =>{
       setToken(token)
       navigate(location.pathname, {replace: true})
          }


  useEffect(()=>{
    //token refresh after 14min. the access token has a 15 min duration.
   const refresh = setTimeout(refreshSession,1000*60*14)
   if(token===''){
   fetch('/auth/session',{method:'POST'}).then(res=>res.json())
        .then(res=>res.accessToken!==undefined?
          isLogged(res.accessToken)
          :navigate('/'))
          .catch(err=>{console.log(err)})}
    return () =>{
      clearTimeout(refresh)
    }
  },[token])


  return (
    <div className="App">
  
      <Routes>
      <Route path='/' element={
       <LoginPage token={token} setAccessToken={(payload:string)=>setToken(payload) }></LoginPage>}>
       </Route>
      <Route path='/logged/*' element={
       <LoggedPage token={token} setAccessToken={(payload:string)=>setToken(payload) }></LoggedPage>}>
      </Route>
      </Routes>

    </div>
  );
}

export default App;
