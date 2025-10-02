import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js';
import cookieParser from 'cookie-parser'
import  pool from './db/dbconfig.js'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
// app.set('veiw engine', 'ejs');
app.use('/api', router);
// app.use('/', router)



app.listen(PORT , ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
});
