

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

    return [lesson1, lesson2, lesson3]
}