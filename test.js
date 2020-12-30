const date = require('date-and-time');

questionArray = [];

class Questions {

    statement='';
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

question1 = new Questions(JSON.stringify(new Date()),'what is capital of India?', "delhi", "", "","","","");

console.log(question1);



