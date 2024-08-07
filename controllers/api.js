const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const User = require('../models/user.js');
const Watch = require('../models/watch.js');

const BASE_URL = 'https://watch-database1.p.rapidapi.com/'
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': `${process.env.API_KEY}`,
    'x-rapidapi-host': 'watch-database1.p.rapidapi.com'
  }
};

router.get('/brand/:brandName', async(req, res) => {
  try{
    const result = await fetch(`${BASE_URL}all-family-by/brandname/${req.params.brandName}`, options)
    const data = await result.json()
  
    const familyNames = Object.values(data).map(entry => entry.familyName)
    
    const requests = familyNames.map(familyName => {
      return fetch(`${BASE_URL}all-models-by/brandname/${req.params.brandName}/family/${familyName}`, options)
    })
    const responses = await Promise.all(requests)
    const allModels = responses.flatten(Infinity)
    res.send(allModels)
  } catch(err){
    console.log(err)
  }
})

module.exports = router;