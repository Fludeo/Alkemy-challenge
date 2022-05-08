import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { USDConverter } from "../../../helper_functions/toCurrency"
import { Record } from "../../../types/types"
import '../../styles/logged_page/home_page/record_table.css'


type props ={
    token:string
}

const RecordTable = ({token}:props) =>{
const [tableData,setTableData] = useState<Array<Record>|null>(null)
const location = useLocation()
 
useEffect(()=>{
    if(token===''){return}
    fetch('/record/get/10/type/category/',{ method: 'GET',
    headers: {
    'Authorization' :`Bearer ${token}`,
    }})
    .then(res=>res.json())
    .then(res=>setTableData(res.records))
    .catch(err=>console.log(err))

},[location])

    return(
        <div className="table-container">
        <div className="mobile-table">
       
       
            <div className="mobile-table__head">
                
                <div className="mobile-table__header-amount"><p>AMOUNT</p></div>
                <div className="mobile-table__header-concept"><p>CONCEPT</p></div>
                <div className="mobile-table__header-type"><p>TYPE</p></div>
            </div>
          {tableData!==null&&tableData.map((record)=>   
          <div className="mobile-table__card " key={record.id}>
                <div className="mobile-table__card-amount">
                    <p>{USDConverter(record.amount)}</p>
                    <p>{new Date(record.date).toLocaleDateString()}</p>
                </div>
                <div className="mobile-table__card-concept">
                    <p>{record.concept}</p>
                </div>
                <div className="mobile-table__card-type">
                    <div className={record.type==='income'?"mobile-table__type-income":"mobile-table__type-outgo"}><p>{record.type}</p></div>
                    <p>{record.category}</p>
                </div>
            </div>
          )}
        </div>
        
        <table className="table">
            <thead className="table__head">
                <tr>
                    <th>CONCEPT</th>
                    <th>AMOUNT</th>
                    <th>TYPE</th>
                    <th>CATEGORY</th>
                    <th>DATE</th>
                </tr>
            </thead>
            <tbody>
            {tableData!==null&&tableData.map((record)=>
                <tr className="table__data-row" key={record.id}>
                    <td>{record.concept}</td>
                    <td>{USDConverter(record.amount)}</td>
                    <td><p className={record.type==='income'?"table__type-income":"table__type-outcome"}>{record.type}</p></td>
                    <td>{record.category}</td>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                </tr>
            )}
            </tbody>
        </table>
    
        
    </div>)
}


export default RecordTable;