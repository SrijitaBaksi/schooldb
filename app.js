import express from 'express'
import dotenv from 'dotenv'
import schoolRoutes from './routes/SchoolRoutes.js'

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', schoolRoutes);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log("Server is running on port", port);
})