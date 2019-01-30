import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesnoQuestionComponent } from './yesno-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsService } from 'src/app/shared/questions.service';
import { By } from '@angular/platform-browser';
// import { By } from 'protractor';

describe('YesnoQuestionComponent', () => {
  let component: YesnoQuestionComponent;
  let fixture: ComponentFixture<YesnoQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesnoQuestionComponent ],
      imports: [FormsModule,
        ReactiveFormsModule],
      providers: [QuestionsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesnoQuestionComponent);
    component = fixture.componentInstance;
    component.question =  { type: 'yesno', text: 'Do you bike?'}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoube is should be TRUE if answer is Yes', () => {
    component.answer = 'Yes';
    fixture.detectChanges();
    let el = fixture.debugElement.query( By.css('.yes'));
    
    expect(el.attributes).toContain({value: 'Yes'});
  })
});
