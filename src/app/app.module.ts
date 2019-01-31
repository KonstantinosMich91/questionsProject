import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { NumberQuestionComponent } from './questions-Component/number-question/number-question.component';
import { SelectQuestionComponent } from './questions-Component/select-question/select-question.component';
import { YesnoQuestionComponent } from './questions-Component/yesno-question/yesno-question.component';
import { MultiselectQuestionComponent } from './questions-Component/multiselect-question/multiselect-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from './shared/routes';


@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent,
    NumberQuestionComponent,
    SelectQuestionComponent,
    YesnoQuestionComponent,
     MultiselectQuestionComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
