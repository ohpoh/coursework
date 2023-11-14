const fs = require('fs');
const express= require('express');

const mongoose = require('mongoose')



const app=express();
const { Image } = require('image-js');
app.set('view engine', 'ejs');
app.set('views','./templates')
app.use(express.static('public'))
app.use(express.static('img'));
app.set("view engine", "hbs");
app.set('view engine', 'html');


const mysql = require("mysql2");
const urlencodedParser = express.urlencoded({extended: false});
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "coursework",
  password: "Admin"
});
connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });

// connection.execute("SELECT name FROM users", function(err, results){
//     console.log(err);
//     console.log(results);

    
//   });


app.get('/',(reg,res)=>{ //Какой url адрес отслеживаем и будет принимать 2 параметра res-Ответ от сервера
    res.send('Hello');
})

app.get('/index', (reg,res)=>{

    connection.query('SELECT name FROM users WHERE idusers = 1', function(error, result, fields){
        console.log(result);
        res.render('index.ejs', { params: result });
    })
    // connection.end();
})

// app.post('/check',urlencodedParser, (reg,res)=>{
//     // res.render('check_registr.hbs');

//     const tt=[
//         ['bob',22],
//         ['@mm',21]
//     ];
//     console.log(tt);
//     // const {body}=reg;
//     const test={
//         login:reg.body.login,
//         mail:'body.mail',
//     };
//     console.log(test);
//     // const logins = res.body.login;
//     // const mail = reg.body.mail;
//     // const password = reg.body.password;
//     // const password_2 = reg.body.password_2;
//     // console.log(reg.body.login);

// //     const Schema = mongoose.Schema
// // const userSchema = new Schema({
// //     email: {
// //         type : String,
// //         required: true,// поле обязательное
// //         unique: true // будет проверять, если есть такая почта, то будет ошибка
// //     },
// //     password : {
// //         type : String,
// //         required: true
// //     }
// // })
// // module.exports = mongoose.model('users', userSchema)
// // console.log(userSchema);
// // 
// })
app.get('/info_00', (reg,res)=>{
    res.sendFile(__dirname +'/templates/info_00.html');
})

app.get('/registr',urlencodedParser, (req,res)=>{
    res.sendFile(__dirname +'/templates/registr.html');
})
app.post('/registr',urlencodedParser,(req,res)=>{
    res.render('check_registr.hbs');
    const mail=req.body.mail;
    console.log("Тест");
    console.log(mail);
     console.log(req.body);
    const test={
        login:req.body.login,
        mail:'body.mail',
    };
    console.log(test);

    connection.connect(function(err){
        if (err) {
          return console.error("Ошибка: " + err.message);
        }
        else{
          console.log("Подключение к серверу MySQL успешно установлено");
        }
     });
    //  let query=`SELECT mail FROM users WHERE mail="${mail}"`;
      connection.query(`SELECT mail FROM users WHERE mail="${mail}"`, function(error, result, fields){
        // connection.query(query,  (err, result, field)=> {   
        //     persons=result     
        //     console.log('persons = ',persons)
        // })

        if(result==undefined){
            console.log("Все норм");
        }
        else{
            console.log("Дубликат маила");
        }
        // a=result;
        // if(mail==a){
        //     console.log("Дубликат маила");
        // }
        // console.log(a);
        console.log(mail);
        console.log("Тест");
        console.log(result);
        // console.log(a);
        // connection.end();
    
    
    })

})
app.get('/auth', (reg,res)=>{
    res.sendFile(__dirname +'/templates/auth.html');
})
const port = 3000;
app.listen(port, () =>{ //Порт по которому будем подключаться
    console.log("Сервер доступен"); 
})

