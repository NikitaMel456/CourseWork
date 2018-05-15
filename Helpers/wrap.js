module.exports = fn =>
    (req, res, next) =>{
    console.log("midddle");
        fn(req, res, next).catch(next)};