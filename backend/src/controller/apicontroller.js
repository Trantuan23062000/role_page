const testApi = (req,res) =>{

    return res.status(200).json({
        message:'Ok',
        data : 'test api'
    })

}

module.exports = {
    testApi
}