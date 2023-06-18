function StartUp() {
    LessonHolder.Get()
    RenderDirectory()
}

window.addEventListener('load', StartUp)

function RenderDirectory() {
    var directory = LessonHolder.Get().Directory
    var directodyNode = document.getElementById('LessonDirectory')
    RenderDirectoryNode(directodyNode, directory.Childrens)
}

function RenderDirectoryNode(ulNode, childrenItems) {
    if (!Array.isArray(childrenItems)) return

    for (var i in childrenItems) {
        let item = childrenItems[i]
        if (item.IsLesson !== true && item.IsLesson !== false) continue
        let li = document.createElement('li')
        ulNode.appendChild(li)
        if (item.IsLesson) {
            li.innerHTML = item.Title
            li.dataset.lessonname = item.Lesson.Name
            li.addEventListener('click', () => Navigator.OpenLessonInfo(item.Lesson))
        } else {
            let span = document.createElement('span')
            span.innerText = item.Title
            span.classList.add('explorer__item')

            span.addEventListener('click', (e) => {
                li.dataset.collapse = li.dataset.collapse === '1' ? '0' : '1'
            })
            li.appendChild(span)
            li.dataset.collapse = '0' //"1"

            if (Array.isArray(item.Childrens)) {
                let ul = document.createElement('ul')
                li.appendChild(ul)
                RenderDirectoryNode(ul, item.Childrens)
            }
        }
    }
}

function OnLessonClick(lesson) {
    console.log('Click on ', lesson)
}

class LessonHolder {
    Lessons = []
    Directory
    constructor() {
        this.Directory = this.CreateDirectory('Root')
        var savedJson = localStorage.getItem('lessonHolder')
        if (savedJson) {
            var savedLessonHolder = JSON.parse(savedJson)
            this.Lessons = savedLessonHolder.Lessons || []
        } else {
            this.Lessons = []
        }
    }

    CreateDirectory(title) {
        return {
            Title: title,
            IsLesson: false,
            IsHidden: false,
            IsNew: false,
            Lesson: null,
            Childrens: [],
        }
    }

    CreateLessonInDirectory(lesson) {
        return {
            Title: lesson.Name,
            IsLesson: true,
            IsHidden: false,
            IsNew: false,
            Lesson: lesson,
            Childrens: [],
        }
    }

    Save() {}

    AddToGroup(lesson) {
        var pathParts = lesson.Directory.split('.')

        if (pathParts.length == 1) {
            this.Directory.Childrens[pathParts[0]] = CreateLessonInDirectory(lesson)
        }

        var base = this.Directory

        for (let i = 0; i < pathParts.length; i++) {
            let part = pathParts[i]
            if (!base.Childrens[part]) {
                base.Childrens[part] = this.CreateDirectory(part)
            }
            base = base.Childrens[part]
        }
        base.Childrens[lesson.Name] = this.CreateLessonInDirectory(lesson)
    }

    UpdateFromServer() {
        console.log('serverData')

        var serverData = Lesson.GetFromServer()
        if (Array.isArray(serverData)) {
            for (var sourceLesson of serverData) {
                if (!this.Lessons[sourceLesson.Name]) {
                    this.Lessons[sourceLesson.Name] = new Lesson()
                }
                this.Lessons[sourceLesson.Name].LoadFromSource(sourceLesson)

                this.AddToGroup(this.Lessons[sourceLesson.Name])
            }
        } else {
            console.warn('Serrver got something wrong')
        }
    }
}

LessonHolder.SingletonObject = null
LessonHolder.Get = function () {
    if (LessonHolder.SingletonObject) return LessonHolder.SingletonObject
    LessonHolder.SingletonObject = new LessonHolder()
    LessonHolder.SingletonObject.UpdateFromServer()
    return LessonHolder.SingletonObject
}
