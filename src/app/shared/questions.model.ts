export interface Question {
    type: string;
    text: string;
}

export interface NumQuestion extends Question {
    min: number;
    max: number;
}

export interface SelectQuestion extends Question {
    options: string[];
}
export interface MultiSelectQuestion extends Question {
    option: string[];
    max: number;
}

export interface YesNo extends Question {
    question: string;
    answer: string;
    index: number;
}

export interface INumberAnswer {
    question: string;
    answer: number;
    index: number;
}

export interface ISelectAnswer {
    question: string;
    answer: string;
    index: number;
}

export interface IMultiSelectAnswer {
    question: string;
    answer: string[];
    index: number;
}

export interface IYesNoAnswer {
    question: string;
    answer: string;
    index: number;
}

export interface IQuestionAndAnswer {
    question: string;
    answer: number | string | number[] | string[];

}



