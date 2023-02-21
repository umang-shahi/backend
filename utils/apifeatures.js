class ApiFeatures{
    constructor (query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }


    //for search

    search(){

        const keyword = this.queryStr.keyword ? {
            productName: {
                $regex:this.queryStr.keyword,
                $options: "i",                            //to get small or capital 
            },
        }:{}
        console.log(keyword)
        this.query = this.query.find({...keyword})   //... speed operators
        return this

    }


    //filter 

  filter(){

    const queryCopy = {...this.queryStr}

    //removing some fileds

    const removeFields = ["keyword","page","limit"]
    removeFields.forEach(key=>delete queryCopy[key]);
   

    //for price and ratings filter

    let  queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)

    this.query = this.query.find(JSON.parse(queryStr));
    return this;

  }

//pagination

  pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage*(currentPage-1);

    this.query = this.query.limit(resultPerPage).skip(skip)
    return this;
  }



}
module.exports = ApiFeatures;