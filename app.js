const fs = require('fs');
const express= require('express');
const multer  = require("multer");
// const mongoose = require('mongoose')
const session = require('express-session');
const cookieParser = require("cookie-parser");
const MySQLStore = require('express-mysql-session')(session);

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'Admin',
	database: 'coursework',
	charset: 'utf8mb4_bin',
	
};
const sessionStore = new MySQLStore(options);
// sessionStore.close().then(() => {
// 	// Successfuly closed the MySQL session store.
// 	console.log('MySQLStore closed');
// }).catch(error => {
// 	// Something went wrong.
// 	console.error(error);
// });
console.log(sessionStore);
const app=express();
const { Image } = require('image-js');
app.set('view engine', 'ejs');
app.set('views','./templates')
app.use(express.static('public'))
app.use(express.static('img'));
app.set("view engine", "hbs");
app.set('view engine', 'html');
const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser());

 app.use(session({
    resave: false, //resave- принимает логическое значение. Это позволяет сохранить сеанс обратно в хранилище сеансов, даже если сеанс никогда не изменялся во время запроса. Это может привести к ситуации гонки, если клиент делает два параллельных запроса к серверу. Таким образом, изменения, сделанные в сеансе первого запроса, могут быть перезаписаны, когда заканчивается второй запрос.
    saveUninitialized: false,//позволяет uninitializedотправить в хранилище любую сессию. 
     secret: 'keyboard cat',
     key: 'user',
     unset: 'destroy',
     store: sessionStore,
 cookie: { maxAge: oneDay }}))

const mysql = require("mysql2");
const { count, info } = require('console');
const urlencodedParser = express.urlencoded({extended: false});
// global.name=session.userid;
console.log(global.name);
const connection = mysql.createConnection(options);
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "coursework",
//   password: "Admin"
// });


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


app.get('/',(req,res)=>{ //Какой url адрес отслеживаем и будет принимать 2 параметра res-Ответ от сервера
    // res.send('Hello');
    console.log(global.name)
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.write('<a href="/logout">выход ' + + 's</a>')
        res.end()
      } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
      }
})
// app.get('/logout',(reg,res)=>{

//     reg.session.destroy();
//     res.redirect("/");
// })
app.get('/index', (reg,res)=>{


     connection.query('SELECT * FROM str', function(error, result, fields){
        if(global.name!==undefined && global.name!==''){
            const teg ='<a href="/kabinet">Личный кабинет</a><a href="/logout">Выход</a>';
            res.render('index.ejs', {teg,result});
        }
        else{
            const teg='<a href="/auth">Войти</a>';
            res.render('index.ejs', {teg,result});
        }
         console.log(result)
        console.log(global.name)
        // res.render('index.ejs', { params: result });
    })
 })
    // connection.end();

// function str(reg,res){
    
