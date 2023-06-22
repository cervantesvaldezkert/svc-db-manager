//get variables in url
exports.getUrlParam = (url, param) => {

    const searchParams = url.searchParams;
    
    return searchParams.get(param);
}

//compute for page offset start and end
exports.getPageOffset = (page, limit) => {

    let offsetStart = ((page - 1) * limit) - 1;
    let offsetEnd = Number(offsetStart) + Number(limit);

    return {
        start: offsetStart,
        end: offsetEnd
    }

}