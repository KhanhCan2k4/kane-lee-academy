function VocabActivity() {
    const course = init.courses[init.index];
    const thisWord = course.words[init.id];
    function render() {
        let html = '';

        html += `
            <div style="text-align:center;">
                <img src="" alt="Ảnh minh hoạ" class="vocab-img">
                <h1 class="vocab-word">${thisWord.word}
                    <span style="font-size: 0.5em;" class="vocab-type">${thisWord.type}</span>
                </h1>
                <p class="vocab-eg">${thisWord.example}</p>
                <button class="btn btn-voice">
                    <audio class="vocab-audio" controls src=""></audio>
                </button>
                <br>
                <br>
                <button class="btn btn-back">Back</button>
                <button class="btn btn-next">Next</button>
            </div>
        `;

        document.querySelector("#root").innerHTML = html;
    }

    function eventsHandler() {
        //set img
        $("img.vocab-img").setAttribute('src', thisWord.img);
        
        //set audio
        $("audio.vocab-audio").setAttribute('src', thisWord.src);

        //click button back to back the previous word
        // if not word previous, go back to the less page
        $("button.btn-back").onclick = () => {
            init.id--;
            if (init.id < 0) {
                init.id = 0;
                intent(LessonActivity);
            } else {
                intent(VocabActivity);
            }
        }

        //click button next to next word
        // if not word next, hide button next
        $("button.btn-next").onclick = () => {
            init.id++;
            if (init.id > course.words.length -1) {
                init.id--;
                $("button.btn-next").style.display = "none";
            } else {
                intent(VocabActivity);
                $("button.btn-next").style.display = "unset";
            }
        }

        //click button take a quiz to start the test
        LessonActivity().startTest();
    }

    return {
        run() {
            render();
            eventsHandler();
        }
    }
}