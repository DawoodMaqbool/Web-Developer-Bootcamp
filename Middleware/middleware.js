module.exports = function (handler){ /*it is used to make the crud operation functions in bootcamp.controller. more clean by 
removing try catch blocks. and instead of repeating try catch in each function repetitively I have created a single function for that. 
*/
    return async (req, res, next) => {
      try{
        await handler(req, res);
      }
      catch(ex){
        next(ex);
      }
    };
  };