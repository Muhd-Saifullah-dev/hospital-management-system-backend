class AppError extends Error{
    constructor(message,status){
        super(message)
        this.message=message
        this.status=status
        Error.captureStackTrace(this,this.constructor)
    }
}

class validationError extends AppError{
    constructor(message,skipLogging=false){
        super(message,422)
    }
}

class BadRequestError extends AppError{
    constructor(message,skipLogging=false){
        super(message,400)
    }
}
class UnAuthorizedError extends AppError{
    constructor(message){
        super(message,401)
    }

}

class ForbiddenError extends AppError{
    constructor(message){
        super(message,403)
    }
}


class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

class InternalServerError extends AppError {
    constructor(message) {
        super(message, 500);
    }
}


module.exports={
    AppError,
    validationError,
    BadRequestError,
    UnAuthorizedError,
    ForbiddenError,
    NotFoundError,
    InternalServerError
}