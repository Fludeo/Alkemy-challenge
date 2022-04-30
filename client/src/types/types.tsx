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

export  type {LoginFormType, SignFormType}