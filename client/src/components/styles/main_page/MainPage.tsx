import React, { useState } from "react"

const MainPage = () =>{

const [token,setToken] = useState({accesToken:''})
const [formData,setFormData] = useState({})
const [signupForm, setSignupForm] = useState({})


const handleSubmit = async (e: { preventDefault: () => void }) =>{
e.preventDefault()
try{
const rawResponse = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  const content = await rawResponse.json();

  setToken(content)
  console.log(content);

}
catch(err){console.log(err)}
}

const handleSignup = async (e: { preventDefault: () => void }) =>{
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
    const content = await rawResponse.json();
  
    console.log(content);
  
  }
  catch(err){console.log(err)}
  }


const askForName = async (e: { preventDefault: () => void }) =>{
    e.preventDefault()
    try{
    const rawResponse = await fetch('/user/info', {
        method: 'GET',
        headers: {
         'Authorization' : `Bearer ${token.accesToken}`,
        },
        
      });
      const content = await rawResponse.json();
      console.log(content);
    
    }
    catch(err){console.log(err)}
    }
 




    return(
    <div className="login-form">
        <form onSubmit={(e)=>handleSubmit(e)}>
            <p>email</p>
            <input onChange={(e)=>setFormData({...formData ,email:e.currentTarget.value})} type="text" name="email" id="email"/>
            <p>password</p>
            <input type="text" name="password" id="password" onChange={(e)=>setFormData({...formData ,password:e.currentTarget.value})} />
            <button type="submit">ingresar</button>
        </form>
        <form onSubmit={(e)=>askForName(e)}>
          
            <button type="submit">nombre</button>
        </form>
        <form onSubmit={(e)=>handleSignup(e)}>
            <p>email</p>
            <input onChange={(e)=>setSignupForm({...signupForm ,email:e.currentTarget.value})} type="text" name="email" id="email"/>
            <p>name</p>
            <input onChange={(e)=>setSignupForm({...signupForm ,name:e.currentTarget.value})} type="text" name="name" id="name"/>
            <p>password</p>
            <input type="text" name="password" id="password" onChange={(e)=>setSignupForm({...signupForm ,password:e.currentTarget.value})} />
            <button type="submit">ingresar</button>
        </form>
    </div>)


}

export default MainPage

