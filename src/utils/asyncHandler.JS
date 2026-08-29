//FROM PROMISES
const asyncHandler = (requestHadler) => {
    return (req, res, next) => {
        Promise.resolve(requestHadler(req, res, next)).catch((err) => next(err))
    }
}


export {asyncHandler} 


// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}



    // FROM TRY CATCH
// const asyncHandler = (fun) => async ( req, res, next) => {
//     try {
//         await fun(req, res, next)
//     }catch (error) {
//         res.status(error.code || 500).json{
//             success: false,
//             message: error.message
//         }
//     }
// }