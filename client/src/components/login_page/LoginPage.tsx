import '../styles/login_page.css'
import React, { useState } from 'react'
import { RiDatabase2Fill } from 'react-icons/ri'

import {FaMoneyBillWave} from 'react-icons/fa'
import LoginForm from './LoginForm'
import LoginFormType from '../../types/types'


type props = {
    setAccesToken:(token:any)=>void
}

const LoginPage = ({setAccesToken}:props) => {
  const [loginForm, setLoginForm]  = useState<LoginFormType>({}as LoginFormType)



  const handleLogin = async (e:Event) =>{
    e.preventDefault()
    try{
        const rawResponse = await fetch('/auth/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginForm)
          });
          const content = await rawResponse.json();
        
          setAccesToken(content)
          console.log(content);
        
        }
        catch(err){console.log(err)}
        }
  
  console.log(loginForm)
    return(
     <div className="login-page">
         <section className="login-page__section-header">
        <div className='title'> 
            <h1 className='title__title'>Alkemy</h1>
            <RiDatabase2Fill  className='title__icon'></RiDatabase2Fill>
        </div>
         <p className='login-page__section-text'>Keep track of your <span className='login-page__span'>finances</span></p>
        
         <button className='login-page__signup-button login-page__signup-button--hover'>Sign Up</button>
       
        
         </section>
         <section className="login-page__section-login">
            <LoginForm UpdateForm={(payload:LoginFormType ) => setLoginForm(payload) } 
            formFields={loginForm}></LoginForm>
         </section>
        <FaMoneyBillWave  className='login-page__bottom-bill'></FaMoneyBillWave>
        <FaMoneyBillWave  className='login-page__top-bill'></FaMoneyBillWave>
        <FaMoneyBillWave  className='login-page__middle-bill'></FaMoneyBillWave>
    </div>)

}





export default LoginPage