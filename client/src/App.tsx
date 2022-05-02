
import React, {  useReducer } from 'react';
import { Route, Routes, } from 'react-router-dom';

import './App.css';
import HomePage from './components/home_page/HomePage';
import LoginPage from './components/login_page/LoginPage';




const initialState = {
  accessToken:'',
}

type actionType = {type:'SET_ACCESS_TOKEN',payload:string}



const AppReducer =(state:typeof initialState,action: actionType)=>{
let newState: typeof initialState
  switch(action.type){
    case 'SET_ACCESS_TOKEN':
      newState = {...state, accessToken:action.payload}
      console.log(newState)
      return newState
      default:
        return {...state}
  }
  
}


function App() {

  const [state,dispatch] = useReducer(AppReducer, initialState)
 

 






  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<LoginPage  setAccessToken={(payload:string)=>dispatch({type:'SET_ACCESS_TOKEN',payload:payload}) }></LoginPage>}/>
      <Route path='/home' element={<HomePage token={state.accessToken} setAccessToken={(payload:string)=>dispatch({type:'SET_ACCESS_TOKEN',payload:payload}) }></HomePage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
