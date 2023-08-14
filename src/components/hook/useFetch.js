import { useCallback, useState } from "react";


const useFetch = () => {

    const [loading,setLoading] = useState(false)
    const [errors,setErrors] = useState();

    const sendRequest =  useCallback(async(requestUrl,applyData) => {
      
      setLoading(true);
      setErrors(null);

      try{
      const response  = await fetch(requestUrl.url,{
        method:requestUrl.method ? requestUrl.method : "GET",
        headers:requestUrl.headers ? requestUrl.headers : {},
        body:requestUrl.body ? JSON.stringify(requestUrl.body) : null
      })
        if(!response.ok){
          throw new Error("Request failed")
        }
        const data = await response.json()
        applyData(data)
      }
      catch(error){
        setErrors(error.message);
      }
      setLoading(false)
    },[])
    return {
      sendRequest,
      loading,
      errors,
    }
}


export default useFetch;