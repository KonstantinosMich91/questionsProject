import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireComponent } from './questionnaire.component';
import { QuestionsService } from '../shared/questions.service';
import { Observable } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberQuestionComponent } from '../questions-Component/number-question/number-question.component';
import { SelectQuestionComponent } from '../questions-Component/select-question/select-question.component';
import { MultiselectQuestionComponent } from '../questions-Component/multiselect-question/multiselect-question.component';
import { YesnoQuestionComponent } from '../questions-Component/yesno-question/yesno-question.component';

describe('QuestionnaireComponent', () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireComponent, NumberQuestionComponent, 
                      SelectQuestionComponent, MultiselectQuestionComponent, YesnoQuestionComponent],
      imports: [FormsModule,
        ReactiveFormsModule],
      providers: [QuestionsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
     

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all the questions from the questionService' , () => {
    let service = fixture.debugElement.injector.get(QuestionsService);
    spyOn(service, 'getQuestions').and.returnValue([
      { type: 'number', text: "What's your age?", min: 0, max: 100 },
      { type: 'yesno', text: 'Do you bike?' },

      {
        type: 'select', text:'Your favorite programming language?', options: [
          'C++', 'Java', 'Python', 'Javascript'
        ]
      },
      { type: 'number', text: "How many pets do you have?", min: 0, max: 20 },

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
        type: 'multiselect', text: 'Select up to four citys you want to visit ', option: [
          'London', 'Kalabaka city', 'Barcelona', 'Amsterdam', 'Berlin', 'Oss'
        ], max: 4
      }
    ]) 

    fixture.detectChanges();

    expect(component.questions.length).toBe(8);

  })
});
