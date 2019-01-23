import { Component, OnInit, Input } from '@angular/core';
import { QuestionsService } from '../../shared/questions.service';
import { YesNo, IQuestionAndAnswer } from '../../shared/questions.model';

@Component({
  selector: 'app-yesno-question',
  templateUrl: './yesno-question.component.html',
  styleUrls: ['./yesno-question.component.scss']
})
export class YesnoQuestionComponent implements OnInit {
  @Input() index: number;
  @Input() question: YesNo;
  answer: string;
  answers: string[] = ["Yes", "No"]

  oldAnswer: any = null;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.questionsService.loadAnswersSubject.subscribe(
      (userAnswers: IQuestionAndAnswer[]) => {
        this.oldAnswer = userAnswers[this.index].answer;
        this.questionsService.answersSubject.next({ question: this.question.text, answer: this.oldAnswer, index: this.index });

      }
    )
  }

  radioChangeHandler(event: any) {
    this.answer = event.target.value;
    this.questionsService.answersSubject.next({ question: this.question.text, answer: this.answer, index: this.index });
  }

}
