import { Component, HostListener } from '@angular/core';
import { Node, Edge } from '@swimlane/ngx-graph';
import { GraphFormService } from '../service/graph-form/graph-form.service';
import { Algorithms } from '../data/algorithms'
import { CurrentAlgorithmService, RunningAlgorithm } from '../service/current-algorithm/current-algorithm.service';
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent {

  edges: Edge[] = []
  nodes: Node[] = []
  algo: Algorithms = new Algorithms(510)
  properties = {
    defaultColor: '#ffffff',
    choosenColor: 'red',
    stroke: '#000000',
    node_stroke_width: 2
  }
  choosenElement: Node = null
  lastAdded: number = 0

  constructor(private graphFormService: GraphFormService, private currentAlgorithmService: CurrentAlgorithmService) {
    this.graphFormService.vertexAdded.subscribe(res => this.addNode(res))
    this.currentAlgorithmService.currentAlgorithm.subscribe(res => this.runAlgorithm(res))
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'd')
      if (this.choosenElement != null) {
        this.deleteNode(this.choosenElement)
        this.choosenElement = null
      }
  }

  addNode(adding: boolean) {
    if (!adding)
      return
    this.nodes.push({
      id: String(this.lastAdded),
      label: '',
      data: {
        customColor: this.properties.defaultColor,
        stroke: this.properties.stroke,
        stroke_width: this.properties.node_stroke_width
      }
    } as Node)
    this.nodes = [...this.nodes]
    this.graphFormService.changeVertexAdded(false)
    this.lastAdded++
  }

  deleteNode(node: Node) {
    this.nodes = this.nodes.filter(res => res != node)
    this.edges = this.edges.filter(res => res.source != node.id && res.target != node.id)
  }

  addEdge(source: string, target: string) {
    this.edges.push({
      source: source,
      target: target
    })
    this.edges = [...this.edges]
  }

  deleteEdge(edge: Edge) {
    this.edges = this.edges.filter(element => element != edge)
  }

  chooseNode(element: Node) {
    if (this.choosenElement == null) {
      this.choosenElement = element
      this.choosenElement.data.customColor = this.properties.choosenColor
    }
    else {
      let edge = this.edges.find(res => res.source == this.choosenElement.id && res.target == element.id)
      if (edge == null)
        this.addEdge(this.choosenElement.id, element.id)
      else
        this.deleteEdge(edge)
      this.choosenElement.data.customColor = this.properties.defaultColor
      this.choosenElement = null
    }
  }

  resetColors() {
    this.nodes.forEach(node => node.data.customColor = this.properties.defaultColor)
  }

  setTime(time: number) {
    this.algo.setTime(1010 - time * 10)
  }

  runAlgorithm(algorithm: RunningAlgorithm) {
    switch (algorithm) {
      case RunningAlgorithm.BFS: {
        this.algo.BFS(this.nodes, this.edges, this.choosenElement)
        break
      }
      case RunningAlgorithm.DFS: {
        this.algo.DFS(this.nodes, this.edges, this.choosenElement)
        break
      }
      default: {
        this.resetColors()
      }
    }
    this.choosenElement = null
  }
}
