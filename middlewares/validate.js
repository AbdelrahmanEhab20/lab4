
//Custom Handlers for Routes
// **** Tittle ***
const validationtodo = (req, res, next) => {
    const { tittle } = req.body
    console.log(tittle);
    if (!tittle) {
        next('Error title no found');
    }
    next()
}
// **** Id ***
const validationid = (req, res, next) => {
    const id= req.params.id;
    console.log(id);
    if (!id) {
        next('ID not found');
    }
    next()
}
module.exports = {
    validationtodo, validationid
};