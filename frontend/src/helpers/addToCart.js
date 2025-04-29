import SummaryApi from "../common"
import { toast } from 'react-toastify'

const addToCart =async (e,id)=>{
e?.stopPropagation()
e?.preventDefault()

const response = await fetch(SummaryApi.addToCartProduct.url,{
method : SummaryApi.addToCartProduct.method,
credentials: 'include',
headers:{
    "content-type": "application/json"
},
body :JSON.stringify(
    {productId : id}
)
})
 const responsedata = await response.json()
 if(responsedata.success){
    toast.success(responsedata.message)
 }
 if(responsedata.error){
    toast.error(responsedata.message)
 }
 return responsedata
}


export default addToCart