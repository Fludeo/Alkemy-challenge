import '../styles/login_form.css'
import React from 'react';
import LoginFormType from'../../types/types'


type props = {
    UpdateForm: (payload:LoginFormType)=>void
    formFields: LoginFormType
}



const LoginForm =({UpdateForm,formFields}:props) =>{


    return(
    <form className="login-form">
        <label className='login-form__label' >Email</label>
        <input onChange={(e)=>UpdateForm({...formFields, email: e.currentTarget.value})} 
        className='login-form__input' type="text"  />
        <label className='login-form__label' >Password </label>
        <input onChange={(e)=>UpdateForm({...formFields, password: e.currentTarget.value})}
         className='login-form__input' type="password" />
        <button className='login-form__login-button login-form__login-button--hover'>Log in</button>
    </form>
    )
}

export default LoginForm;