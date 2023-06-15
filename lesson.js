

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
    CurrentProgress = null;
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
        this.CurrentProgress = null;

        this.Words = source.Words.map(((x) => { return {Answer : x.answer, Title : x.title, Synonyms : x.synonyms }}))

    }

    StartExam() {
        this.CurrentProgress = new CurrentProgress(this);
        return this.CurrentProgress;
    }

}

class CurrentProgress{
    constructor(lesson){
        this.Attempt = 0;
        this.Words = lesson.Words;
        this.Shuffle();


    }


    Start(){
        ++this.Attempt;

        this.Failed = [];


    }

    Shuffle(){
        let source = this.Words;
        this.Words = []
        let wordsCount = source.lenght;
        for(let i = wordsCount; i > 0; i++){
            let number = Math.round(Math.random() * (wordsCount - 1));
            var removed = source.splice(number, 1);
            this.Words.push(removed);
        }
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
            {"answer":"alaugh","title":"смех", synonyms:[] },
            {"answer":"temple","title":"храм", synonyms:[] },
            {"answer":"atempt","title":"попытка", synonyms:[] },
            {"answer":"fog","title":"туман", synonyms:[] },
            {"answer":"pupil","title":"ученик", synonyms:[] },
            {"answer":"wind up","title":"выбешивать", synonyms:[] },
            {"answer":"sparkling water","title":"газированная вода", synonyms:[] },
            {"answer":"family information","title":"кем приходится", synonyms:[] },
            {"answer":"fire","title":"уволить", synonyms:[] },
            {"answer":"more over","title":"кроме того", synonyms:[] },
            {"answer":"godfather","title":"крестный отец", synonyms:[] },
            {"answer":"sleigh","title":"санки", synonyms:[] },
            {"answer":"equip","title":"оборудовать", synonyms:[] },
            {"answer":"fella","title":"парень", synonyms:[] },
            {"answer":"tail","title":"хвост", synonyms:[] },
            {"answer":"due to","title":"из -за", synonyms:[] },
            {"answer":"anniversary","title":"годовщина", synonyms:[] },
            {"answer":"doubt","title":"сомнение", synonyms:[] },
            {"answer":"gooddamnit","title":"проклятье", synonyms:[] },
            {"answer":"go badly","title":"плохо кончится", synonyms:[] },
            {"answer":"blame","title":"вина", synonyms:[] },
            {"answer":"long ago","title":"давно", synonyms:[] },
            {"answer":"rattlesnake","title":"гремучая змея", synonyms:[] },
            {"answer":"deprecate","title":"осуждать", synonyms:[] },
            {"answer":"turtleneck","title":"водолазка", synonyms:[] },
            {"answer":"lace","title":"шнуровать", synonyms:[] },
            {"answer":"cave","title":"пещера", synonyms:[] },
            {"answer":"albeit","title":"хотя", synonyms:[] },
            {"answer":"fiance","title":"жених", synonyms:[] },
            {"answer":"weapon","title":"Оружие", synonyms:[] },
            {"answer":"obviously","title":"очевидно", synonyms:[] },
            {"answer":"encourage","title":"призывать", synonyms:[] },
            {"answer":"nephew","title":"племянник", synonyms:[] },
            {"answer":"japanese","title":"японский язык", synonyms:[] },
            {"answer":"five first","title":"пять первых", synonyms:[] },
            {"answer":"still water","title":"тихая вода", synonyms:[] },
            {"answer":"graduated from","title":"окончить что-либо", synonyms:[] },
            {"answer":"guilty","title":"виновный", synonyms:[] },
            {"answer":"fluent","title":"плавный", synonyms:[] },
            {"answer":"bother","title":"беспокоить", synonyms:[] },
            {"answer":"chair person","title":"председатель", synonyms:[] },
            {"answer":"eventually","title":"однажды (ожидаемо)\t", synonyms:[] },
            {"answer":"drive out","title":"выезжать", synonyms:[] },
            {"answer":"effort","title":"усилие", synonyms:[] },
            {"answer":"mother-in-law","title":"тещя, свекровь", synonyms:[] },
            {"answer":"look forward","title":"с нетерпением ждать", synonyms:[] },
            {"answer":"hurry","title":"торопиться", synonyms:[] },
            {"answer":"tie","title":"шнурки", synonyms:[] },
            {"answer":"meet up","title":"встретиться", synonyms:[] },
            {"answer":"chin","title":"подбородок", synonyms:[] },
            {"answer":"lack","title":"отсутствие", synonyms:[] },
            {"answer":"zip","title":"молния", synonyms:[] },
            {"answer":"imply","title":"подразумевать", synonyms:[] },
            {"answer":"rowing","title":"гребля", synonyms:[] },
            {"answer":"for a while","title":"какое-то время", synonyms:[] },
            {"answer":"niece","title":"племянница", synonyms:[] },
            {"answer":"here and there","title":"там-сям", synonyms:[] },
            {"answer":"introduce","title":"представление, знакомство", synonyms:[] },
            {"answer":"spatial perception","title":"пространственное восприятие", synonyms:[] },
            {"answer":"fancing","title":"фехтование", synonyms:[] },
            {"answer":"fluency","title":"беглость", synonyms:[] },
            {"answer":"food poisoning","title":"пищевое  отравление", synonyms:[] },
            {"answer":"down to earth","title":"приземленный", synonyms:[] },
            {"answer":"maternal","title":"материнский", synonyms:[] },
            {"answer":"obtain","title":"получить", synonyms:[] },
            {"answer":"vehicle","title":"транспортное средство", synonyms:[] },
            {"answer":"within","title":"в рамках", synonyms:[] },
            {"answer":"slurp","title":"хлебать, чавкать", synonyms:[] },
            {"answer":"brief","title":"краткий", synonyms:[] },
            {"answer":"though","title":"хотя", synonyms:[] },
            {"answer":"distantly","title":"отдалённо", synonyms:[] },
            {"answer":"the further the more","title":"дальше больше", synonyms:[] },
            {"answer":"detrimental","title":"вредный", synonyms:[] },
            {"answer":"accuracy","title":"точность", synonyms:[] },
            {"answer":"grass","title":"трава", synonyms:[] },
            {"answer":"extensively","title":"масштабно", synonyms:[] },
            {"answer":"among","title":"среди", synonyms:[] },
            {"answer":"blind","title":"слепой", synonyms:[] },
            {"answer":"examine","title":"исследовать", synonyms:[] },
            {"answer":"embroider","title":"вышивать", synonyms:[] },
            {"answer":"get on","title":"ладить", synonyms:[] },
            {"answer":"apart from","title":"помимо", synonyms:[] },
            {"answer":"caveman","title":"пещерный человек", synonyms:[] },
            {"answer":"go grey","title":"седеть", synonyms:[] },
            {"answer":"acquired","title":"приобретенный", synonyms:[] },
            {"answer":"thesaurus","title":"тезаурус", synonyms:[] },
            {"answer":"rush","title":"спешить", synonyms:[] },
            {"answer":"aim","title":"цель", synonyms:[] },
            {"answer":"plenty of","title":"дохера", synonyms:[] },
            {"answer":"stepfather","title":"отчим", synonyms:[] },
            {"answer":"responsibility","title":"обязанность, ответственность", synonyms:[] },
            {"answer":"be crazy out","title":"взбеситься", synonyms:[] },
            {"answer":"fiancee","title":"невеста", synonyms:[] },
            {"answer":"fever","title":"лихорадка", synonyms:[] },
            {"answer":"take after","title":"уродиться, synonyms:[] "}
        ]
    }

    let lesson2 = {...lesson1};
    lesson2.Name = 'lesson2'

    let lesson3 = {...lesson1};
    lesson3.Name = 'Lesson 3'
    lesson3.Group = 'Serbian.Starter.Pridevi'

    return [lesson1, lesson2, lesson3]
}