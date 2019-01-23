import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../shared/questions.service';
import { Question, INumberAnswer, IMultiSelectAnswer, ISelectAnswer, IYesNoAnswer, IQuestionAndAnswer } from '../shared/questions.model';
import { Router } from '@angular/router';


@Component({
	selector: 'app-questionnaire',
	templateUrl: './questionnaire.component.html',
	styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
	questions: Question[]; 							//storage for all questions
	questionsWithAnswers: IQuestionAndAnswer[] = [];//array for all answers after onComplete()
	// public currentUser: User | null = null;         
	constructor(private questionsService: QuestionsService,
		private router: Router) {
		this.questions = this.questionsService.getQuestions();
	}

	ngOnInit() {
		this.questionsService.answersSubject.subscribe(//we subscribe to the changes of every input from questions components
			(newValue: INumberAnswer | IMultiSelectAnswer | ISelectAnswer | IYesNoAnswer) => {
				this.questionsWithAnswers[newValue.index] = { question: newValue.question, answer: newValue.answer };
			}
		)
		// this.currentUser = this.userService.currentUser;//i set the current user here too
		// console.log(`Current user in questionnaire component ${this.currentUser.name}`)
	}

	onComplete() {
		if (this.questionsWithAnswers.length < this.questions['questions'].length) {
			alert('You must complete all the questions');
			return;
		}
		for (let i = 0; i < this.questionsWithAnswers.length; i++) {//if there is null in answer
			if (!this.questionsWithAnswers[i] || !this.questionsWithAnswers[i].answer) {
				alert('You must complete all the questions');

				return;
			}
		}

		console.log(this.questionsWithAnswers);
		this.saveAnswerToLocalStorage(this.questionsWithAnswers)
		// console.log(this.questionsWithAnswers)
		// this.currentUser.addQuestionnaire(this.questionsWithAnswers)
		// console.log('updated users questions:');
		// console.log(this.currentUser);
		// this.userService.setLocalStorageUsers(this.userService.users);
	}

	public saveAnswerToLocalStorage(answers: IQuestionAndAnswer[]):void{
		localStorage.setItem('answers',JSON.stringify(answers))
	}
	public getOldAnswer(): IQuestionAndAnswer[]{
		let localStorageItem = JSON.parse(localStorage.getItem('answers'));
		console.log(localStorageItem)
		// const userObjects: Array<User> = []
		// if(localStorageItem == null){
		// 	return [];
		// }
		return localStorageItem;
		// for(const user of localStorageItem.users) {
		// 	let newUser =new User(user.id, user.name, user.gender)
		// 	newUser.questionnarieResults = user.questionnarieResults;
		// 	userObjects.push(newUser);
		// }
		
		// return answerObject;
	}

	onStartAgain() {
		// if(this.userService.currentUser.questionnarieResults.length === 0){
		// 	alert(`You dont have complete the questions before to load them! Please answer first!`);
		// 	return;
		// }
		// console.log(this.userService.currentUser.getQuestionnaireResults());
		this.questionsService.loadAnswersSubject.next(this.getOldAnswer())
		

	}




}
