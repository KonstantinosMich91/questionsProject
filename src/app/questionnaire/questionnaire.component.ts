import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../shared/questions.service';
import { Question, INumberAnswer, IMultiSelectAnswer, ISelectAnswer, IYesNoAnswer, IQuestionAndAnswer } from '../shared/questions.model';



@Component({
	selector: 'app-questionnaire',
	templateUrl: './questionnaire.component.html',
	styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
	questions: Question[]; 							//storage for all questions
	questionsWithAnswers: any[] = [];//array for all answers after onComplete() (temporary : any to pass the if condition in onComplete())      
	constructor(private questionsService: QuestionsService) {}

	ngOnInit() {
		this.questionsService.answersSubject.subscribe(//we subscribe to the changes of every input individually from questions components
			(newValue: INumberAnswer | IMultiSelectAnswer | ISelectAnswer | IYesNoAnswer) => {
				this.questionsWithAnswers[newValue.index] = { question: newValue.question, answer: newValue.answer };
			}
		)
		this.questions = this.questionsService.getQuestions();
	}

	onComplete() {
		console.log(this.questionsWithAnswers);
		if (this.questionsWithAnswers.length < this.questions['questions'].length) {
			alert('You must complete all the questions');
			return;
		}
		for (let i = 0; i < this.questionsWithAnswers.length; i++) {//if there is null in answers
			if (!this.questionsWithAnswers[i] || this.questionsWithAnswers[i].answer.length == 0) {
				alert('You must complete all the questions');
				return;
			}
		}
		
		this.saveAnswerToLocalStorage(this.questionsWithAnswers);
		alert('Complete!');
	}

	onStartAgain() {
		if(!this.getOldAnswer()){
			alert('First time here! No history ');
			return;
		}
		this.questionsService.loadAnswersSubject.next(this.getOldAnswer());
	}

	public saveAnswerToLocalStorage(answers: IQuestionAndAnswer[]):void{
		localStorage.setItem('answers',JSON.stringify(answers));
	}

	public getOldAnswer(): IQuestionAndAnswer[]{
		let localStorageOldAnswers = JSON.parse(localStorage.getItem('answers'));
		return localStorageOldAnswers;
	}


}
