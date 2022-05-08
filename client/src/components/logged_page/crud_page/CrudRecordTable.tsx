import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import getCategories from "../../../helper_functions/getCategories"
import { USDConverter } from "../../../helper_functions/toCurrency"
import { Record, RecordFormType } from "../../../types/types"
import '../../styles/logged_page/crud_page/crud_record_table.css'
import {BiEdit} from 'react-icons/bi'
import  {MdDeleteForever} from 'react-icons/md'
import Modal from "../../common/modal"
import EditRecordForm from "./EditForm"
import ConfirmDeleteForm from "./ConfirmDeleteForm"
import  FormatDate from "../../../helper_functions/formatDate"


type props ={
    token:string
    type: 'income'|'outgo'

}

const CrudRecordTable = ({token,type}:props) =>{
const [tableData,setTableData] = useState<Array<Record>|null>(null)
const [filter,setFilter] = useState<string>('')
const [editModal,setEditModal] = useState<boolean>(false)
const [deleteModal,setDeleteModal] = useState<boolean>(false)
const [formData,setFormData] = useState<RecordFormType>({} as RecordFormType)
const location = useLocation()
const navigate = useNavigate()
 











const EditRecord = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault()

    try{
        const rawResponse = await fetch(`/record/update/`,{ method: 'PUT',
        headers: {
            'Content-Type': 'application/json',    
            'Authorization' :`Bearer ${token}`,
        },
        body: JSON.stringify(formData)}); 
          if(rawResponse.ok){
       
          setEditModal(false)
          navigate(location.pathname)
        }
        else{
            const content = await rawResponse.json()
            setFormData({...formData, errorMessage:content.message})
            throw new Error(content.message)
        }
        }
        catch(err){
            console.log(err)
        }
}

const handleDeleteSubmit= async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault()

    try{
        const rawResponse = await fetch(`/record/delete/${formData.id}`,{ method: 'DELETE',
        headers: {  
            'Authorization' :`Bearer ${token}`,
        },
        body: JSON.stringify(formData)}); 
          if(rawResponse.ok){
       
          setDeleteModal(false)
          navigate(location.pathname)
        }
        else{
            const content = await rawResponse.json()
            setFormData({...formData, errorMessage:content.message})
            throw new Error(content.message)
        }
        }
        catch(err){
            console.log(err)
        }
}



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
                <button className="table__new-button table__new-button--hover">New {type}</button>
               <select defaultValue={filter} onChange={(e)=>setFilter(e.currentTarget.value)} className="crud-table__filter">
              <option  value={''}>No filter</option>
            {getCategories()[type].map(category=><option key={category} value={category}>{category}</option>)}             
            </select>
            </div>
            <div className="crud-table-wrapper">
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
                    <div>
                    <div className={record.type==='income'?"crud-mobile-table__type-income":"crud-mobile-table__type-outgo"}><p>{record.type}</p></div>
                    <p>{record.category}</p>
                    </div>
                    <div>
                    <BiEdit onClick={()=>{setFormData(record as RecordFormType)
                                              setEditModal(true)}} 
                                              className="crud-table__edit-icon crud-table__edit-icon--hover" ></BiEdit> 
                        <MdDeleteForever onClick={()=>{setFormData(record as RecordFormType)
                                                        setDeleteModal(true)}} className="crud-table__delete-icon crud-table__delete-icon--hover" ></MdDeleteForever>
                    </div>
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
                    <td>{FormatDate(record.date)}</td>
                    <td>
                        <BiEdit onClick={()=>{setFormData(record as RecordFormType)
                                              setEditModal(true)}} 
                                              className="crud-table__edit-icon crud-table__edit-icon--hover" ></BiEdit> 
                        <MdDeleteForever onClick={()=>{setFormData(record as RecordFormType)
                                                        setDeleteModal(true)}} className="crud-table__delete-icon crud-table__delete-icon--hover" ></MdDeleteForever>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
        <Modal trigger={editModal}>
                <EditRecordForm 
                UpdateForm={(payload:RecordFormType)=>setFormData(payload)} 
                formData={formData} closeForm={() => setEditModal(false)} 
                handleEditSubmit={(e)=>EditRecord(e) }  
                type={type}></EditRecordForm>
        </Modal>
        <Modal trigger={deleteModal}>
            <ConfirmDeleteForm 
                handleDelete={(e)=>handleDeleteSubmit(e)} 
                formData={formData} 
                close={()=>setDeleteModal(false)}></ConfirmDeleteForm>
         </Modal>
        </div>
    
        
    </div>)
}


export default CrudRecordTable;


