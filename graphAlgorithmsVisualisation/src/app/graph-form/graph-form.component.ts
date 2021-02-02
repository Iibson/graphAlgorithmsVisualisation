import { Component, OnInit } from '@angular/core';
import { CurrentAlgorithmService, RunningAlgorithm } from '../service/current-algorithm/current-algorithm.service';
import { GraphFormService } from '../service/graph-form/graph-form.service';
import { Node } from '@swimlane/ngx-graph';
import { PregeneratedGraph } from '../data/graph'

@Component({
  selector: 'app-graph-form',
  templateUrl: './graph-form.component.html',
  styleUrls: ['./graph-form.component.css']
})
export class GraphFormComponent implements OnInit {

  properties = {
    defaultColor: '#ffffff',
    stroke: '#343a40',
    node_stroke_width: 2
  }
  lastAdded: number = 0

  constructor(private graphFormService: GraphFormService, private currentAlgorithmService: CurrentAlgorithmService) { }

  ngOnInit(): void {
  }

  changeRunningAlgorith(algorithm: RunningAlgorithm) {
    this.currentAlgorithmService.changeCurrentAlgorithm(algorithm)
  }

  setTime(time: number) {
    this.currentAlgorithmService.changeCurrentAlgorithmTime(time)
  }

  addNode() {
    this.graphFormService.changeVertexAdded({
      id: String(this.lastAdded),
      label: '',
      data: {
        customColor: this.properties.defaultColor,
        stroke: this.properties.stroke,
        stroke_width: this.properties.node_stroke_width
      }
    } as Node)
    this.lastAdded++
  }

  generateGraph(graph: PregeneratedGraph) {
    this.lastAdded = (graph == null) ? 0 : PregeneratedGraph.numberOfNodes(graph)
    this.graphFormService.changePregeneratedGraph(graph)
  }
}
