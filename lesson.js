

class Lesson {

    LessonType = null;
    Name = null;
    Author = null;
    Directory = '';
    Words = [];
    Version = null;

    ExamCount = 0;
    IsViewed = false;
    IsUpdated = false;
    History = {};

    LoadFromSource(source){
        if(this.Version == source.Version) return;

        this.LessonType = source.LessonType;
        this.Name = source.Name;
        this.Author = source.Author;
        this.Directory = source.Directory;
        
        this.Version = source.Version;
        this.ExamCount = source.ExamCount;
        this.IsUpdated = true;

        this.Words = [];

        this.Words = source.Words.map(((x) => { return {Answer : x.answer, Title : x.title, Synonyms : x.synonyms }}))

    }

}




Lesson.Types = {
    Eng: 'eng',
    Srb: 'srb'
}

Lesson.GetFromServer = function(){

    let lesson1 = {
        LessonType : 'eng',
        Name : 'Lesson 1',
        Directory : 'English.PreIntermediate.FirstLessons',
        Author : 'El Ege',
        Version : 1,
        Words : [
            {"answer":"end up","title":"закончить", synonyms:[] },
            {"answer":"do a favor","title":"делать одолжение", synonyms:[] },
            {"answer":"outgoing","title":"общительный", synonyms:[] },
            {"answer":"take up","title":"прихватить", synonyms:[] },
            {"answer":"alaugh","title":"смех", synonyms:["laugh"] },
        ]
    }

    let lesson2 = {...lesson1};
    lesson2.Name = 'lesson2'

    let lesson3 = {...lesson1};
    lesson3.Name = 'Lesson 3'
    lesson3.Group = 'Serbian.Starter.Pridevi'





    return [lesson1, lesson2, lesson3,

        English.Lesson1,
        English.Lesson2,
        English.Lesson3,
        English.Lesson4,
        English.Lesson5,
        English.Lesson6,
        English.Lesson7,
        English.Lesson8,
        English.Lesson9,
        English.Lesson10,
        English.Lesson11,
        English.Lesson12,
        English.Lesson13,

        Serbian.Lesson1,
        Serbian.Lesson2,
        Serbian.Lesson3,
        Serbian.Lesson4,
        Serbian.Lesson5,
        Serbian.Lesson6,
        Serbian.Lesson7,
        Serbian.Lesson8,

    ]
}
