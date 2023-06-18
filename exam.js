class Exam {
    #TaskText
    #LessonProgressProgressBarGreen
    #LessonProgressProgressBarRed
    #LessonAttempt
    #LessonInput
    #ResultText
    #ResultSection

    #sourceLesson

    ResultName
    ResultCount
    ResultKnownWords
    ResultAttempts

    constructor(lesson) {
        if (lesson) {
            this.#sourceLesson = lesson
        }

        this.ResultName = lesson.Name
        this.ResultCount = lesson.Words.length

        this.#TaskText = document.getElementById('TaskText')
        this.#LessonProgressProgressBarGreen = document.getElementById('LessonProgressProgressBarGreen')
        this.#LessonProgressProgressBarRed = document.getElementById('LessonProgressProgressBarRed')
        this.#LessonAttempt = document.getElementById('LessonAttempt')
        this.#LessonInput = document.getElementById('LessonInput')

        this.#ResultText = document.getElementById('ResultText')
        this.#ResultSection = document.getElementById('ResultSection')
    }

    Start() {
        this.Words = [...this.#sourceLesson.Words]
        this.Attempt = 0

        this.NewRound(true)
    }

    NewRound(isFirstRound) {
        this.ResultAttempts = ++this.Attempt
        if (isFirstRound !== true) {
            this.Words = [...this.Failed]
        }
        this.Shuffle()

        this.Failed = []
        this.Done = []

        this.CurrentWordPosition = 0
        this.CurrentWordIsFail = false
        this.CurrentWord = this.Words[this.CurrentWordPosition]
        this.Render()
        this.#ResultSection.style.backgroundColor = 'wheat'
    }

    SelectNext() {
        this.CurrentWordIsFail = false
        if (++this.CurrentWordPosition > this.Words.length - 1) {
            if (this.Attempt === 1) {
                this.ResultKnownWords = this.Done.length
            }

            if (this.Failed.length > 0) {
                this.NewRound()
            } else {
                Navigator.OpenLessonResult(this)
            }
            return
        }

        this.CurrentWord = this.Words[this.CurrentWordPosition]
        this.Render()
    }

    Render(doNotClearInput) {
        if (!this.CurrentWord) {
            this.#TaskText.innerText = ''
            return
        }
        this.#TaskText.innerText = this.CurrentWord.Title

        let green = Math.round(100 * (this.Done.length / this.Words.length))
        this.#LessonProgressProgressBarGreen.style.width = green + '%'
        let red = Math.round(100 * (this.Failed.length / this.Words.length))
        this.#LessonProgressProgressBarRed.style.width = red + '%'

        this.#LessonAttempt.innerText = 'Круг ' + this.Attempt

        if (doNotClearInput !== true) {
            this.#LessonInput.value = ''
        }
    }

    Commit() {
        if (!this.CurrentWord) return

        let word = (this.#LessonInput.value || '').toLowerCase().trim()

        if (this.CurrentWord.Answer == word) {
            this.#ResultText.innerText = 'Правильно! ' + this.CurrentWord.Title + ' : ' + this.CurrentWord.Answer

            if (this.CurrentWordIsFail === false) {
                this.Done.push(this.CurrentWord)
            }
            this.#ResultSection.style.backgroundColor = '#d3fbdb'

            this.SelectNext()
        } else {
            for (var synonym of this.CurrentWord.Synonyms) {
                if (synonym === word) {
                    this.#ResultText.innerText = 'Нужен синоним'
                    this.#ResultSection.style.backgroundColor = 'yellow'
                    return
                }
            }

            this.#ResultText.innerText = 'Неправильно! '

            if (this.CurrentWordIsFail !== true) {
                this.Failed.push(this.CurrentWord)
                this.CurrentWordIsFail = true
            }
            this.#ResultSection.style.backgroundColor = '#ffa9a9'

            this.Render(true)
        }
    }

    ShowTip() {
        this.#ResultText.innerText = 'Подсказка: ! ' + this.CurrentWord.Title + ' : ' + this.CurrentWord.Answer
        if (this.CurrentWordIsFail !== true) {
            this.Failed.push(this.CurrentWord)
            this.CurrentWordIsFail = true
        }
        this.Render()
        this.#ResultSection.style.backgroundColor = 'wheat'
    }

    Shuffle() {
        let source = this.Words
        this.Words = []
        let wordsCount = source.length
        for (let i = wordsCount; i > 0; i--) {
            let number = Math.round(Math.random() * --wordsCount)
            var removed = source.splice(number, 1)
            this.Words.push(removed[0])
        }
    }
}