// }
app.get('/info_00',urlencodedParser, (reg,res)=>{

        
   
    const idstr=reg.query.idstr;
    const namestr=reg.query.namestr;
    console.log("тест ИД");
    console.log(idstr);
    console.log(namestr);
    connection.query(`SELECT * FROM str WHERE idstr="${idstr}"`,function(error,resultstr, fields){ 
        console.log(resultstr);

    connection.query(`SELECT * FROM review WHERE idstr="${idstr}"`,function(error,resultreview, fields){ 
            const review=resultreview;
        
    connection.query(`SELECT grades FROM itog_grades WHERE idstr="${idstr}"`, function(error, resultsc, fields){
     connection.query(`SELECT number_users FROM itog_grades WHERE idstr="${idstr}"`, function(error, resultsn, fields){
     console.log("тест оценок");
     
 
                     console.log(resultsc);
                     console.log(resultsn);
                 
     if(global.name!==undefined && global.name!==''){
        const teg ='<a href="/kabinet">Личный кабинет</a><a href="/logout">Выход</a>';
         const view="dont_none";
         connection.query(`SELECT * FROM users WHERE login = "${global.login}"`, function(error, result, fields){
             connection.query(`SELECT idusers FROM users WHERE login = "${global.login}"`, function(error, resulte, fields){
                 
                 const iduser=resulte[0].idusers;
                 console.log("Тест в info_00 ид")
                 console.log(iduser);
             connection.query(`SELECT grade FROM grade WHERE idusers="${iduser}" AND idstr="${idstr}"`, function(error, resultsy, fields){
 
                 let grades=resultsy;
     // console.log(grade)
             const name=global.name;
        
             // console.log(resulte);
             console.log('Тест info_00 иииeqeqe')
             console.log(resultsy);
             let user;
             const classotziv='otziv';
             const click_for_re="click_for_re";
             console.log(user);
             if(grades!==0 && grades!==undefined && grades!=='' && grades.length!==0){
                 if(resultsc.length!==0 && resultsn.length!==0){
                     count_grades=resultsc[0].grades.toFixed(1);
                     number_users=resultsn[0].number_users
                 connection.query(`SELECT grade FROM grade WHERE idusers="${iduser}" AND idstr="${idstr}"`, function(error, results, fields){
                     const button='Изменить оценку <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" /></svg>' ;
                     let grade=results[0].grade;
                     console.log(grade);
 
                     res.render(namestr,{view,name,user:result,classotziv,grade,button,count_grades, number_users,click_for_re,idstr,review,teg,resultstr});
                 })
             }
             else{
                 connection.query(`SELECT grade FROM grade WHERE idusers="${iduser}" AND idstr="${idstr}"`, function(error, results, fields){
                     const button='Изменить оценку <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" /></svg>' ;
                     let grade=results[0].grade.toFixed(1);
                     console.log(grade);
                     count_grades='';
                     number_users='';
                     
                     res.render(namestr,{view,name,user:result,classotziv,grade,button,count_grades, number_users,click_for_re,idstr,review,teg,resultstr});
                 })
             }
         }
             else{if(resultsc.length!==0 && resultsn.length!==0){
                 count_grades=resultsc[0].grades.toFixed(1);
                 number_users=resultsn[0].number_users;
                 const click_for_re='click_for_re';
                 const button='Оценить тайтл';
             connection.query(`SELECT grade FROM grade WHERE idusers="${iduser}" AND idstr="${idstr}"`, function(error, results, fields){
                 let grade='';
                 
             res.render(namestr,{view,name,user:result,classotziv,grade,button,count_grades,number_users,click_for_re,idstr,review,teg,resultstr});
             })
         }
         else{
             count_grades='';
             number_users='';
             const click_for_re='click_for_re';
                 const button='Оценить тайтл';
             connection.query(`SELECT grade FROM grade WHERE idusers="${iduser}" AND idstr="${idstr}"`, function(error, results, fields){
                 let grade='';
             res.render(namestr,{view,name,user:result,classotziv,grade,button,count_grades,number_users,click_for_re,idstr,review,resultstr});
             })
         }
         }
             })
             })
         })
 
     }
     else{
        const teg='<a href="/auth">Войти</a>';
        if(resultsc.length!==0 && resultsn.length!==0){
         count_grades=resultsc[0].grades.toFixed(1);
         number_users=resultsn[0].number_users;
         console.log("Нужно войти");
         const view="none"; //если 0, то форма отзыва не будет показываться
         const name='';
         const user='';
         const grade='';
         click_for_re='noclick_for_re';
         const classotziv='nootziv';
         const button='Оценить тайтл ';
        res.render(namestr,{view,name,user:user,classotziv,grade,button,number_users,count_grades,click_for_re,idstr,review,teg,resultstr});
     }
     else{ count_grades='';
     number_users='';
         console.log("Нужно войти");
         const view="none"; //если 0, то форма отзыва не будет показываться
         const name='';
         const user='';
         const grade='';
         const click_for_re='noclick_for_re';
         const classotziv='nootziv';
         const button='Оценить тайтл ';
         res.render(namestr,{view,name,user:user,classotziv,grade,button,number_users,count_grades,click_for_re,idstr,review,teg,resultstr});}
     }
 })
 })
})
})

// fs.writeFileSync("templates/info01.ejs",'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><link rel="stylesheet" href="CSS/style.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous"><script src="https://code.jquery.com/jquery-3.6.4.min.js"></script></head><body><div class="header-backgraund" id="header-backgraund"><header class="header wrapper container"><div class="header__nav"><div class="home"><div class="homes"><a href="/index" class="home">Название сайта</a></div><span class="spheader"><ul><li><a href="#">Главная</a></li><li><a href="#">Фильмы</a></li><li><a href="#">Сериалы</a></li></span></div><a>Онлайн кинотеатр</a><div class="poisk"><input type="text" placeholder="Поиск" style="text-align: center;" class="spisok"><div class="containerspisok"><article><a>Тест</a><a>Пример</a></article></div><ul class="vibor"><li>Тест</li><li>Пример</li><li>Пример</li><li>Пример</li><li>Пример</li><li>Пример</li><li>Пример</li><li>Пример</li><li>Пример</li></ul></div><a href="/auth">Войти</a></header></div></div><div></div></div><div class="main_div"><div class="main_div_2"><div style="padding: 40px 0 60px;"><img class="main_div_img" src="img/Sukuna Icon 450.jpg"></div><div style="flex: 0 0 30px;width: 30px;"></div><div class="main_div_3"><div style="display: flex;"><!-- min-height: 100% --> <div style="padding: 40px 0 60px;position: relative;display: flex;flex-direction: column;"><div><div class="main_div_4"> <div style="margin-bottom: 48px;"><h1 style="margin-top: 0;margin-bottom: 12px;">Название(Год)</h1></div><div style="position: relative;width: 200px;"><button class="main_button">Буду смотреть</button></div></div></div></div>')
app.post('/checkreview',urlencodedParser, (reg,res)=>{
    const idstr=reg.body.idstr;
    const iduser=reg.body.iduser;
    const email=reg.body.mail;
    const name=reg.body.name;
    const otziv=reg.body.otziv;
    const zagolovok=reg.body.zagolovok;
    const typereview=reg.body.tip_title;
    console.log("Смотрим что выведит");
    console.log(idstr,iduser,email,name,otziv,typereview,zagolovok);

    connection.query(`SELECT * FROM review WHERE idusers="${iduser}"`, function(err,result,fields){
        console.log(result);
        if(result.length==0){
            const review =[idstr,iduser,zagolovok,typereview,otziv,name,email];
            const sql=("INSERT INTO review(idstr,idusers,zagolowok,typereview,otziv,nameuser,mailuser) VALUES(?,?,?,?,?,?,?)")
            connection.query(sql,review,function(err,resultse){
                if(err){ console.log(err);}
        else
        { console.log("Данные добавлены");
        res.redirect("/index");}
                  }) 
        }
        else{
            res.redirect("/index");
        }
    })
    
})
app.post('/grade',urlencodedParser,(reg,res)=>{
    const grade=reg.body.grade;
    const iduser=reg.body.iduser;
    const idstr=reg.body.idstr;
    console.log(grade);
    console.log(iduser);
    console.log("ИД страницы");
    console.log(idstr);
  
    connection.query(`SELECT idusers FROM users WHERE login = "${global.login}"`, function(error, resulte, fields){
        const id=resulte[0].idusers;
    connection.query(`SELECT grade FROM grade WHERE idusers ="${id}" `, function(error, result, fields){
        // const quility=1;
        // const quelit=[idstr,quility,grade];
        //     const connect ="INSERT INTO quelity_grade(idstr quility grades) VALUES(?,?,?)";
        //     connection.query(connect,quelit,function(err,results){
        //         if(err) console.log(err);
        // else
        // { console.log("Данные добавлены");}
       
//    let sum_users = 0;
// for (let i =0 ; i <quelit_users.length; i++){
//     sum_users =sum_users+ quelit_users[i];
// }z


if(result!==0 && result!=''&& result.length!==0){
            

    connection.query(`UPDATE grade SET grade=${grade} WHERE idusers="${id}"`);
}
else{
const otziv=[iduser,idstr,grade];
const sql = "INSERT INTO grade(idusers, idstr, grade) VALUES(?, ?, ?)";
connection.query(sql,otziv,function(err,results){
if(err) {console.log(err);}
else
{ console.log("Данные добавлены");}
})
}
connection.query(`SELECT grade FROM grade WHERE idstr="${idstr}"`, function(error, resultss, fields){
    console.log(resultss);
    let proverka=[];
    for(let j=0;j<resultss.length;j++){
         proverka[j]=resultss[j].grade;
    }
     console.log("татытаываа")
   console.log(proverka);
    let sum = 0;
for (let i =0 ; i <proverka.length; i++){
 sum =sum+ proverka[i];

}
console.log(sum);
let average = sum / proverka.length;
console.log(sum);
console.log(average); 
connection.query(`SELECT idusers FROM grade WHERE idstr="${idstr}"`, function(error, resultsse, fields){
let quelit_users=[];
console.log(resultsse)
for(let i=0;i<resultsse.length;i++){
quelit_users[i]=resultsse[i].idusers;
}
let sum_users=quelit_users.length;
console.log(sum_users);
console.log("Nsdada")
console.log(quelit_users);

console.log(sum_users)
console.log("все норм")
connection.query(`SELECT grades FROM itog_grades WHERE idstr="${idstr}"`, function(error, resultat, fields){
    connection.query(`SELECT number_users FROM itog_grades WHERE idstr="${idstr}"`, function(error, resultats, fields){
    console.log(resultat)
    console.log(resultats);
    console.log("выше укза")
    // const for_if=resultat[0].grades;
    if(resultat!==undefined &&resultat!==0 && resultat!=''&& resultat.length!==0 && resultats!==0 &&resultats!='' &&resultats.length!==0 && resultats!==undefined){
        console.log("Все норм");
        connection.query(`UPDATE itog_grades SET grades=${average}, number_users=${sum_users}  WHERE idstr="${idstr}"`);
        console.log("все норм");
             res.redirect("/index");
    }
    else{
        const grades=[idstr,average,sum_users];
const connect ="INSERT INTO itog_grades(idstr,grades,number_users) VALUES(?,?,?)";
connection.query(connect,grades,function(err,resultse){
            if(err){ console.log(err);}
    else
    { console.log("Данные добавлены");
    res.redirect("/index")
}

})
}
})
})
       
       
})
})
 })
})
})
})


   



