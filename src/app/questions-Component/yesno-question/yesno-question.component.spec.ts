import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesnoQuestionComponent } from './yesno-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsService } from 'src/app/shared/questions.service';

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

  it('shoube Yes the answer if "Yes" is selected', () => {
    component.yesNoGroup.controls['yes'].enabled;
    fixture.detectChanges();
    expect(component.answer).toBe('Yes');
  })
});
