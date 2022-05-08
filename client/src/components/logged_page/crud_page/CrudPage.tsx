import React from "react";
import '../../styles/logged_page/crud_page/crud_page.css'
import CrudRecordTable from "./CrudRecordTable";


type props={
    token:string
   
}
const CrudPage = ({token}:props)=>{

   
   




    return(<div className="crud-page">
    
        <section className="income__section">
            <CrudRecordTable token={token} type={'income'}></CrudRecordTable>
        </section>
      
        <section className="outgo__section">
         
            <CrudRecordTable token={token} type={'outgo'}></CrudRecordTable>         
        </section>
        

    </div>)
}


export default CrudPage;