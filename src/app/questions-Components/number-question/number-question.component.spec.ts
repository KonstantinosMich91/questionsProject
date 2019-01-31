import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { NumberQuestionComponent } from './number-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsService } from 'src/app/shared/questions.service';
import { By } from '@angular/platform-browser';
import { detectChanges } from '@angular/core/src/render3';

describe('NumberQuestionComponent', () => {
  let component: NumberQuestionComponent;
  let fixture: ComponentFixture<NumberQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumberQuestionComponent],
      imports: [FormsModule,
        ReactiveFormsModule],
      providers: [QuestionsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberQuestionComponent);
    component = fixture.componentInstance;
    component.question = {type: 'number', text:'How old are you?',min:0, max: 100};
    fixture.detectChanges();
  });

  it('should display "You must enter an number" if the answer is empty', () => {
    component.numberGroup.setValue({answer: null})
    component.numberGroup.get('answer').markAsTouched();
    fixture.detectChanges();
    const paragraph = fixture.debugElement.query(By.css('.error'));
    expect(paragraph.nativeElement.textContent).toContain('You must enter an number');
  })

  it('should not display invalid answer if the answer is not empty', () => {
    component.numberGroup.setValue({answer: '3'});
    fixture.detectChanges();
    const paragraph = fixture.debugElement.query(By.css('.error'));
    expect(paragraph).toBe(null);
  })

  it('should display You must enter a smaller number if the answer is bigger then max', () => {
    component.numberGroup.controls['answer'].markAsTouched;
    
    component.numberGroup.setValue({answer: '101'});
    fixture.detectChanges();
    
    let paragraph = fixture.debugElement.query(By.css('.error3'));
    let el: HTMLElement = paragraph.nativeElement;
    expect(el.textContent).toContain('You must enter a smaller number');
  })
});

