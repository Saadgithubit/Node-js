import express from 'express'
const router = express.Router()

import Ads from '../models/adsSchema.mjs'
import verifyToken from '../middlewares/verifyToken.mjs'


router.get('/', async (req, res) => {
    const ads = await Ads.find()
    res.send({ message: 'Ads fetched successfully', data: ads })
})

router.get('/singleAd/:id', async(req, res) => {
    const { id } = req.params
    const singleAd = await Ads.findById(id)
    res.json({ message: 'data fetched successfully', data: singleAd,});
    // res.send({id: id})
})

// router.get('/:id')

//POST: localhost:3001/ads/post
router.post('/post', verifyToken , async (req, res) => {
    try {
        const ad = new Ads(req.body)
        await ad.save()

        res.send({ message: 'Ad posted successfully' })
    } catch (e) {
        res.send({ message: e.message })
    }
})

//router.put('/:id')

router.put('/:id' , async (req , res) => {
    try {
        const updatedAd = await Ads.findOneAndUpdate(
            { _id: req.params.id },req.body, 
            { new: true } // To return the updated document
        );
        res.send({ message: 'Ad updated successfully', updatedAd });
    } catch (e) {
        res.send({ message: 'Error updating ad', error: e.message });
    }
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAd = await Ads.findByIdAndDelete(id);
        if (deletedAd) {
            res.json({ message: 'Ad Deleted Successfully' });
        } else {
            res.status(404).json({ message: 'Ad not found' });
        }
    } catch (error) {
        console.error('Error deleting ad:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





// fetch('http://localhost:3001/ads/post',{
// method: "POST",
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         title: 'Iphone',
//         amount: '85000',
//         description: 'ABCD',
//     })
// })
// .then(res => res.json())
// .then(res => console.log(res))

export default router