import { Injectable, OnInit } from '@angular/core';
import { Question, INumberAnswer, IMultiSelectAnswer, ISelectAnswer, IYesNoAnswer, IQuestionAndAnswer } from './questions.model';
import {  Observable } from 'rxjs';
import { Subject } from 'rxjs';

import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private questionsJson;
  private userAnswers;
  answersSubject = new Subject<INumberAnswer | IMultiSelectAnswer | ISelectAnswer | IYesNoAnswer>();
  loadAnswersSubject = new Subject<IQuestionAndAnswer[]>();
  myObservable = Observable.interval(1000);

  constructor() {
    this.initQuestions()
   
  }

  initQuestions() {
    this.questionsJson = {
      questions: [
        { type: 'number', text: "What's your age?", min: 0, max: 100 },
        { type: 'yesno', text: 'Do you bike?' },

        {
          type: 'select', text: "Where do you live?", options: [
            'Thessaloniki', 'Athens', 'Patra', 'Serres', 'Kozani'
          ]
        },
        { type: 'number', text: "How many pets you have?", min: 0, max: 20 },

        {
          type: 'multiselect', text: 'Select up to three hobbies that you enjoy', option: [
            'Footbal', 'Gaming', 'Canoe Kayak', 'Basketball', 'Puzzle games'
          ], max: 3
        },
        { type: 'yesno', text: 'Do you like traveling?' },
        {
          type: 'select', text: "Where do you live?", options: [
            'Thessaloniki', 'Athens', 'Patra', 'Serres', 'Kozani'
          ]
        },
        
        {
          type: 'multiselect', text: 'Select up to three hobbies that you enjoy', option: [
            'Footbal', 'Gaming', 'Canoe Kayak', 'Basketball', 'Puzzle games'
          ], max: 3
        }
      ]
    }
  }

  getQuestions() {
    return this.questionsJson;
  }

}
