const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express');

//Swagger documentation
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const fileUpload = require('express-fileupload')

let courses = [

    {
        id: 1,
        name:"React",
        price: 400

    },
    {
        id: 2,
        name:"Angular",
        price: 400
    },
    {
        id: 3,
        name:"Node",
        price: 400
    }

]

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(fileUpload())



app.get('/',(req,res)=>{
    res.send("Welcome to Lco")
})

app.get('/api/v1/lco',(req,res)=>{
    res.send("hello lco community")
})

app.get('/api/v1/lcoobject',(req,res)=>{
    res.send({id:4,name:"Java",price:600})
})

app.get('/api/v1/courses',(req,res)=>{
    res.send(courses)
})

app.get('/api/v1/mycourse/:courseId',(req,res)=>{
    const myCourse = courses.find(element => element.id == req.params.courseId)
    console.log("yes",myCourse);
    res.json(myCourse)
})

app.post('/api/v1/addcourse',(req,res) =>{
    console.log(req.body)
    courses.push(req.body)
    res.send(true)
})

app.get("/api/v1/coursequery", (req,res) => {
    let location = req.query.location;
    let device =  req.query.device;
    res.send({location, device});

});
app.post("/api/v1/courseupload", (req,res) => {
    const file = req.files.file
    let path = __dirname + "/images/" + Date.now() + ".jpg"
    

    file.mv(path, (err) =>{
        res.send(true)
    })

});

app.listen(4000,() =>{
    console.log("sever started at port 4000");
})
