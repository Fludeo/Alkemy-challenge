import React, { useEffect } from "react";
import NavBar from "./NavBar";
import '../styles/home_page/home_page.css'
import { useNavigate } from "react-router-dom";


type props = {
    token:string
    setAccessToken:(payload:string)=>any
}
const HomePage = ({token,setAccessToken}:props) => {
const navigate = useNavigate()

 useEffect(()=>{
if(token===''){
    navigate('/')
}

 },[token])
    return (
    <div className="home-page">
    <NavBar token={token} setAccessToken={setAccessToken}></NavBar>
    <main className="main-home">
        <section className="section-balance">
            <h1 className="balance__header">Total balance:</h1>
            <h1 className="balance__number" >190.289,00$</h1>
        </section>
        <section className="section-records">
            <table className="records__table">
                <thead>
                    <tr>
                        <th>Concept</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>
    </div>)
}


export default HomePage;