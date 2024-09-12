


    

const checkSymbol = (json)=>{
    const string = JSON.stringify(json).replaceAll("^","")
    json= JSON.parse(string)
    return json

}

 export {checkSymbol}
