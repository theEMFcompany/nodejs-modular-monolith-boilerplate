module.exports = (baseQuery, options )=>{
    let computed = baseQuery
    if(options.where){
        computed = computed.where(options.where)
    }
    if(options.limit){
        computed = computed.limit(options.limit)
    }
    if(options.offset){
        computed = computed.offset(options.offset)
    }
    if(options.orderBy){
        computed = computed.orderBy(options.orderBy.col, options.orderBy.order)
    }
    return computed;
}