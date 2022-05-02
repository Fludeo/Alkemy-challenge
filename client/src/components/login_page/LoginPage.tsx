import '../styles/login_page.css'
import React, { useEffect, useState } from 'react'
import { RiDatabase2Fill } from 'react-icons/ri'
import { useNavigate } from "react-router-dom";
import {FaMoneyBillWave} from 'react-icons/fa'
import LoginForm from './LoginForm'
import {LoginFormType, SignFormType }from '../../types/types'
import Modal from '../common/modal';
import SignupForm from './SignupForm';


type props = {
    setAccesToken:(token:string)=>void
}   

const LoginPage = ({setAccesToken}:props) => {
  const [loginForm, setLoginForm]  = useState<LoginFormType>({}as LoginFormType)
  const [signupForm,setSignupForm]  = useState<SignFormType>({password:'' ,repeatPassword:''}as SignFormType)
  const [modalTrigger,setModalTrigger] = useState<boolean> (false)
  const navigate = useNavigate()





const closeSignupModal= () =>{
        setSignupForm({...signupForm, errorMessage:''})
        setModalTrigger(false)
  }

const handleLogin = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
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
          if(rawResponse.ok){
         
          setAccesToken(content)
          console.log(content)
          navigate('/home')
        }
        else{
            setLoginForm({...loginForm, errorMessage:content.message})
            throw new Error(content.message)
        }
        }
        catch(err){
            console.log(err)
            navigate('/')
        }
        }
const handleSignup = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
            e.preventDefault()
            try{
                const rawResponse = await fetch('/user/signup', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(signupForm)
                  });
        
                 
                  if(rawResponse.ok){
               
                  setModalTrigger(false)
                  navigate('/')
                }
                else{
                    const content = await rawResponse.json()
                    setSignupForm({...signupForm, errorMessage:content.message})
                    throw new Error(content.message)
                }
                }
                catch(err){
                    console.log(err)
                }
        }
          

  const isLogged = (token:string) =>{
    setAccesToken(token)
    navigate('/home', {replace: true})
  }
        useEffect(()=>{
          fetch('/auth/token',{method:'POST'}).then(res=>res.json())
          .then(res=>res.accessToken?
            isLogged(res.accessToken)
            :navigate('/'))
            .catch(err=>{console.log(err)})
        },[])
 
    return(
     <div className="login-page">
         <section className="login-page__section-header">
        <div className='title'> 
            <h1 className='title__title'>Alkemy</h1>
            <RiDatabase2Fill  className='title__icon'></RiDatabase2Fill>
        </div>

         <p className='login-page__section-text'>Keep track of your <span className='login-page__span'>finances</span></p>
         <button onClick={()=>setModalTrigger(true)} className='login-page__signup-button login-page__signup-button--hover'>Sign Up</button>
        </section>

         <section className="login-page__section-login">
            <LoginForm  handleLogin={(e)=>handleLogin(e)} UpdateForm={(payload:LoginFormType ) => setLoginForm({...payload ,errorMessage:''}) } 
            formFields={loginForm}></LoginForm>
         </section>
       
        <FaMoneyBillWave  className='login-page__bottom-bill'></FaMoneyBillWave>
        <FaMoneyBillWave  className='login-page__top-bill'></FaMoneyBillWave>
        <FaMoneyBillWave  className='login-page__middle-bill'></FaMoneyBillWave>
        <Modal  trigger={modalTrigger}>
             <SignupForm 
             closeSignup={()=>closeSignupModal()}
             UpdateForm={(payload:SignFormType)=>setSignupForm({...payload ,errorMessage:''})} 
             formFields={signupForm} handleSignup={(e)=>handleSignup(e)}></SignupForm>
         </Modal>
    </div>)

}





export default LoginPage