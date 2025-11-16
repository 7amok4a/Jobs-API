class CustomAPIError extends Error {
    constructor(message) {
        super(message); 
        //this.statusCode = statusCode; 
    }
}


export default CustomAPIError ; 
// const createCustomError = (message , statusCode) => {
//     return new CustomAPIError(message , statusCode); 
// }

// export {
//     createCustomError, 
//     CustomAPIError
// };