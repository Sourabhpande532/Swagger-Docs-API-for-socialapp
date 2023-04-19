const express = require("express");
const app = express();
var format = require('date-format');

// swagger docs related
const swaggerUi = require('swagger-ui-express');
// Load swagger from yaml file instead json. the whole code is from yaml 
//https://www.npmjs.com/package/swagger-ui-express

const fs = require("fs")
const YAML = require('yaml');
const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.get("/", (req,res)=>{
    res.status(200).send("<h1>Hellow from Saurabh's zone </h1>")
});



/*Inside Part::
* befour we create a response let's go ahead & create social Object this
  one can act as a JSON.
* Next One goal this(date: Date.now()) date is ok but it's not useable So i need to learn how can i modify this
  Date that it's much more use able. so we need to convert in proper fomate this one "date": 1679915291976 as of
  now it gave me Number. let further fix it. 
* next goal How am i gonna do this /api/v4  & it should return immediately.
  it mean simply as per the diagram mention last route if you observe hint(return whatever in the url) we'r gonna
  extract info from there in the form of params.


*********************------*************************
* 2nd goal Let's gonna fix that nextOne Date Part.
  inside object=>
  📶date:Date.now() //3434343443 give only no. surly further it convert into actually date.
  we can also use the constructor of is see belew
  📶date: new Date() //"2023-03-28T10:49:18.149Z"(not in proper formate want in "proper" yaa there
  is some locals string that convert into proper way but sometimes overwhelmed it provide limited option)
  📶probably don't use moment.js https://www.npmjs.com/package/moment
    it's lagacy policy.
  📶it very lightweight & size is small as well 
     https://www.npmjs.com/package/date-format


*********************------*************************
 3rd goal
 parameter & bugs and routes. 
 the final thing we'r gonna see that as per the diagram requirement we did all stuff
 one things is remain that is tricky to understand that is /api/any/x mention msg(hint) we need to 
 return whatever in the url pulling some info'n from it. whatever user mention it can be /name,it can be
 /:id, /:token , this (:) always pass o.w throw error. whatever the user say we've to actually go ahead &
 return it to back to backend.
 if you do a little bit research anything that's coming it up from url /api/any/here this has a lot of name
 Notice this: your URL look like something like this e.g https://lco.dev/tokenorparameter?price=23

 and here is some specific name some like this instead 'token' something there routes,parameter
 so, we'r talking about parameters How we can return exact parameters that is given to me in URL 
 back to the user don't know that we'll take help of express docs 🖇️https://expressjs.com/en/4x/api.html#req
 explore req.path, req.params, req.querry(we get all the things after Question mark ?)
 if you want to grab params we need pass this /: colon compulsary o.w throw error feel free to add anything like
 /:id, /:token, /:any for grab surly we'll discuss further there are couple of ways.

 we actually broke our applicatio you write instagram you get on postaman in form of {params:instagram}
 so this exactly happend in backend development that you've build something & broke something 
 */

//params
app.get("/api/v1/:token", (req,res)=>{
  // console.log(req.params.id);
  //Or want to access id use above or want to access name use belew one. one task happened at one time
  console.log(req.params.token);
  res.status(200).json({params:req.params.token})
})

// go and postman put some value on serch bar


// Instagram
app.get("/api/v1/instagram", (req,res)=>{
const instaSocial = {
    userName: "Saurabh_code",
    followers: 130,
    follows: 70,
    date: Date.now(),//"date": 1679915291976 befour one
}    
// res.status(200).json({instaSocial})
res.status(200).json(instaSocial)
})

// Linkedenn
app.get("/api/v1/linkeden", (req,res)=>{
    const linkedenSocial = {
        userName: "Sourabh pande",
        followers: 77,
        follows: 140,
        date: format.asString("dd[MM]-hh:mm:ss", new Date()),
        
    }    
    // res.status(200).json({instaSocial})
    res.status(200).json({linkedenSocial})
    })

// facebook
app.get("/api/v1/facebook", (req,res)=>{
    const FaceBookSocial = {
        userName: "Sourabh pande",
        followers: 123,  
        follows: 148,
        // date: new Date(),//"date": "2023-03-27T11:22:56.656Z" Not in proper formate
        date: format.asString("dd[MM]-yyyy-hh:mm:ss.SSS", new Date()),

    }    
    // res.status(200).json({instaSocial})
    res.status(200).json(FaceBookSocial)
    }) 
    




const port = 4000 || process.env.port;
app.listen(port, ()=>{
    console.log(`The port is runnning on http://localhost:${port}/api-docs`)
})