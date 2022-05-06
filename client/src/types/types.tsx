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
    id:number
    concept:string
    date:Date
    type:string
    category:string
    amount:number
    errorMessage:string
}

export  type {LoginFormType, SignFormType , RecordFormType}