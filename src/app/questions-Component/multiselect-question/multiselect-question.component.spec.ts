import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectQuestionComponent } from './multiselect-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsService } from 'src/app/shared/questions.service';
import { By } from '@angular/platform-browser';

describe('MultiselectQuestionComponent', () => {
  let component: MultiselectQuestionComponent;
  let fixture: ComponentFixture<MultiselectQuestionComponent>;
  let input: Element;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiselectQuestionComponent ],
      imports: [FormsModule,
        ReactiveFormsModule],
      providers: [QuestionsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectQuestionComponent);
    component = fixture.componentInstance;
    component.question =  {
      type: 'multiselect', text: 'Select up to three hobbies that you enjoy', option: [
        'Footbal', 'Gaming', 'Canoe Kayak', 'Basketball', 'Pzzle games'
      ], max: 3
    }
    // input = fixture.debugElement.query(By.css('#checkBox')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the options that the question has', () => { 
     expect(component.question.option.length).toBe(5);
  })

  it('should disable all the options if the number of total answers is equal to max', () => {
  })

});
