


const backendDomain = process.env.REACT_APP_BACKEND_URL //"http://localhost:8080"
const SummaryApi ={
    signUp :{
        url :`${backendDomain}/api/signup`,
        method: "post"
    },
    signin :{
        url:`${backendDomain}/api/signin`,
        method: "post"
    },
    current_user:{
        url :`${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user:{
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
   
    sellProduct: {
        url: `${backendDomain}/api/product/submit-product`, // Updated endpoint for product submission
        method: "post",
    },
    buyProduct: {
        url: `${backendDomain}/api/product-industry/submit-order`, // Updated endpoint for product submission
        method: "post",
    },
   
    
    
    
}
    
export default SummaryApi;

