function MainActivity() {
    function render() {
        let html = '';

        for (let i = 0; i < init.courses.length; i++) {
            const course = init.courses[i];
            html += '<button class="btn course" data-code="'+i +'">'+ course.title +'</button>';
        }

        document.querySelector("#root").innerHTML = html;
    }

    function eventsHandler() {
        //hide the button take a quize
        $("#btn-test").style.display = 'none';
        
        $$("button.btn.course").forEach(element => {
            element.onclick = () => {
                //set current id
                init.index = element.dataset.code;
                
                //unhide the button
                $("#btn-test").style.display = 'unset';

                //change page activity
                intent(LessonActivity);
            }
        });
    }

    return {
        run() {
            render();
            eventsHandler();
        }
    }
}