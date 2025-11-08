import { Component } from '@angular/core';
import { PredictionResponse } from './models/prediction.model';
import { SleepQuestionnaireComponent } from './componets/sleep-questionnaire/sleep-questionnaire.component';
import { ResultsDisplayComponent } from './componets/results-display/results-display.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    imports: [
    CommonModule,
    SleepQuestionnaireComponent,
  ],

})

export class AppComponent {
  title = 'Predicción de Estado de animo';
  currentYear = new Date().getFullYear();

  handleResults(event: PredictionResponse): void {
    console.log('Resultados recibidos:', event);
  }
}
