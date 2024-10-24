import express from 'express';
// import listRoutes from './list1';
import pokeRoutes from './pokemon';
import cors from 'cors';
import { ConnectDB } from './server';

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

ConnectDB(); 

app.use("/api/pokemon", pokeRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});