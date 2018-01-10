const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});

app.set('view-engine', 'hbs');

app.use((req,res,next)=>{
	var now  = new Date().toString();
	var log = '${now}: ${req.method} ${req.url}';
    console.log(log);
    fs.appendFile('server.log',log+'\n');

    next();


});

// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res)=> {

	//res.send('Hello World');
	res.render('home.hbs',{
		msg: 'Welcome Home !! This is express web server',
		pageType : 'Home Page',
		

	});
});

app.get('/about', (req, res)=>{
	//res.send("My first node js server");
	res.render('about.hbs',{
		msg : 'You will find some more information here',
		pageType : 'About Page',
		
	});

});


app.get('/bad',(req,res)=>{
	res.send({
		Error: 'Something went wrong'
	});
});




app.listen(3000,()=>{
	'Server is up and running!!!'
});


