import {Pool} from 'pg';
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'goodness',
    port:5432
});
pool.connect((err, client , release)=>{
    if(err){
        console.log('unable to connect to database' , err)
    }else{
        console.log('database connection was successfull');
        release()
    }
});
export default pool ;