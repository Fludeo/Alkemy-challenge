import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { USDConverter } from "../../../helper_functions/toCurrency"


import '../../styles/logged_page/home_page/total_balance.css'



type props ={
    buttonOnclick: ()=>void
    token:string
}
const TotalBalance = ({token,buttonOnclick}:props) =>{
const [balance,setBalance] = useState<number>(0)
const location = useLocation()

console.log(balance)

useEffect(()=>{
    if(token!==''){
    fetch('/record/balance',{ method: 'GET',
              headers: {
                'Authorization' :`Bearer ${token}`,
              }, }).then(res=>res.json()).then((res)=>res.balance
              ?setBalance(Number(res.balance)):setBalance(0))
              .catch(err=>console.log(err))}
},[token,location])



    return( 
        <div>
         <div className="balance__container">
            <h1 className="balance__header">Your balance</h1>
            <h1 className={balance>=0?"balance__number":"balance__number-negative"} >{USDConverter(balance)}</h1>
         </div>
         <div className="balance__button-container">
            <button onClick={buttonOnclick} className="balance__button balance__button--hover">New Record</button>
        </div>
        </div>)
}

export default TotalBalance;