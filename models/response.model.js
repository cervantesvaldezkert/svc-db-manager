//models set for standardized response format
exports.failModel = {
    isSuccess: '',
    message: 'Something went wrong..'
}

exports.successModel = {
    isSuccess: '',
    message: '',
    result: ''
}

exports.resolveResponse = (sucessMdl, failMdl) => {
    if(sucessMdl.isSuccess){
        return sucessMdl;
    }else{
        return failMdl;
    }
}