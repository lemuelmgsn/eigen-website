
import express from 'express'

import fetchJson from './helpers/fetch-json.js'

const app = express()

app.set('view engine', 'ejs')

app.set('views', './views')

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

// VARIABELEN

const apiUrl = 'https:fdnd-agency.directus.app/items/f_houses'

// ROUTES

app.get('/', function(request, response) {
        fetchJson('https://fdnd-agency.directus.app/items/lemuel_kleding').then((apiData) => {
            response.render('homepage', {
              data: apiData.data})
        });
})

app.get('/', function(request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/lemuel_kleding').then((apiData) => {
        response.render('carrousel', {
          data: apiData.data})
	});
})


// 

