import { Component, OnInit } from '@angular/core';
import { CurrentAlgorithmService, RunningAlgorithm } from '../service/current-algorithm/current-algorithm.service';
import { GraphFormService } from '../service/graph-form/graph-form.service';

@Component({
  selector: 'app-graph-form',
  templateUrl: './graph-form.component.html',
  styleUrls: ['./graph-form.component.css']
})
export class GraphFormComponent implements OnInit {

  constructor(private graphFormService: GraphFormService, private currentAlgorithmService: CurrentAlgorithmService) { }

  ngOnInit(): void {
  }

  changeRunningAlgorith(algorithm: RunningAlgorithm) {
    this.currentAlgorithmService.changeCurrentAlgorithm(algorithm)
  }

  setTime(time: number){
    this.currentAlgorithmService.changeCurrentAlgorithmTime(time)
  }
}
