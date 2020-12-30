const express = require ('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());

// app.get('/', function(req,res){
//     res.json({
//         message: "success"
//     })
// })

// app.get('/user', function(req,res){
//     res.status(200).json({
//         message: "User List"
//     })
// })

app.listen(3000);

let users = []

app.get("/users", (req,res)=> {
    res.json(users)
})

app.post("/user", (req,res)=> {
    if (req.body.name == undefined || req.body.email == undefined){
        res.status(404).json({
            message: "Incorrect Data input"
        })
    } else {

        req.body.id = users.length + 1;
        users.push(req.body)
        res.json({
            "message": "Created"
        })
    }

})


app.get('/user/:user_id', (req,res) => {


    let user = users.find( obj => obj.id == req.params.user_id);

    if(user){

        res.json(user);
    } else {
        res.status(404).json({
            message: 'User Not Found'})
    }

})

app.put('/user/:user_id', (req,res)=> {
    console.log(req.body)
    let userIndex = users.findIndex((obj) => obj.id == req.params.user_id)
    users[userIndex].name = req.body.name;
    users[userIndex].email = req.body.email;

    res.json({
        message: "User updated"
    })
})