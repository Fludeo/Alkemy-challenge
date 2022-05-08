import '../styles/login_page/signup_form.css'
import React, { useEffect, useState } from 'react';
import { SignFormType } from '../../types/types';



type props = {
    UpdateForm: (payload:SignFormType)=>void
    formFields: SignFormType
    closeSignup:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
    handleSignup:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
}



const SignupForm =({closeSignup,handleSignup,UpdateForm,formFields}:props) =>{
const [match,setMatch] = useState<{match:boolean,blank:boolean}>({match:false,blank:true})
   




   const close = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{

    e.preventDefault()
    setMatch({match:false, blank:true})
    closeSignup(e)
   }



   useEffect(()=>{

    setMatch({match:false,blank:true}) 
    if(formFields.password==""||formFields.repeatPassword==""){
        setMatch({match:false,blank:true})
        return
    }
    if(formFields.repeatPassword===formFields.password){
        setMatch({match:true,blank:false})
    }
    else{
        setMatch({match:false,blank:false})
    }
    
   },[formFields.password,formFields.repeatPassword])



    return(
    <form className="signup-form">
        <label className='signup-form__label' >Name</label>
        <input onChange={(e)=>UpdateForm({...formFields, name: e.currentTarget.value.trim()})} 
        className='signup-form__input' type="text"  />

        <label className='signup-form__label' >Email</label>
        <input onChange={(e)=>UpdateForm({...formFields, email: e.currentTarget.value.trim()})} 
        className='signup-form__input' type="text"  />

        <label className='signup-form__label' >Password </label>
        <input onChange={(e)=>UpdateForm({...formFields, password: e.currentTarget.value.trim()})}
          className={match.blank?
            'signup-form__input'
            :
            match.match?
            'signup-form__input signup-form__input--match'
            :
            'signup-form__input signup-form__input--no-match'} 
         type="password" />

        <label className='signup-form__label ' >Repeat password </label>
        <input onChange={(e)=>UpdateForm({...formFields, repeatPassword: e.currentTarget.value.trim()})}
         className={match.blank?'signup-form__input'
         :
         match.match?
         'signup-form__input signup-form__input--match'
         :
         'signup-form__input signup-form__input--no-match'} 
         type="password" />
         <p className='signup-form__error'>{formFields.errorMessage}</p>
         <div className='signup-form__button-container'>
         <button onClick={handleSignup} className='signup-form__signup-button signup-form__signup-button--hover'>Sign Up</button>
         <button onClick={(e)=> close(e)} className='signup-form__cancel-button signup-form__cancel-button--hover'>Cancel</button>
        </div>
    </form>
    )
}

export default SignupForm;