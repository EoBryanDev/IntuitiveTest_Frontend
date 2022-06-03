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
    
});

router.post('/', async(req, res) => {
    const newCadopItem = new CadopList('../../db.json')
    try {
        const cadopList = await newCadopItem.save()
        if(!cadopList) throw new Error('Something went wrong saving')
        res.status(200).json(cadopList)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
});

router.put('/:id', async(req, res) => {
    const { id } = req.params
try {
    const response = await CadopList.findByIdAndUpdate(id, req.body)
    if(!response) throw Error('Something went wrong')
    const updated = { ...response._doc, ...req.body}
    res.status(200).json(updated)
} catch (error) {
    res.status(500).json({ message: error.message})
}
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params
try {
    const removed = await CadopList.findByIdAndDelete(id)
    if(!removed) throw Error('Something went wrong')
    res.status(200).json(removed)
} catch (error) {
    res.status(500).json({ message: error.message})
}
})

module.exports = router