import React, { useEffect, useState } from "react";

import NavBar from "./NavBar";
import '../styles/home_page/home_page.css'
import { useNavigate } from "react-router-dom";
import Modal from "../common/modal";
import NewRecordForm from "./NewRecordForm";
import { RecordFormType } from "../../types/types";
import TotalBalance from "./TotalBalance";





type props = {
    token:string
  
}
const HomePage = ({token}:props) => {
const [newRecordModal,setNewRecordModal] = useState<boolean>(false)
const [newRecordForm ,setNewRecordForm] =useState<RecordFormType>({}as RecordFormType)
const navigate = useNavigate()




const handleRecordSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
e.preventDefault()

try{
    const response = await fetch('/record/new', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' :`Bearer ${token}`,
        },
        body: JSON.stringify(newRecordForm)
      });
      if(response.ok){
        navigate('/logged/home')
        setNewRecordModal(false)
     
    }
    else{
        const content = await response.json();
        setNewRecordForm({...newRecordForm, errorMessage:content.message})
        throw new Error(content.message)
    }
    }
    catch(err){
        console.log(err)
    }
}



 useEffect(()=>{
if(token===''){
    navigate('/')
}

 },[token])
    return (
    
    <main className="main-home">
        <section className="section-balance">
            <TotalBalance token= {token} buttonOnclick={()=>setNewRecordModal(true)}></TotalBalance>
        </section>
        <section className="section-records">
            
        </section>
        <Modal trigger={newRecordModal}>
        <NewRecordForm handleRecordSubmit ={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleRecordSubmit(e)} formFields={newRecordForm} UpdateForm={(payload:RecordFormType)=>setNewRecordForm({...payload, errorMessage:''})} closeForm={()=>setNewRecordModal(false)}></NewRecordForm>
        </Modal>
    </main>
    
   )
}

export default HomePage;