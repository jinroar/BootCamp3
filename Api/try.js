fetch(`https://pokeapi.co/api/v2/pokemon?limit=5`)
.then(function(response) { 
  return response.json()
})
.then(function(data) {   
  // do stuff with `data`, call second `fetch`
  return fetch(data.anotherUrl)
})
.then(function(response) { 
  return response.json(); 
})
.then(function(data) {
  // do stuff with `data`
})
.catch(function(error) { 
  console.log('Requestfailed', error) 
});