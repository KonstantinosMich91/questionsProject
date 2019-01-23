import { Component } from '@angular/core';
import { Question } from './shared/questions.model';
import { QuestionsService } from './shared/questions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  questions: Question[];


  constructor(private questionsService: QuestionsService) {
    this.questions = this.questionsService.getQuestions();
  }

}
