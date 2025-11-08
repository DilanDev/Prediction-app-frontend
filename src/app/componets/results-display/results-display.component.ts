import { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionResponse } from '../../models/prediction.model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.scss'],
  imports: [CommonModule]
})
export class ResultsDisplayComponent implements OnInit, AfterViewInit {
  @Input() results!: PredictionResponse;
  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('radarChart') radarChart!: ElementRef;

  chart1: any;
  chart2: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.results && this.barChart && this.radarChart) {
        this.createBarChart();
        this.createRadarChart();
      }
    }, 300);
  }

  getAlgorithms(): string[] {
    if (!this.results || !this.results.accuracies) return [];
    return Object.keys(this.results.accuracies);
  }

  private createBarChart(): void {
    const accuracies = this.results.accuracies;
    const ctx = this.barChart.nativeElement.getContext('2d');

    const labels = Object.keys(accuracies);
    const data = labels.map(key =>
      parseFloat(accuracies[key as keyof typeof accuracies].replace('%', ''))
    );

    // Colores en escala de grises
    const grayColors = [
      'rgba(26, 26, 26, 0.8)',    // Negro muy oscuro
      'rgba(64, 64, 64, 0.8)',    // Gris oscuro
      'rgba(106, 106, 106, 0.8)', // Gris medio
      'rgba(160, 160, 160, 0.8)', // Gris claro
      'rgba(200, 200, 200, 0.8)', // Gris muy claro
      'rgba(230, 230, 230, 0.8)'  // Casi blanco
    ];

    const grayBorders = [
      'rgba(26, 26, 26, 1)',
      'rgba(64, 64, 64, 1)',
      'rgba(106, 106, 106, 1)',
      'rgba(160, 160, 160, 1)',
      'rgba(200, 200, 200, 1)',
      'rgba(230, 230, 230, 1)'
    ];

    this.chart1 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Precisión (%)',
          data: data,
          backgroundColor: grayColors,
          borderColor: grayBorders,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Precisión por Algoritmo',
            font: {
              size: 18,
              weight: 'bold'
            },
            color: '#1a1a1a'
          },
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Precisión: ${context.parsed.y}%`;
              }
            },
            backgroundColor: 'rgba(26, 26, 26, 0.9)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#404040',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 50,
            title: {
              display: true,
              text: 'Precisión (%)',
              color: '#1a1a1a',
              font: {
                weight: 'bold'
              }
            },
            ticks: {
              color: '#4a4a4a'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Algoritmos',
              color: '#1a1a1a',
              font: {
                weight: 'bold'
              }
            },
            ticks: {
              color: '#4a4a4a'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          }
        }
      }
    });
  }

  private createRadarChart(): void {
    const accuracies = this.results.accuracies;
    const ctx = this.radarChart.nativeElement.getContext('2d');

    const labels = Object.keys(accuracies);
    const data = labels.map(key =>
      parseFloat(accuracies[key as keyof typeof accuracies].replace('%', ''))
    );

    this.chart2 = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Precisión (%)',
          data: data,
          backgroundColor: 'rgba(64, 64, 64, 0.2)',
          borderColor: 'rgba(26, 26, 26, 1)',
          borderWidth: 3,
          pointBackgroundColor: 'rgba(26, 26, 26, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 3,
          pointRadius: 5,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(26, 26, 26, 1)',
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Comparación de Modelos',
            font: {
              size: 18,
              weight: 'bold'
            },
            color: '#1a1a1a'
          },
          legend: {
            labels: {
              color: '#1a1a1a'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(26, 26, 26, 0.9)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#404040',
            borderWidth: 1
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            min: 30,
            max: 50,
            ticks: {
              stepSize: 5,
              color: '#4a4a4a',
              backdropColor: 'transparent'
            },
            pointLabels: {
              color: '#1a1a1a',
              font: {
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            angleLines: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
      }
    });
  }
}
