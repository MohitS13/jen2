var express = require ("express");
var router = express();
var Joi = require("joi");
var config = require("config");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: config.get("host"),
    database: config.get("database"),
    user:config.get("user"),
    password:config.get("password")
});

connection.connect();
router.use(express.json());

router.get("/111",(request , response )=>{
    var queryText = "select * from employee";

    connection.query(queryText,(err, result)=>{
        if( err == null )
        {
            response.send(JSON.stringify(result));
        }
        else{
            response.send(JSON.stringify(err));
        }
    });
});



router.get("/:No",(request,response)=>{
    var queryTect = `select * from employee where No = ${request.params.No}`;
    connection.query(queryTect,(err,res)=>{
        if(err == null )
        {
            response.send(JSON.stringify(res));
        }
        else{
            response.send(JSON.stringify(err));
        }
    });
});


router.post("/",(request,response)=>{
    
    var validResult = Validation(request);
    if(validResult.error == null )
    {
        var No = request.body.No;
        var Name = request.body.Name;
        var Age = request.body.Age;

        var queryTest = `insert into employee values(${No},'${Name}',${Age})`;

        connection.query(queryTest,(err,result)=>{
            if ( err == null )
            {
                response.send(JSON.stringify(result));
            }
            else
            {
                response.send(JSON.stringify(err));
            }
        });
    }
    else{
        response.send(JSON.stringify(validResult.error));
    }

});


function Validation ( request )
{
    var validationschema = 
    {
        No: Joi.number().required(),
        Name: Joi.string().required(),
        Age: Joi.number().min(20).max(60).required(),
    };
    return Joi.validate(request.body,validationschema);

}


router.put("/:No",(request,response)=>{
    var No = request.params.No;
    var Name = request.body.Name;
    var Age = request.body.Age;

    var queryText = `update employee set Name='${Name}', Age=${Age} where No=${No}`;
    connection.query(queryText,(err,result)=>{
        if(err == null )
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }


    });
});


router.delete("/:No",(request,response)=>{
    var No = request.params.No;
    connection.query(`delete from employee where No=${No}`,(err,res)=>{
        if ( err == null)
        {
            response.send(JSON.stringify(res));
        }
        else
        {
            response.send(JSON.stringify(err));
        }


    });

});
module.exports = router;
