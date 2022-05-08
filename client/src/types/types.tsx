type LoginFormType = {
    email:string,
    password:string
    errorMessage:string

}
type SignFormType = {
    name:string,
    email:string,
    password:string,
    repeatPassword:string,
    errorMessage:string
}

type RecordFormType = {
    id:number|undefined
    concept:string
    date:Date
    type:string
    category:string
    amount:number
    errorMessage:string
}

type Record = {
    id:number
    concept:string
    date:Date
    type:string
    category:string
    amount:number
}

export  type {LoginFormType, SignFormType , RecordFormType , Record}