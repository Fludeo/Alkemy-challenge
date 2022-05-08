import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import getCategories from "../../../helper_functions/getCategories"

import { USDConverter } from "../../../helper_functions/toCurrency"
import { Record } from "../../../types/types"
import '../../styles/logged_page/crud_page/crud_record_table.css'


type props ={
    token:string
    type: 'income'|'outgo'

}

const CrudRecordTable = ({token,type}:props) =>{
const [tableData,setTableData] = useState<Array<Record>|null>(null)
const [filter,setFilter] = useState<string>('')
const location = useLocation()
 

useEffect(()=>{
    if(token==='')return
    fetch(`/record/get/type/${type}/category/${filter}`,{ method: 'GET',
    headers: {
    'Authorization' :`Bearer ${token}`,
    }})
    .then(res=>res.json())
    .then(res=>setTableData(res.records))
    .catch(err=>console.log(err))

},[location,filter])

    return(
        <div className="crud-table-container">
            <div className="crud-table__filter-container">
               <select defaultValue={filter} onChange={(e)=>setFilter(e.currentTarget.value)} className="crud-table__filter">
              <option  value={''}>No filter</option>
            {getCategories()[type].map(category=><option key={category} value={category}>{category}</option>)}             
            </select>
            </div>
        <div className="crud-mobile-table">
       
       
            <div className="crud-mobile-table__head">
                
                <div className="crud-mobile-table__header-amount"><p>AMOUNT</p></div>
                <div className="crud-mobile-table__header-concept"><p>CONCEPT</p></div>
                <div className="crud-mobile-table__header-type"><p>TYPE</p></div>
            </div>
          {tableData!==null&&tableData.map((record)=>   
          <div className="crud-mobile-table__card " key={record.id}>
                <div className="crud-mobile-table__card-amount">
                    <p>{USDConverter(record.amount)}</p>
                    <p>{new Date(record.date).toLocaleDateString()}</p>
                </div>
                <div className="crud-mobile-table__card-concept">
                    <p>{record.concept}</p>
                </div>
                <div className="crud-mobile-table__card-type">
                    <div className={record.type==='income'?"crud-mobile-table__type-income":"crud-mobile-table__type-outgo"}><p>{record.type}</p></div>
                    <p>{record.category}</p>
                </div>
            </div>
          )}
        </div>
        
        <table className="crud-table">
            <thead className="crud-table__head">
                <tr>
                    <th>CONCEPT</th>
                    <th>AMOUNT</th>
                    <th>TYPE</th>
                    <th>CATEGORY</th>
                    <th>DATE</th>
                    <th>EDIT</th>
                </tr>
            </thead>
            <tbody>
            {tableData!==null&&tableData.map((record)=>
                <tr className="crud-table__data-row" key={record.id}>
                    <td>{record.concept}</td>
                    <td>{USDConverter(record.amount)}</td>
                    <td><p className={record.type==='income'?"crud-table__type-income":"crud-table__type-outcome"}>{record.type}</p></td>
                    <td>{record.category}</td>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td><button>Edit</button></td>
                </tr>
            )}
            </tbody>
        </table>
    
        
    </div>)
}


export default CrudRecordTable;