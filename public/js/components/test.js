function TestActivity() {
    const contents = ['word', 'meaning'];
    const thisWord = init.courses[init.index].words[init.id];
    let prev = undefined;

    const answers = init.courses[init.index].words.map((word) => {
        if (word !== thisWord) {
            return {
                word : word.word,
                meaning : word.meaning,
            }
        }
    })
    
    function render() {
        let html = '<div style="text-align:center;">';
        const type = contents.splice(Math.round(Math.random()),1)[0];
        const typeQ = contents[0];
        const answer = { ...thisWord , isAnswer: true};
        const questions = [answer];

        //set content
        html += `<h1>${thisWord[type]}</h1>`;

        //random questions
        for (let i = 0; i < 3; i++) {
            let question = undefined;
            do {
                question = answers[Math.floor(Math.random() * answers.length)];
            } while (questions.includes(question) || question === undefined);
            questions.push(question);
        }

        //randomize questions
        questions.sort(() => Math.random() - 0.5);

        //render questions
        questions.forEach(question => { 
            html += `
                    <div class="btn answer" data-answer="${question.isAnswer? "1": "0"}">
                        ${question[typeQ]}
                    </div>`;
        });

        html += `
            <button class="btn btn-next">Next</button>
        </div>`;

        document.querySelector("#root").innerHTML = html;
    }

    function eventsHandler() {
        //select answer
        $$(".answer").forEach(element => {
            element.onclick = () => {
                if (prev != undefined) {
                    prev.classList.remove("active");
                } 
                prev = element;
                prev.classList.add("active");
            }
        });


        //click button next to the next question
        //check the answer
        //if not have next question, so result
        $(".btn-next").onclick = () => {
            if (prev == undefined) {
                alert("Please select one of the following answers");
            } else {
                //check the answer
                console.log(prev.dataset.answer);
                if (prev.dataset.answer == 1) {
                    init.correctAnswers++;
                } else {
                    init.incorrectAnswers++;
                }
                //go to next question
                init.id++;
                if (init.id > init.courses[init.index].words.length -1) {
                    init.id = 0;
                    intent(ResultActivity);
                } else {
                    intent(TestActivity);
                }
            }
        }


    }
    
    return {
        run() {
            render();
            eventsHandler();
        }
    }
}