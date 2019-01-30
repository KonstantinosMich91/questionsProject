import { Routes } from '@angular/router';

import { QuestionnaireComponent } from '../questionnaire/questionnaire.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'questionnaire',pathMatch: 'full'},
    { path: 'questionnaire', component: QuestionnaireComponent },
   
  
]