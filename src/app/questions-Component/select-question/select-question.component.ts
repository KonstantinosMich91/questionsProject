import { Component, OnInit, Input } from '@angular/core';
import { QuestionsService } from '../../shared/questions.service';
import { SelectQuestion, IQuestionAndAnswer } from '../../shared/questions.model';


@Component({
  selector: 'app-select-question',
  templateUrl: './select-question.component.html',
  styleUrls: ['./select-question.component.scss']
})
export class SelectQuestionComponent implements OnInit {
  @Input() options;
  @Input() index;
  selected: any;
  oldAnswer: any = null;

  @Input() question: SelectQuestion;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.questionsService.loadAnswersSubject.subscribe(
      (allAnswers: IQuestionAndAnswer[]) => {
       this.selected = allAnswers[this.index].answer;
       this.questionsService.answersSubject.next({ question: this.question.text, answer: this.selected, index: this.index });
      }
    )
  }

  selectedValue(event: any) {
    this.selected = event.target.value;
    this.questionsService.answersSubject.next({ question: this.question.text, answer: this.selected, index: this.index });
  }

}
