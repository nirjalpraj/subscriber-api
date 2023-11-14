const express = require('express')
const router = express.Router()
const Subscriber = require('../model/subscriber')

// get all
router.get('/',async (req,res)=>{
    try{
        const subscribers =  await Subscriber.find()
        res.json(subscribers)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
//get one
router.get('/:id', getSubscriber,(req,res)=>{

})
//create one
router.post('/', async(req,res)=>{
   
    const subscriber = {
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel,
    }
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

// edit one
router.patch('/:id',getSubscriber, async(req,res)=>{
    if(req.body.name !== null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel !== null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try{
        const updatedSubscriber = await res.subscriber.save()
        res.send(updatedSubscriber) 
    }catch(err){
        return err.status(400).json({message })
    }
})

// delete one
router.post('/:id',getSubscriber, async(req, res)=>{
    try{
         await res.subscriber.remove()
         res.json({message:"Deleted subscriber"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

async function getSubscriber(req, res, next){
    let subscriber
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message:"Can not find subscriber"})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }

    res.subscriber = subscriber
    next()
}



module.exports = router