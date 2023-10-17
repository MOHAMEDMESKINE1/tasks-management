const formatedate = (value) => {
    
    const date  = new Date(value).toLocaleDateString()
    return date ;
}
 
export default formatedate;