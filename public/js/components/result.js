function ResultActivity() {
    //get current lesson
    function render() {
        let html = '';
        const sumAnswers = init.correctAnswers + init.incorrectAnswers;
        let mark;
        if (sumAnswers == 0) {
            mark = 0;
        } else {
            mark = Math.round(init.correctAnswers / sumAnswers *10);
        }

        html += `
        <div style="text-align:center; font-size: 2em; margin-top:20px;">
            <p class="result-detail mark">Mark: ${mark}/10</p>
            <p class="result-detail total">Total: ${sumAnswers}</p>
            <p class="result-detail correct">Correct: ${init.correctAnswers}</p>
            <p class="result-detail incorrect">Incorrect: ${init.incorrectAnswers}</p>
            <button class="btn btn-back">Back</button>
        </div>
        `;

        document.querySelector("#root").innerHTML = html;
    }

    function eventsHandler() {
        //click back to back to main page
        $(".btn-back").onclick = () => {
            init.index = -1, //index of a course
            init.id = 0, // index of a word
            init.correctAnswers =0;
            init.incorrectAnswers =0;
            intent(MainActivity);
        }
    }

    return {
        run() {
            render();
            eventsHandler();
        }
    }
}