require('dotenv').config()
const express = require('express')
const router = express.Router()
const URL = 'https://api.edamam.com/api/food-database/v2/parser'
router.get('/', (req, reply) => {
    const param = new URLSearchParams()
    param.append("app_id", process.env.FOOD_API_ID)
    param.append("app_key", process.env.FOOD_API_KEY)
    param.append("ingr", req.query.searchbar)
    fetch(URL +'?' + param.toString()) 
      .then(res => res.json())
        .then(value => {
          const resultLength = Object.keys(value.text).length;
          console.log(resultLength);
          const results = value.hints.map((x)=>{return {label: x.food.label, brand: x.food.brand, cal: Math.round(x.food.nutrients.ENERC_KCAL), protein: Math.round(x.food.nutrients.PROCNT*100)/100, fat: Math.round(x.food.nutrients.FAT*100)/100, carb: Math.round(x.food.nutrients.CHOCDF*100)/100} }).slice(0,5)
          reply.render('index', {results: results});

        }) 
  })

module.exports = router