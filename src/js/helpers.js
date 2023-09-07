import { TIMEOUT_SECONDS } from "./config"; 


const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

/*
export async function getJSON(url){
    try{
       const response = await Promise.race([
            fetch(url),
            timeout(TIMEOUT_SECONDS)
       ])

       const data = await response.json();

       if(!response.ok) 
              throw new Error(`${data.message} ${response.status}`);

     return data;      
    } catch(err){
       throw err;
    }
}

export async function sendJSON(url, uploadData){
  try{
     const response = await Promise.race([
          fetch(url, {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(uploadData)
          }),
          timeout(TIMEOUT_SECONDS)
     ])

     const data = await response.json();

     if(!response.ok) 
            throw new Error(`${data.message} ${response.status}`);

   return data;      
  } catch(err){
     throw err;
  }
}
*/

export async function AJAX(url, uploadData = undefined){
  try{
const fetchPro = uploadData ? fetch(url, {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(uploadData)
}) : fetch(url);
 
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await response.json();
    return data;

    if(!response.ok) 
      throw new Error(`${data.message} ${response.status}`);

} catch(err){
  throw err;
}
}
