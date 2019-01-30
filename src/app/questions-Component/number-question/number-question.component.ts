import { Component, OnInit, Input, } from '@angular/core';
import { QuestionsService } from '../../shared/questions.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NumQuestion, Question, IQuestionAndAnswer } from '../../shared/questions.model';


@Component({
    selector: 'app-number-question',
    templateUrl: './number-question.component.html',
    styleUrls: ['./number-question.component.scss']
})
export class NumberQuestionComponent implements OnInit {
    numberGroup: FormGroup;
    @Input() index: number;
    @Input() question: NumQuestion;
    userOldAnswer: any = null;

    constructor(private questionsService: QuestionsService) {}

    ngOnInit() {
        this.numberGroup = new FormGroup({
            answer: new FormControl(null, [Validators.required, this.biggerThanMax.bind(this), this.smallerThanMin.bind(this)])//
        })
        

        this.numberGroup.valueChanges.subscribe(
            (value) => {
                if (value.answer > this.question.max || value.answer < this.question.min) {
                    this.questionsService.answersSubject.next({ question: this.question.text, answer: undefined, index: this.index });
                } else {
                    this.questionsService.answersSubject.next({ question: this.question.text, answer: value.answer, index: this.index });
                }
            }
        )

        this.questionsService.loadAnswersSubject.subscribe(
            (userAnswer: IQuestionAndAnswer[]) => {
                this.userOldAnswer = userAnswer[this.index].answer;
                this.questionsService.answersSubject.next({ question: this.question.text, answer: this.userOldAnswer, index: this.index });
            }
        )
       
        console.log()
    }

    biggerThanMax(control: FormControl): { [s: string]: boolean } {
        if (control.value > this.question.max) {
            return { 'valueIsBigger': true }
        }
        return null;
    }

    smallerThanMin(control: FormControl): { [s: string]: boolean } {
        if ( this.question.min  > control.value) {
            return { 'valueIsSmaller': true }
        }
        return null;
    }

}
