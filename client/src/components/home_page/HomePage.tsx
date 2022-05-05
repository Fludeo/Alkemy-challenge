import React, { useEffect } from "react";
import NavBar from "./NavBar";
import '../styles/home_page/home_page.css'
import { useNavigate } from "react-router-dom";
import Modal from "../common/modal";


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
            <div className="balance__container">
            <h1 className="balance__header">Total balance:</h1>
            <h1 className="balance__number" >190.289,00$</h1>
            </div>
            <div className="balance__button-container">
                <button className="balance__button balance__button--hover">New Record</button>
            </div>
        
        </section>
        <section className="section-records">
            <table className="records__table">
                <thead className="records__header">
                    <tr>
                        <th>Concept</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dinner</td>
                        <td>{new Date().getMonth()}/{new Date().getDay()}/{new Date().getFullYear()}</td>
                        <td>Electronic</td>
                        <td>outgo</td>
                        <td>2000$</td>
                    </tr>
                    <tr>
                        <td>new TV</td>
                        <td>2000$</td>
                        <td>{new Date().getMonth()}/{new Date().getDay()}/{new Date().getFullYear()}</td>
                        <td>outgo</td>
                        <td>Electronic</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>
    <Modal trigger={false}>
        <form>
            
        </form>
    </Modal>
    </div>)
}


export default HomePage;