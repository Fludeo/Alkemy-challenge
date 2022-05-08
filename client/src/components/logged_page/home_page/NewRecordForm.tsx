
import React, {useState } from 'react';
import getCategories from '../../../helper_functions/getCategories';
import { RecordFormType } from '../../../types/types';
import'../../styles/logged_page/home_page/new_record_form.css'


type props = {
    UpdateForm: (payload:RecordFormType)=>void
    formFields: RecordFormType
    closeForm:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
    handleRecordSubmit:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
}



const NewRecordForm =({closeForm,handleRecordSubmit,UpdateForm,formFields}:props) =>{
    const [checkBox,setCheckBox] = useState({income:false,outgo:false})
   



    return(
    <form className="new-record-form">
        <label className='new-record-form__label' >Concept</label>
        <input onChange={(e)=>UpdateForm({...formFields, concept: e.currentTarget.value})} 
        className='new-record-form__input' type="text"  />

        <label className='new-record-form__label' >Amount</label>
        <input type='number' step={0.01} min={1} onChange={(e)=>UpdateForm({...formFields, amount: Number(e.currentTarget.value)})} 
        className='new-record-form__input' />
        <div className='new-record-form__checkbbox-container'>
            <div className='new-record-form__checkbox'>
            <input checked={checkBox.income} type='checkbox' value={'income'} name='type' 
            onClick={()=>setCheckBox({income:true,outgo:false})}
            onChange={(e)=>UpdateForm({...formFields, type: e.currentTarget.value})}/>
            <label className='new-record-form__label' >Income</label>
            </div>
            <div className='new-record-form__checkbox'>
            <input checked={checkBox.outgo} type='checkbox' value={'outgo'} name='type' 
            onClick={()=>setCheckBox({income:false,outgo:true})}
            onChange={(e)=>UpdateForm({...formFields, type: e.currentTarget.value})}/>
            <label className='new-record-form__label ' >Outgo</label>
            </div>
        </div>
        {checkBox.outgo&&<select onChange={(e)=>UpdateForm({...formFields,category:e.currentTarget.value})}  className='new-record-form__input'>
            <option value="">Choose category</option>
            {getCategories().outgo.map(category=><option key={category} value={category}>{category}</option>)}
        </select>}
        {checkBox.income&&<select onChange={(e)=>UpdateForm({...formFields,category:e.currentTarget.value})}  className='new-record-form__input'>
            <option value="">Choose category</option>
            {getCategories().income.map(category=><option key={category} value={category}>{category}</option>)}
        </select>}
        <label className='new-record-form__label' >Date</label>
        <input onChange={(e)=>UpdateForm({...formFields, date: new Date(e.currentTarget.value)})} 
        className='new-record-form__input' type="date"  />
         <p className='new-record-form__error'>{formFields.errorMessage}</p>
         <div className='new-record-form__button-container'>
         <button onClick={handleRecordSubmit} className='new-record-form__accept-button new-record-form__accept-button--hover'>Accept</button>
         <button onClick={closeForm} className='new-record-form__cancel-button new-record-form__cancel-button--hover'>Cancel</button>
        </div>
    </form>
    )
}

export default NewRecordForm;