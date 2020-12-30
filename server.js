const express = require('express');
const app = express();
// const date = require('date-and-time');
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());

app.listen(1234);

questionArray = [];

class Questions {

    statement=''
    option1 = ''
    option2 = ''
    option3 = ''
    option4 = ''
    correctAns = ''
    score = ''

    constructor( id, statement, option1, option2, option3,option4, correctAns, score){
        this.id = id;
        this.statement = statement
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.correctAns = correctAns;
        this.score = score;
    }

    isCorrect(choice){
        if(choice === this.correctAns){
            return this.score
        } else {
            return 0
        }
    }

}

app.get('/questions', function (req,res){
    res.json(questionArray);
})

app.get('/question/:ques_id', function (req,res){

    let ques = questionArray.find(ques => String(ques.id) == String(req.params.ques_id));
    console.log(req.params.ques_id)
    res.json(ques);
    
})

app.post("/", function(req, res){
    if(req.body.question == undefined){
        res.status(404).json({
            message: "Empty strings cannot be a question",
        })
    } else {

        quesTemp = new Questions((new Date()).getTime(), req.body.question,
            req.body.option1 || "",
            req.body.option2 || "",
            req.body.option3 || "",
            req.body.option4 || "",
            req.body.correctAns || "",
            req.body.score || "");
        questionArray.push(quesTemp);
        console.log(req.body)
        res.json({
            message: "Question Added"
        })
    }
})

app.put("/addoption/:ques_id", function(req,res){
    
    let ques = questionArray.find(ques => String(ques.id) == String(req.params.ques_id));
    // let ques = questionArray.find(ques => ques.id == req.params.ques_id);
    
    ques.option1 = req.body.option1;
    ques.option2 = req.body.option2;
    ques.option3 = req.body.option3;
    ques.option4 = req.body.option4;
    ques.correctAns = req.body.correctAns;
    ques.score = req.body.score;
    
    res.json({
        message: "Added options"
    })
    
})

app.get('/qandoption', function (req,res){
    let qandoption = []
    questionArray.forEach((quesObj) => {
        tempQ = {};
        console.log(quesObj);
        const { id, statement, option1, option2, option3, option4 } = quesObj;
        tempQ.id = id;
        tempQ.statement = statement;
        tempQ.option1 = option1;
        tempQ.option2 = option2;
        tempQ.option3 = option3;
        tempQ.option4 = option4;
        
        qandoption.push(tempQ)
        
    })
    
    res.json(qandoption)
    
})

app.post("/answer", function (req,res){
    
    quesID = req.body.quesID;
    selectedOption = req.body.selectedOption;
    let ques = questionArray.find(ques => String(ques.id) == String(quesID));

    let output = ques.isCorrect(ques[selectedOption]);

    res.json(output);

})

// app.post("/answer2", function (req,res){
    
//     quesID = req.body.quesID;
//     selectedOption = req.body.selectedOption;
//     let ques = questionArray.find(ques => String(ques.id) == String(quesID));

//     let output = ques.isCorrect(ques[selectedOption]);

//     res.json(output);

// })
