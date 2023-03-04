module.exports = {
    getIndex: async (res, req) => {
        try {
            res.render('classes/index')
        } catch (error) {
            console.log(error)
        } 
    }
}
