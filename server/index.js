import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(helmet());
app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use('/api', router);


// app.set('veiw engine', 'ejs');

app.listen(PORT , ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
});
