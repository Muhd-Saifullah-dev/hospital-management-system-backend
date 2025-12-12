

const pagination=async(req)=>{
    let page=parseInt(req.query.page) || 1
    let limit=parseInt(req.query.limit) || 10
    let skip=(page-1) * limit
     return {page,limit,skip}
}

module.exports={pagination}