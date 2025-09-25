import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan'

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({extends: true}));
app.use(express.static('public'))
app.use(helmet());
app.use(morgan('dev'));


// app.set('veiw engine', 'ejs');

app.listen(PORT , ()=>{
    console.log(`server is running on http://localhost${PORT}`)
});
