import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { USDConverter } from "../../helper_functions/toCurrency"


import '../styles/home_page/total_balance.css'



type props ={
    buttonOnclick: ()=>void
    token:string
}
const TotalBalance = ({token,buttonOnclick}:props) =>{
const [data,setData] = useState<string>('')
const location = useLocation()

useEffect(()=>{
    if(token!==''){
    fetch('/record/balance',{ method: 'GET',
              headers: {
                'Authorization' :`Bearer ${token}`,
              }, }).then(res=>res.json()).then((res)=>setData(res.balance)).catch(err=>console.log(err))}
},[token,location])



    return( 
        <div>
         <div className="balance__container">
            <h1 className="balance__header">Your balance</h1>
            <h1 className="balance__number" >{USDConverter(Number(data))}</h1>
         </div>
         <div className="balance__button-container">
            <button onClick={buttonOnclick} className="balance__button balance__button--hover">New Record</button>
        </div>
        </div>)
}

export default TotalBalance;