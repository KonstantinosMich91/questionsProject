import { Component, OnInit, Input } from '@angular/core';
import { QuestionsService } from '../../shared/questions.service';
import { YesNo, IQuestionAndAnswer } from '../../shared/questions.model';
import { FormGroup, FormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-yesno-question',
  templateUrl: './yesno-question.component.html',
  styleUrls: ['./yesno-question.component.scss']
})
export class YesnoQuestionComponent implements OnInit {
  @Input() index: number;
  @Input() question: YesNo;
  answer: string;
  private oldAnswer: any = null;
  yesNoGroup: FormGroup;

  constructor(private questionsService: QuestionsService) {

   }

  ngOnInit() {
    this.yesNoGroup = new FormGroup({
      'yes': new FormControl(),
      'no': new FormControl()
    })

    this.questionsService.loadAnswersSubject.subscribe(
      (userAnswers: IQuestionAndAnswer[]) => {
        this.oldAnswer = userAnswers[this.index].answer;
        this.questionsService.answersSubject.next({ question: this.question.text, answer: this.oldAnswer, index: this.index });
      }
    )
   
  }

  radioChangeHandler(event: any) {
    this.answer = event.target.value;
    console.log(`${this.answer} from component ${this.index}`)
    this.questionsService.answersSubject.next({ question: this.question.text, answer: this.answer, index: this.index });
  }

}
