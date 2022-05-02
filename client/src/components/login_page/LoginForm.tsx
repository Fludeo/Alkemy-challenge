import '../styles/login_page/login_form.css'
import React from 'react';
import {LoginFormType }from'../../types/types'


type props = {
    UpdateForm: (payload:LoginFormType)=>void
    formFields: LoginFormType
    handleLogin:(e:any)=>void
}



const LoginForm =({handleLogin,UpdateForm,formFields}:props) =>{




    return(
    <form className="login-form">
        <label className='login-form__label' >Email</label>
        <input onChange={(e)=>UpdateForm({...formFields, email: e.currentTarget.value})} 
        className='login-form__input' type="text"  />
        <label className='login-form__label' >Password </label>
        <input onChange={(e)=>UpdateForm({...formFields, password: e.currentTarget.value})}
         className='login-form__input' type="password" />
         <div className='login-form__button-container'>
        <button onClick={handleLogin} className='login-form__login-button login-form__login-button--hover'>Log in</button>
        <p className='login-form__error'>{formFields.errorMessage}</p>
        </div>
    </form>
    )
}

export default LoginForm;