exports.customMiddleware = async (modelName, findCriteria, sortMethod, requestQuery, Populate, next) => {
   try {
     let getSelectedColumns = requestQuery.select;
     let getLimit = requestQuery.limit;
     let getPage = requestQuery.page;
 
     const query = modelName
       .find(findCriteria)
       .populate(Populate.length == 0                 //checking here if path is provided for populating  
           ? console.log("Path Not Provided")
           : { path: Populate, options: { strictPopulate: false } }
       )
       .select(getSelectedColumns)
       .limit(getLimit)
       .skip((getPage - 1) * getLimit);
 
     if (sortMethod) {
       query.sort(sortMethod);
     }
 
     return query;
   } catch (err) {
     next(err);
   }
 };