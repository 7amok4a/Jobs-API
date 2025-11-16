import { StatusCodes } from "http-status-codes";
import CustomAPIError  from "../errors/custom-error.js";

const errorHandlerMiddleware = (err , req , res , next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : err.message}) ; 
}
export default errorHandlerMiddleware ; 