
const express =  require('express');
const mysql = require('mysql');

const app =  express();
const config=require('config');
const port=config.get("portno");

// app.use(function(request,response,next)=>
// {
//     
//     next();//move further...
// })

app.use((request,response,next)=>{
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Methods","*");
    response.setHeader("Access-Control-Allow-Headers","*");
    next();
})


//-------------it similar to app.use() method----------------
app.use(express.json());///  it is autometic call next()



app.get("/category", (request, response)=>
{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'manager',
        database : 'node'
      });
       
      connection.connect();
       
      connection.query('select * from category ', function (error, result) {
        if (error) 
        {
            response.send(error);
        }
        else
        {
            response.send(result)
        }
      });
       
      connection.end();
})

app.get("/product", (request, response)=>
{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'manager',
        database : 'node'
      });
       
      connection.connect();
       
      connection.query('select * from product ', function (error, result) {
        if (error) 
        {
            response.send(error);
        }
        else
        {
            response.send(result)
        }
      });
       
      connection.end();
})

app.post("/category", (request, response)=>
{

    console.log(request.body);
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'manager',
        database : 'node'
      });
       
      connection.connect();
       let query=`insert into category values(${request.body.Id},'${request.body.C_Name}', '${request.body.Description}', '${request.body.Status}')`;
       console.log(query);
      connection.query(query, function (error, result) {
        if (error) 
        {
            response.send(error);
        }
        else
        {
            response.send(result)
        }
      });
       
      connection.end();
    

})

app.post("/product", (request, response)=>
{

    console.log(request.body);
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'manager',
        database : 'node'
      });
       
      connection.connect();
       let query=`insert into product values(${request.body.Id},'${request.body.Name}', '${request.body.PackSize}', '${request.body.C_Name}','${request.body.Mrp}','${request.body.Img}','${request.body.Status}')`;
       console.log(query);
      connection.query(query, function (error, result) {
        if (error) 
        {
            response.send(error);
        }
        else
        {
            response.send(result)
        }
      });
       
      connection.end();
    

})




app.delete("/product/:Id", (request, response)=>{
    console.log(request.body);
    console.log(request.params.Id)// params will pass the parameter
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'manager',
        database : 'node'
      });
       
      connection.connect();

      let Id = parseInt(request.params.Id);

      let query = `delete from product where Id=${Id} `;

       console.log(query);
      connection.query(query, function (error, result) {
        if (error) 
        {
            response.send(error);
        }
        else
        {
            response.send(result)
        }
      });
       
      connection.end();
})

app.delete("/category/:Id", (request, response)=>{
    console.log(request.body);
    console.log(request.params.Id)// params will pass the parameter
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'manager',
        database : 'node'
      });
       
      connection.connect();

      let Id = parseInt(request.params.Id);

      let query = `delete from category where Id=${Id} `;

       console.log(query);
      connection.query(query, function (error, result) {
        if (error) 
        {
            response.send(error);
        }
        else
        {
            response.send(result)
        }
      });
       
      connection.end();
})

app.listen(port);