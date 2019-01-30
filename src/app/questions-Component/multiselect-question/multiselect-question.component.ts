import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'selenium-webdriver/firefox';
import { QuestionsService } from '../../shared/questions.service';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder, FormArray } from '@angular/forms';
import { MultiSelectQuestion, IQuestionAndAnswer } from '../../shared/questions.model';


@Component({
	selector: 'app-multiselect-question',
	templateUrl: './multiselect-question.component.html',
	styleUrls: ['./multiselect-question.component.scss']
})
export class MultiselectQuestionComponent implements OnInit {
	@Input() index: number;
	@Input() question: MultiSelectQuestion;
	options: Array<string>;
	multiSelectForm: FormGroup;
	selectOptionValues = [];
	isDisabled: boolean = false;


	constructor(private questionService: QuestionsService,
		private _fb: FormBuilder) { }

	ngOnInit() {
		this.options = this.question.option;

		this.multiSelectForm = this._fb.group({
			options: this.addOptionControls()
		})

		this.questionService.loadAnswersSubject.subscribe(
			(userAnsers: IQuestionAndAnswer[]) => {
				this.multiSelectForm.reset()
				for (var i = 0; i < this.options.length; i++) {
					for (var j = 0; j < this.options.length; j++) {
						if (this.options[i] === userAnsers[this.index]['answer'][j]) {
							this.optionsArray.controls[i].setValue(true);
						}
					}
				}
				this.getSelectedOptionValues()
			});
	}

	onReset() {
		this.multiSelectForm.reset();
		this.multiSelectForm.enable()
		this.selectOptionValues = [];
		this.isDisabled = false;
		this.questionService.answersSubject.next({ question: this.question.text, answer: [], index: this.index })
	}

	addOptionControls() {
		const arr = this.options.map(element => {
			return this._fb.control(false);
		})
		return this._fb.array(arr);
	}

	get optionsArray() {
		return <FormArray>this.multiSelectForm.get('options');
	}

	changeIsDisabled() {
		this.isDisabled = true;
	}

	getSelectedOptionValues() {

		this.selectOptionValues = [];

		for (let i = 0; i < this.optionsArray.controls.length; i++) {
			if (this.optionsArray.controls[i].value && this.selectOptionValues.length < this.question.max) {

				this.selectOptionValues.push(this.options[i])

				if (this.selectOptionValues.length === this.question.max) {
					this.questionService.answersSubject.next({ question: this.question.text, answer: this.selectOptionValues, index: this.index });
					this.multiSelectForm.disable()
					return
				}
			}
		}

		this.questionService.answersSubject.next({ question: this.question.text, answer: this.selectOptionValues, index: this.index })
	}
}
