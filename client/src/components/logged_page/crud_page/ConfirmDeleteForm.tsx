import React from "react"
import FormatDate from "../../../helper_functions/formatDate"
import { USDConverter } from "../../../helper_functions/toCurrency"
import { RecordFormType } from "../../../types/types"
import '../../styles/logged_page/crud_page/confirm_delete_form.css'

type props = {
    close:()=>void
    handleDelete:(e: any)=>void
    formData:RecordFormType
}



const ConfirmDeleteForm = ({handleDelete,close,formData}:props) =>{





return(
<form className="delete-form">
<h2 className="delete-form__header">Confirm delete</h2>
<label className="delete-form__label">Concept</label>
<input disabled type="text" className="delete-form__input" defaultValue={formData.concept}/>
<label className="delete-form__label">Amount</label>
<input disabled type="text" className="delete-form__input" defaultValue={USDConverter(formData.amount)}/>
<label className="delete-form__label">Type</label> 
<input disabled type="text" className="delete-form__input" defaultValue={formData.type}/>
<label className="delete-form__label">Category</label>
<input disabled type="text" className="delete-form__input" defaultValue={formData.category}/>
<label className="delete-form__label">Date</label> 
<input disabled type="date" className="delete-form__input" defaultValue={FormatDate(formData.date)}/>                  
<p className='delete-form__error'>{formData.errorMessage}</p>
<div className='new-record-form__button-container'>
<button onClick={(e)=>handleDelete(e)} className='new-record-form__accept-button new-record-form__accept-button--hover'>Accept</button>
<button onClick={close} className='new-record-form__cancel-button new-record-form__cancel-button--hover'>Cancel</button>
</div>
</form>)
}


export default ConfirmDeleteForm;