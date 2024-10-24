// const express = require('express');
// const app = express();
// //Express via common js || Get require to work for es module
// //import { createRequire } from "module";
// //const require = createRequire(import.meta.url);
// const { readFile } = require(`fs`).promises;

// //PORT
// const port = process.env.PORT || 8080; // Use the port provided by the host or default to 3000
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

// app.get('/meow.html', async (req, res) => {
//   res.send(await readFile('./meow.html', 'utf-8'));
// });

// // Define a route to handle incoming requests
// app.get('/', async (req, res) => {
//   res.send(await readFile('./index.html', 'utf-8'));
// });

// const data = [
//   { id: 1, name: 'Sir Srilan' },
//   { id: 2, name: 'Kuya JF' },
//   { id: 3, name: 'Kuya Jason' },

//   { id: 4, name: 'Yves' },
//   { id: 5, name: 'Lo' },
//   { id: 6, name: 'Mike' },

//   { id: 7, name: 'Jene' },
//   { id: 8, name: 'Hanif' },
// ];

// // Middleware to parse JSON requests
// app.use(express.json());

// // Create (POST) a new item
// app.post('/Globaltek_Office', (req, res) => {
//   const newItem = req.body;
//   data.push(newItem);
//   res.status(201).json(newItem);
// });

// // POST http://localhost:3000/Globaltek_Office
// // Body: { "name": "New Item" }

// // Read (GET) all Globaltek_Office
// app.get('/Globaltek_Office', (req, res) => {
//   res.json(data);
// });
// //GET http://localhost:3000/Globaltek_Office

// // Read (GET) a specific item by IDqA
// app.get('/Globaltek_Office/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const item = data.find((item) => item.id === id);
//   if (!item) {
//     res.status(404).json({ error: 'Item not found' });
//   } else {
//     res.json(item);
//   }
// });
// //GET http://localhost:3000/Globaltek_Office/1


// // Update (PUT) an item by ID
// app.put('/Globaltek_Office/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const updatedItem = req.body;
//   const index = data.findIndex((item) => item.id === id);
//   if (index === -1) {
//     res.status(404).json({ error: 'Item not found' });
//   } else {
//     data[index] = { ...data[index], ...updatedItem };
//     res.json(data[index]);
//   }
// });
// // PUT http://localhost:3000/Globaltek_Office/1
// // Body: { "name": "Updated Item" }

// // Delete (DELETE) an item by ID
// app.delete('/Globaltek_Office/:id', (req, res) => {
//       const id = parseInt(req.params.id);
//       const index = data.findIndex((item) => item.id === id);
//       if (index === -1) {
//         res.status(404).json({ error: 'Item not found' });
//       } else {
//         const deletedItem = data.splice(index, 1);
//         res.json(deletedItem[0]);
//       }
// });
// //DELETE http://localhost:3000/Globaltek_Office/1




const str = "";
let num =  4 ;

const function1  = () => {


    
}

function func2 () {


}