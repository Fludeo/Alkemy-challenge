

const FormatDate = (date:Date):string=>{
  const formatedDate =  new Date(date).toISOString().substring(0, 10)
  return formatedDate
}




export default FormatDate