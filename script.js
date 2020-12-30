let displayCol = document.getElementById("display-col")

async function getQuestion(){
    let request = await fetch('http://localhost:1234/qandoption')
    let quesArray = await request.json()
    console.log(quesArray);

    displayHTML(quesArray);
}

getQuestion();


displayHTML = (quesArray) => {

    console.log(quesArray)

    quesArray.forEach(question => {

        let divRow = document.createElement('div');
        divRow.classList.add('row')
        divRow.innerHTML = 
            
            `<div class="row">` +
            `<div class="col-12">` +
            `<p class="question"> ${question.statement}</p>` +
            `<p class="option-p"><button class="btn btn-primary option-btn" value = "${"option1"+'##'+question.id}">A</button>${question.option1}</p>` +
            `<p class="option-p"><button class="btn btn-primary option-btn" value = "${"option2"+'##'+question.id}">B</button>${question.option2}</p>` +
            `<p class="option-p"><button class="btn btn-primary option-btn" value = "${"option3"+'##'+question.id}">C</button>${question.option3}</p>` +
            `<p class="option-p"><button class="btn btn-primary option-btn" value = "${"option4"+'##'+question.id}">D</button>${question.option4}</p>` +
            `</div>` +
            `</div>` +
            `</div>` 
        
        displayCol.appendChild(divRow);
    })


    optionBtns = document.querySelectorAll('.option-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            value = e.target.value.split('##')[0];
            quesID = e.target.value.split('##')[1];
            // console.log(quesID);

            fetch("http://localhost:1234/answer", {
                headers: {
                    'Content-Type': 'application/json'
                  },
                method: "POST",
                body: JSON.stringify({
                    'quesID': quesID,
                    "selectedOption":value
                }),
            })
            .then(response => response.json())
            .then(output => console.log(output))
            .catch(err => console.log(err))
        })
    })


    // mainContainer.innerHTML = `${quesArray[0].statement}`

    // mainContainer.innerHTML = `<div class="row h-100 align-items-center">` +
    //     `    <div class="col-sm-12 col-lg-6 offset-lg-3 display-col">` +
    //     `        <div class="row">` +
    //     `            <div class="col-6">` +
    //     `            <p>Question ${5}/10</p>`+
    //     `           <div class="progress w-50">` +
    //     `                <div class="progress-bar my-progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" id="prog-inner-bar"></div>` +
    //     `            </div>` +
    //     `            </div>` +
    //     `           <div class="col-6 display-score">` +
    //     `            <p>Score</p>` +
    //     `            <p>${5}</p>`+
    //     `            </div>` +
    //     `        </div>` +
    //     `        <div class="row">` +
    //     `            <div class="col-12">` +
    //     `            <p class="question"> ${quesArray[0].statement}</p>` +
    //     `            <p class="option-p"><button class="btn btn-primary option-btn" value = "${quesArray[0].option1}">A</button>${quesArray[0].option1}</p>` +
    //     `            <p class="option-p"><button class="btn btn-primary option-btn" value = "${quesArray[0].option2}">B</button>${quesArray[0].option2}</p>` +
    //     `            <p class="option-p"><button class="btn btn-primary option-btn" value = "${quesArray[0].option3}">C</button>${quesArray[0].option3}</p>` +
    //     `            <p class="option-p"><button class="btn btn-primary option-btn" value = "${quesArray[0].option4}">D</button>${quesArray[0].option}</p>` +
    //     `            </div>`
    //     `        </div>`
    //     `    </div>`
    //     `</div>`

    // // document.getElementById('prog-inner-bar').style.width = String(questionCount.count * 10) + '%';


}
