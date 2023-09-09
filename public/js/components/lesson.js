function LessonActivity() {
    //get current lesson
    const course = init.courses[init.index];
    function render() {
        let html = '';


        //render current lesson
        html += '<button class="btn btn-back back-main">Back</button>';
        html += '<video controls id="myslide" src="" type="video/mp4"></video>';
        html += '<button id="btn-complete" class="btn">Complete</button>';

        document.querySelector("#root").innerHTML = html;
    }

    function eventsHandler() {
        //set src for the video
        $('#myslide').setAttribute('src', course.src);

        //click button back to go back the main page
        $('button.btn.btn-back').onclick = () => {
            intent(MainActivity);
        }

        //click button complete to go to the next page - vocabularies
        $('#btn-complete').onclick = () => {
            intent(VocabActivity);
        }

    }
    
    return {
        run() {
            render();
            eventsHandler();
            this.startTest();
        },
        //click button take a quiz to start the test
        startTest() {
            $("#btn-test").onclick = () => {
                init.id = 0;
                $("#btn-test").style.display = 'none';
                intent(TestActivity);
            }
        }
    }
}