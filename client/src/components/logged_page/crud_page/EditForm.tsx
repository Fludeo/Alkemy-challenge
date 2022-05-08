
import React from 'react';
import FormatDate from '../../../helper_functions/formatDate';
import getCategories from '../../../helper_functions/getCategories';
import { RecordFormType } from '../../../types/types';
import'../../styles/logged_page/crud_page/edit_form.css'


type props = {
    UpdateForm: (payload:RecordFormType)=>void
    formData: RecordFormType
    closeForm:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
    handleSubmit:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
    type:'income'|'outgo'
}



const EditRecordForm =({closeForm,handleSubmit,UpdateForm, formData ,type}:props) =>{
    
   



    return(
    <form className="edit-record-form">
        <label className='edit-record-form__label' >Concept</label>
        <input defaultValue={formData.concept?formData.concept:''} onChange={(e)=>UpdateForm({...formData, concept: e.currentTarget.value.trim()})} 
        className='edit-record-form__input' type="text"  />

        <label className='edit-record-form__label' >Amount</label>
        <input defaultValue={formData.amount?formData.amount:0} type='number' step={0.01} min={1} onChange={(e)=>UpdateForm({...formData, amount: Number(e.currentTarget.value)})} 
        className='edit-record-form__input' />
        <label className='edit-record-form__label' >Category</label>
        <select onChange={(e)=>UpdateForm({...formData,category:e.currentTarget.value})} defaultValue={formData.category?formData.category:''} className='edit-record-form__input'>
            <option value="">Choose category</option>
            {getCategories()[type].map(category=><option key={category} value={category}>{category}</option>)}
        </select>
        <label className='edit-record-form__label' >Date</label>
        <input 
        defaultValue={formData.date?FormatDate(formData.date):''} 
        onChange={(e)=>UpdateForm({...formData, date: new Date(e.currentTarget.value)})} 
        className='edit-record-form__input' type="date"  />
        <p className='edit-record-form__error'>{formData.errorMessage?formData.errorMessage:''}</p>
         <div className='edit-record-form__button-container'>
         <button onClick={handleSubmit} className='edit-record-form__accept-button edit-record-form__accept-button--hover'>Accept</button>
         <button onClick={closeForm} className='edit-record-form__cancel-button edit-record-form__cancel-button--hover'>Cancel</button>
        </div>
    </form>
    )
}

export default EditRecordForm;



// `${new Date(formData.date).getFullYear()}-${new Date(formData.date).getUTCMonth()+1}-${new Date(formData.date).getDate()}`