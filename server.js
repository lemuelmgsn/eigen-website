import express from 'express'
import fetchJson from './helpers/fetch-json.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

// VARIABELEN
const apiUrl = 'https://fdnd-agency.directus.app/items/lemuel_kleding'

// Een array om de outfits op te slaan
let savedOutfits = []

// ROUTES
app.get('/', function(request, response) {
  Promise.all([
      fetchJson(apiUrl + '?filter[type][_eq]=shirts'),
      fetchJson(apiUrl + '?filter[type][_eq]=broeken'),
      fetchJson(apiUrl + '?filter[type][_eq]=schoenen')
  ]).then(([shirts, broeken, schoenen]) => {
      response.render('homepage', {
          shirts: shirts.data,
          broeken: broeken.data,
          schoenen: schoenen.data
      });
  }).catch((error) => {
      console.error('Error fetching data:', error);
      response.status(500).send('Internal Server Error');
  });
});

// POST-route voor het opslaan van de kledingstukken
app.post('/save-selection', function(request, response) {
  const selectedShirtId = request.body.selectedShirt;
  const selectedBroekId = request.body.selectedBroek;
  const selectedSchoenId = request.body.selectedSchoen;

  // Haal de details van de geselecteerde items op via de API
  Promise.all([
    fetchJson(apiUrl + '/' + selectedShirtId),
    fetchJson(apiUrl + '/' + selectedBroekId),
    fetchJson(apiUrl + '/' + selectedSchoenId)
  ]).then(([selectedShirt, selectedBroek, selectedSchoen]) => {
    // Maak een outfit object en voeg deze toe aan de array
    const newOutfit = {
      shirt: selectedShirt.data,
      broek: selectedBroek.data,
      schoen: selectedSchoen.data
    };
    
    savedOutfits.push(newOutfit);

    // Render de selectiepagina met alle opgeslagen outfits
    response.render('selection', {
      outfits: savedOutfits
    });
  }).catch((error) => {
    console.error('Error fetching selected items:', error);
    response.status(500).send('Internal Server Error');
  });
});
