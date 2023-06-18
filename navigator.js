

class NavigatorClass{

    #menu
    #isMenuOpen

    #LessonInfo
    #LessonInfoName
    #LessonInfoLanguage
    #LessonInfoAuthor
    #LessonInfoStartButton


    #LessonResult
    #LessonResultName
    #LessonResultCount
    #LessonResultKnown
    #LessonResultAttempt
    #GlobalInfo


    #DirectoryPage
    #ExamPage
    
    #selectedLesson
    constructor(){
        this.#isMenuOpen = false

        this.#menu = document.getElementById('Menu');

        this.#DirectoryPage = document.getElementById('DirectoryPage');
        this.#ExamPage = document.getElementById('ExamPage');

        this.#LessonInfo = document.getElementById('LessonInfo');
        this.#LessonInfoName = document.getElementById('LessonInfoName');
        this.#LessonInfoLanguage = document.getElementById('LessonInfoLanguage');
        this.#LessonInfoAuthor = document.getElementById('LessonInfoAuthor');
    
        this.#LessonInfoStartButton = document.getElementById('LessonInfoStartButton');
     
        this.#LessonResult = document.getElementById('LessonResult');
        this.#LessonResultName = document.getElementById('LessonResultName');
        this.#LessonResultCount = document.getElementById('LessonResultCount');
        this.#LessonResultKnown = document.getElementById('LessonResultKnown');
        this.#LessonResultAttempt = document.getElementById('LessonResultAttempt');

        this.#GlobalInfo = document.getElementById('GlobalInfo');
        
    }


    OpenDirectory(){
        this.#DirectoryPage.style.display = 'block';
        this.#ExamPage.style.display = 'none';
    }

    ShowCurrentLesson(){
        this.OpenLessonInfo(this.#selectedLesson, true);
        this.ClickMenu()
    }

    CancelLesson(){
        this.#DirectoryPage.style.display = 'block';
        this.#ExamPage.style.display = 'none';
        this.ClickMenu()
    }

    CloseLesson(){
        this.#DirectoryPage.style.display = 'block';
        this.#ExamPage.style.display = 'none';
    }

    OpenLessonInfo(lesson, hideStartButton){
        this.#selectedLesson = lesson;

        this.#LessonInfo.style.display = 'block';
        this.#LessonInfoName.value = lesson.Name
        this.#LessonInfoLanguage.value = lesson.LessonType;
        this.#LessonInfoAuthor.value = lesson.Author;

        if (hideStartButton === true){
            this.#LessonInfoStartButton.style.display = 'none';
        }else {
            this.#LessonInfoStartButton.style.display = 'block';
        }
    }

    OpenLessonResult(exam){
        this.#LessonResult.style.display = 'block';
        this.#LessonResultName.value = exam.ResultName
        this.#LessonResultCount.value = exam.ResultCount;
        this.#LessonResultKnown.value = exam.ResultKnownWords;
        this.#LessonResultAttempt.value = exam.ResultAttempts;
    }

    CloseLessonResult(){
        this.#LessonResult.style.display = 'none';
        this.CloseLesson();
    }

    CloseLessonInfo(){
        this.#LessonInfo.style.display = 'none';
    }

    StartLesson(){
        this.currentExam   = new Exam(this.#selectedLesson);
        this.currentExam.Start();

        this.#DirectoryPage.style.display = 'none';
        this.#ExamPage.style.display = 'block';
        
        this.CloseLessonInfo();
    }

    ClickCommit(){
        if (this.currentExam) {
            this.currentExam.Commit()
        }
    }
    
    ClickTip(){
        this.currentExam.ShowTip()
    }

    ClickMenu(){
        if (this.#isMenuOpen === true){
            this.#menu.style.display = 'none';
            this.#isMenuOpen = false
        }
        else {
            this.#menu.style.display = 'block';
            this.#isMenuOpen = true
        }
    }

    ShowInfo(){
        this.#GlobalInfo.style.display = 'block';
    }

    CloseInfo(){
        this.#GlobalInfo.style.display = 'none';
    }

}

var Navigator = null;
window.addEventListener('load', function(){
    Navigator = new NavigatorClass();
});


window.addEventListener("keypress", function(e) {
    if(e.code === 'Enter') {
        Navigator.ClickCommit()
    }
    if(e.code === 'Backquote') {
        Navigator.ClickTip()
    }});

