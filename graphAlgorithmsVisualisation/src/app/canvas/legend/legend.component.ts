import { Component } from '@angular/core';
import { CurrentAlgorithmService, RunningAlgorithm } from 'src/app/service/current-algorithm/current-algorithm.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css']
})
export class LegendComponent {

  legend: string[] = []

  constructor(private currentAlgorithmService: CurrentAlgorithmService) {
    this.currentAlgorithmService.currentAlgorithm.subscribe(res => this.changeLegend(res))
  }

  changeLegend(algorithm: RunningAlgorithm) {
    switch (algorithm) {
      case RunningAlgorithm.BFS: {
        this.legend = ['dark green - visiting', 'light green - visited', 'yellow - in queue to visit']
        break
      }
      case RunningAlgorithm.DFS: {
        this.legend = ['dark green - entered', 'light green - processed']
        break
      }
      default: {
        this.legend = []
        break
      }
    }
  }
}
