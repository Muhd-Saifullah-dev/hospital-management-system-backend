function okResponse(res,status,message,data,token=null){
    const response={
        success:true,
        status,
        message,
        data,
        token,

    }
    return res.status(status).json(response)
}


function handleError(res,status,message,data=null){
    const response={
        success:false,
        status,
        message,
        data
    }
    return res.status(status).json(response)
}

module.exports={
    handleError,
    okResponse
}