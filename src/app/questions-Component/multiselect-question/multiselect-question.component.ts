import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'selenium-webdriver/firefox';
import { QuestionsService } from '../../shared/questions.service';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { MultiSelectQuestion, IQuestionAndAnswer } from '../../shared/questions.model';

@Component({
	selector: 'app-multiselect-question',
	templateUrl: './multiselect-question.component.html',
	styleUrls: ['./multiselect-question.component.scss']
})
export class MultiselectQuestionComponent implements OnInit {

	@Input() index: number;

	@Input() question: MultiSelectQuestion;

	answer: string;
	multiSelectForm: FormGroup;
	cantSelectMore: boolean = false;
	isActive: boolean;
	oldAnswers: any = [];

	

	public answers: string[] = [];
	constructor(private questionService: QuestionsService) {
	}

	ngOnInit() {
		this.questionService.loadAnswersSubject.subscribe(
			(userAnsers: IQuestionAndAnswer[]) => {
			this.questionService.answersSubject.next({ question: this.question.text, answer: this.answers, index: this.index })
			this.oldAnswers = userAnsers[this.index].answer;
			this.questionService.answersSubject.next({ question: this.question.text, answer: this.oldAnswers, index: this.index })

				console.log(`test from multyselect component old answers: ${this.oldAnswers}`);
				
			}
		)
	}

	answerChanged(event: any) {
		this.answer = event.target.value;
		if (this.answers.indexOf(this.answer) !== -1) {
			return;
		}
		if (this.answers.length < 3) {
			this.answers.push(this.answer);
			this.questionService.answersSubject.next({ question: this.question.text, answer: this.answers, index: this.index })
		}
		if (this.answers.length >= 3) {
			this.cantSelectMore = true;
		}
	}

	onResetValues() {
		this.answers = []
		this.questionService.answersSubject.next({ question: this.question.text, answer: [], index: this.index })
		this.cantSelectMore = false;
		this.isActive = false;
	}

}
