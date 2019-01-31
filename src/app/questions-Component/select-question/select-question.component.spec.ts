import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuestionComponent } from './select-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsService } from 'src/app/shared/questions.service';
import { By } from '@angular/platform-browser';

describe('SelectQuestionComponent', () => {
  let component: SelectQuestionComponent;
  let fixture: ComponentFixture<SelectQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectQuestionComponent ],
      imports: [FormsModule,
        ReactiveFormsModule],
      providers: [QuestionsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectQuestionComponent);
    component = fixture.componentInstance;
    component.question =  {
      type: 'select', text:'Your favorite programming language?', options: [
        'C++', 'Java', 'Python', 'Javascript'
      ]
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the selected answer' , () => {
    component.selected = 'Python';
  
    let el: HTMLElement = fixture.debugElement.query(By.css('.selec')).nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toContain('Python')
  })
});
