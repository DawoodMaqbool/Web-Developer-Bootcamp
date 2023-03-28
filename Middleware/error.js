module.exports = function(err, req, res, next){ //middleware function for logging errors
    console.log(err)
    if (err.name == 'CastError' || err.name == 'Error') { //check if error is of type casterror or error
        res.status(404).send("Object not found"); //display 404 code with object not found
    } 
    else if(err.name == "JsonWebTokenError"){
        res.status(401).send("Forbidden")
    }
    else {
        res.status(500).send("Internal Server Error"); //else display internal server error for all other kinds of errors.
    }
}