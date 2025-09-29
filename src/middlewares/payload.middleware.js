const payloadMiddleWare = (schema) => {

    return(req,res, next) => {
        const { error } = schema.validate(req.body);
        if(error){
            return res.status(400).json({ //se debe aca hacer un manejo de errores particular segun el campo incorrecto?
             error: "Validation error",
            details:error.details.map((err)=> err.message)});
        }
        return next();
    }
};
module.exports = payloadMiddleWare;