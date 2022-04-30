
import React, { useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import LoginPage from './components/login_page/LoginPage';
import MainPage from './components/MainPage';



const initialState = {
  accessToken:'',
}

type actionType = {type:'SET_ACCESS_TOKEN',payload:string}



const AppReducer =(state:typeof initialState,action: actionType)=>{
let newState: typeof initialState
  switch(action.type){
    case 'SET_ACCESS_TOKEN':
      newState = {...state, accessToken:action.payload}
      return newState
      default:
        return {...state}
  }
  
}


function App() {

  const [state,dispatch] = useReducer(AppReducer, initialState)



console.log(state)

  return (
    <div className="App">
      <Routes>
      {state.accessToken===''&&<Route path='/' element={<LoginPage  setAccesToken={(payload:string)=>dispatch({type:'SET_ACCESS_TOKEN',payload:payload}) }></LoginPage>}/>}
      {state.accessToken!==''&&<Route path='/home' element={<div><h1>AUTENTICADO</h1></div>}></Route>}
      </Routes>
    </div>
  );
}

export default App;
