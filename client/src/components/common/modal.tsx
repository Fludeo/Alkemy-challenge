import React, {   ReactNode } from "react"
import ReactDOM  from "react-dom"


import '../styles/modal.css'

type props = {
    trigger:boolean
    children?: ReactNode;
}


 const Modal = ({children,trigger}:props) => {



    return (
        trigger ?  ReactDOM.createPortal(
        <div  className='modal'>
        {children}
        </div> , window.document.getElementById('modal') as HTMLElement):<p style={{visibility:'hidden'}}></p>

    );
}

export default Modal