// 
// 
app.get('/registr',urlencodedParser, (req,res)=>{
    res.render('registr.ejs',{errors:'',errore:''});
})
app.post('/registr',urlencodedParser,(req,res)=>{
    // res.render('check_registr.hbs');
    const mail=req.body.mail;
    const login=req.body.login;
    const password=req.body.password;
    const name=req.body.name;
    const test={
        login:req.body.login,
        mail:'body.mail',
    };
      connection.query(`SELECT mail FROM users WHERE mail="${mail}"`, function(error, result, fields){
        connection.query(`SELECT login FROM users WHERE login="${login}"`, function(error, results, fields){


        const persons=[];

        if(result==undefined &&results==undefined){
            console.log("Все норм");
        }
        else if(result.length==0 && results==0){
            //Здесь запись в БД
            const user=[login,password,name,mail];
            const sql = "INSERT INTO users(login, password, name, mail) VALUES(?, ?, ?, ?)";
            connection.query(sql,user,function(err,results){
                if(err) console.log(err);
                else
                { console.log("Данные добавлены");
                res.redirect('/auth');
            }
            });
        }
        else{
            if(result.length!==0 && results.length!==0){
                console.log("Дубликат маила");
                console.log("Дубликат Логина");
                res.render("registr.ejs", {errors:'данный маил уже зарегистрирован, используйте другой маил', errore:'Данный Логин уже Зарегистрирован, используйте другой логин'});
                
            }
            else if(result.length!==0){
            console.log("Дубликат маила");
            res.render("registr.ejs", {errors:'данный маил уже зарегистрирован, используйте другой маил', errore:''});
        }
        else{
            console.log("Дубликат Логина");
            res.render("registr.ejs", {errors:'', errore:'Данный Логин уже Зарегистрирован, используйте другой логин'});
        }
        }
        console.log(mail);
        console.log("Тест2");
        console.log(result);
        // console.log(a);
        // connection.end();
        })
    
    })
    
})
app.get('/auth',urlencodedParser, (reg,res)=>{
    res.render('auth.ejs',{errors:''});
})
app.get('/logout',(req,res) => {
    delete global.name;
    console.log(global.name);
    res.redirect('/index');
});
app.post('/auth',urlencodedParser,(req,res)=>{
    const login=req.body.login;
    console.log(login);
    const password=req.body.password;
    global.login=login;
    console.log("Тест авторизации")

    connection.connect(function(err){
             if (err) {
             return console.error("Ошибка: " + err.message);
             }
            else{
              console.log("Подключение к серверу MySQL успешно установлено");
            }
          });
          connection.query(`SELECT login, password FROM admin WHERE login="${login}" AND password="${password}"`, function(error, resultat, fields){
            if(resultat.length!==0){
                resultat[0].admin;
                global.admin=resultat;
                res.redirect("/admin");
            }
            else
        
        
          connection.query(`SELECT login, password FROM users WHERE login="${login}" AND password="${password}"`, function(error, result, fields){
            
        console.log(result);
        let userid;
        if(result.length==0)
        {
            console.log("Такого логина нет")
            res.render("auth.ejs", {errors:'Проверьте вводимые данные'});
        }
        else{
            connection.query(`SELECT name FROM users WHERE login="${login}" AND password="${password}"`, function(error, results, fields){
                connection.query(`SELECT idusers FROM users WHERE login="${login}" AND password="${password}"`, function(error, resultss, fields){
                console.log(results);
            let session=req.session;
            session.userid=results;
            global.name=session.userid;
            global.iduser=resultss;
            console.log(req.session)
            console.log(global.name)
              console.log(global.iduser);
            if(session.userid)
            {res.redirect('/index');
        }
        else{
            res.render("auth.ejs")
        }
        
    })
    })
}
    })
})
})
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/video");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
const storageConfigimg = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/img");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "video/mp4" || 
    file.mimetype === "video/webm"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 }
 const fileFilterimg = (req, file, cb) => {
  
    if(file.mimetype === "img/webm" || 
    file.mimetype === "img/jpg" || file.mimetype === "img/png"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 }
app.use(express.static(__dirname));
const for_video=(multer({storage:storageConfig,fileFilter: fileFilter}).single("filedata"));
const for_img=(multer({storage:storageConfigimg,fileFilterimg: fileFilterimg}).single("filedata"));
app.get('/admin',(reg,res)=>{
    res.render("admin.ejs");
})
app.get('/addtitle',(reg,res)=>{
    res.render("addtitle.ejs")
})
app.get('/addstr',(reg,res)=>{
    res.render("addstr.ejs")
})
app.post('/addstr',for_img,(reg,res, next)=>{

    // res.render("addstr.ejs")
    let filedata = reg.file.filename;
    const idtsr=reg.body.idstr;
    const namestr=reg.body.namestr;
    const nametitle=reg.body.nametitle;
    const agetitle=reg.body.agetitle;
    const countrytitle=reg.body.countrytitle;
    const genretitle=reg.body.genretitle;
    const agefortitle=reg.body.agefortitle;
    const raitingtitle=reg.body.raitingtitle;
    const timetitle=reg.body.timetitle;
    const abouttitile=reg.body.abouttitile;

    const mesto="templates/"+namestr+".ejs";
    console.log(mesto)
    

    console.log(idtsr,namestr,nametitle,agetitle,countrytitle,genretitle,agetitle,agefortitle,raitingtitle,timetitle,abouttitile);
    console.log(filedata);
    if(idtsr!==''&&namestr!==''&&nametitle!==''&&agetitle!==''&&countrytitle!==''&&genretitle!==''&&agefortitle!==''&&raitingtitle!==''&&timetitle!==''&&abouttitile!=='' && filedata!==undefined){
        connection.query(`SELECT * FROM str WHERE idstr="${idtsr}" AND namestr="${namestr}" AND nametitle="${nametitle}" AND agetitle="${agetitle}"AND countrytitle="${countrytitle}"AND genretitle="${genretitle}"AND agefortitle="${agefortitle}"AND raitingtitle="${raitingtitle}"AND timetitle="${timetitle}" AND abouttitile="${abouttitile}" AND filedata="${filedata}"`, function(error, result, fields){
           console.log(result);
            if(result==undefined){
            const str=[idtsr,namestr,nametitle,agetitle,countrytitle,genretitle,agefortitle,raitingtitle,timetitle,abouttitile,filedata]
        const sql = "INSERT INTO str(idstr, namestr, nametitle, agetitle, countrytitle, genretitle, agefortitle, raitingtitle, timetitle, abouttitile, filedata) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(sql,str,function(err,results){
            if(err) console.log(err);
            else
            { console.log("Данные добавлены");
            fs.writeFileSync(mesto,'<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title> <link rel="stylesheet" href="CSS/style.css"> <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous"> <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script> </head> <body> <div class="header-backgraund" id="header-backgraund"> <header class="header wrapper container"> <div class="header__nav"> <div class="home"> <div class="homes"><a href="/index" class="home">Название сайта</a></div> <span class="spheader"> <ul> <li><a href="#">Главная</a></li> <li><a href="#">Фильмы</a></li> <li><a href="#">Сериалы</a></li> </ul> </span> </div> <a>Онлайн кинотеатр</a> <div class="poisk"> <input type="text" placeholder="Поиск" style="text-align: center;" class="spisok"> <div class="containerspisok"> <article> <a>Тест</a> <a>Пример</a> </article> </div> <ul class="vibor"> <li>Тест</li> <li>Пример</li> <li>Пример</li> <li>Пример</li> <li>Пример</li> <li>Пример</li> <li>Пример</li> <li>Пример</li> <li>Пример</li> </ul> </div> <%-teg %> <!-- <div class="backgraund"> --> </header> </div> </div> <div> </div> </div> <%for(let i=0;i<resultstr.length;i++) {%> <div class="main_div"> <div class="main_div_2"> <div class="div_for_img"><img class="main_div_img" src="img/<%=resultstr[i].filedata%>"></div> <div class="div_for_main_div_3"></div> <div class="main_div_3"><div style="display: flex;"> <!-- min-height: 100% --> <div class="div_for_main_div_4"><div> <div class="main_div_4"> <div class="div_fir_h1"> <h1 class="under_div_h1"><%=resultstr[i].nametitle%>(<%=resultstr[i].agetitle%>)</h1> </div> </div> </div> </div> <% }%> <!--  --> <div class="maii"> <div class="div_for_div"> <div> <div class="div_for_grade"> <span class="grade">Оценка <%=count_grades%></span> </div> <div style="display: flex;"> <span>Количество оценок <%=number_users%></span> </div> </div> </div> <div class="div_for_div_button"> <div class="div_for_button_grade"><button class="main_button" id="<%=classotziv %>"><%-button%> <%=grade%></button> </div> </div> <div class="div_style_button"> <form method="post" style="display: flex;" action="/grade"> <button class="style_button" name="grade" value="1">1</button> <button class="style_button" name="grade" value="2">2</button> <button class="style_button"name="grade" value="3">3</button> <button class="style_button"name="grade" value="4">4</button> <button class="style_button"name="grade" value="5">5</button> <button class="style_button"name="grade" value="6">6</button> <button class="style_button"name="grade" value="7">7</button> <button class="style_button"name="grade" value="8">8</button> <button class="style_button"name="grade" value="9">9</button> <button class="style_button"name="grade" value="10">10</button> <input type="hidden" id="idstr" name="idstr" value="<%=idstr%>"> <%for(var i=0; i<user.length;i++) { %> <input type="hidden"  class="form-control" name="iduser" id="iduser" value="<%=user[i].idusers%>"> <%} %> </form> </div> </div> </div> <%for(let i=0;i<resultstr.length;i++) {%> <div class="main_div_5"> <div style="display: block;padding-right: 9px;padding-left: 9px;"> <h3>О тайтле</h3> <div class="styles_row__da_RK"> <div class="styles_titleDark___tfMR styles_title__b1HVo">Год производства</div> <div><%=resultstr[i].agetitle%></div> </div> <div class="styles_row__da_RK"> <div class="styles_titleDark___tfMR styles_title__b1HVo">Страна</div> <div><%=resultstr[i].countrytitle%></div> </div> <div class="styles_row__da_RK"> <div class="styles_titleDark___tfMR styles_title__b1HVo">Жанр</div> <div><%=resultstr[i].genretitle%></div> </div> <div class="styles_row__da_RK"> <div class="styles_titleDark___tfMR styles_title__b1HVo">Рейтинг</div> <div><%=resultstr[i].raitingtitle%></div> </div> <div class="styles_row__da_RK"> <div class="styles_titleDark___tfMR styles_title__b1HVo">Возраст</div> <div><%=resultstr[i].agefortitle%></div> </div> <div class="styles_row__da_RK"> <div class="styles_titleDark___tfMR styles_title__b1HVo">Время</div> <div><%=resultstr[i].timetitle%></div> </div> </div> </div> </div> </div> </div> </div> <div style="    border-bottom: 1px solid hsla(0,0%,87%,.4); margin-bottom: 40px; box-sizing: border-box; width: 100%; max-width: 960px; margin-right: auto; margin-left: auto; padding-right: 10px; padding-left: 10px;"> <div style="font-family: Graphik Kinopoisk LC Web,Tahoma,Arial,Verdana,sans-serif;font-size: 16px;line-height: 1.38;color: #000;"> <p><%=resultstr[i].abouttitile%></p> </div> </div> <% }%> <div> <div style="margin-bottom: 40px; box-sizing: border-box; width: 100%; max-width: 960px; margin-right: auto; margin-left: auto; padding-right: 10px; padding-left: 10px; "> <h3>Отзывы</h3> <button class="<%=click_for_re%>"> Написать рецензию </button> <form action="/checkreview" method="post" class="<%=view %>" novalidate><%for(var i=0; i<user.length;i++) { %> <input type="hidden"  class="form-control" name="iduser" id="iduser"required value="<%=user[i].idusers%>"> <input type="hidden" class="form-control" name="mail" id="mail" required value="<%=user[i].mail%>"> <input type="hidden" class="form-control" name="name" id="name" required value="<%=name[0].name%>"><%} %> <input type="hidden" class="form-control" name="idstr" id="idstr" value="<%=idstr%>" required> <label>Выберите тип рицензии</label> <select id="titles" name="tip_title"> <option value="Нейтральная">Нейтральная</option> <option value="Отрицательная">Отрицательная</option> <option value="Положительная">Положительная</option> </select> <input type="text" class="form-control" name="zagolovok" id="zagolovok" required placeholder="Заголовок"> <input type="text" class="form-control" name="otziv" id="otziv" required placeholder="Ваше мнение"> <input type="submit" class="form-control" name="submit_re" id="submit_re" value="Отправить рецензию"> </form> <%for(let i=0;i<review.length;i++) {%> <section class="section_review"> <div class="style_review"> <div class="section_user_review"> <div > <img class="icon_user" src="<%=review[i].iconprofile%>"> </div> <div class="name_user_review"> <%=review[i].nameuser%> </div> </div> </div> <div class="style_review_otziv"> <h4><%=review[i].zagolowok%></h4> <div class="otziv_review"> <%=review[i].otziv%> </div> </div> </section> <%} %> </div> </body> </html> <script> $(".style_button").on("mouseover", function(){ $(".style_button").slice(0, $(".style_button").index(this)+1).addClass("style_button2"); }); $(".style_button").on("mouseout", function(){ $(".style_button").slice(0, $(".style_button").index(this)+1).removeClass("style_button2"); }); $(".main_button").click(function(){ $(".div_style_button").css("display","flex"); }); $(document).mouseup(function (e) { var container = $(".div_style_button"); if (container.has(e.target).length === 0){ container.hide(); } }); $("#nootziv").click(function(){ location.href ="/auth"; $(".div_style_button").css("display","none"); }); $(".click_for_re").click(function(){ $(".dont_none").show(); }); </script>')
            res.redirect('/addstr');
        }
        })
}
else{console.log("Данные уже есть в табличке")
res.redirect('/addstr');
}
})
    }
})
app.post("/addtitle",for_video, function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
const port = 3000;
app.listen(port, () =>{ //Порт по которому будем подключаться
    console.log("Сервер доступен"); 
})

