const { Router } = require('express')
const CadopList = require('../../models/CadopListItens')

const router = Router()

router.get('/',async(req,res) => {
    try {
        const cadopList = await CadopList.find()
        if(!cadopList) throw new Error('There is no data available')
        res.status(200).json()
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

module.exports = router