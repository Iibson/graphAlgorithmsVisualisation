import { Component, HostListener } from '@angular/core';
import { Node, Edge } from '@swimlane/ngx-graph';
import { GraphFormService } from '../service/graph-form.service';
import { Algorithms } from '../data/algorithms'
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent {

  edges: Edge[] = []
  nodes: Node[] = []
  algo: Algorithms = new Algorithms()
  properties = {
    defaultColor: '#ffffff',
    choosenColor: 'red',
    stroke: '#000000',
    node_stroke_width: 2
  }
  choosenElement: Node = null
  lastAdded: number = 0

  constructor(private graphFormService: GraphFormService) {
    this.graphFormService.vertexAdded.subscribe(res => this.addNode(res))
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'd') {
      if (this.choosenElement != null) {
        this.nodes = this.nodes.filter(res => res != this.choosenElement)
        this.edges = this.edges.filter(res => res.source != this.choosenElement.id && res.target != this.choosenElement.id)
        this.choosenElement = null
        console.log(this.nodes, this.edges)
      }
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

  runBFS() {
    if(this.choosenElement == null)
      return
    this.algo.BFS(this.nodes, this.edges, this.choosenElement)
    this.choosenElement = null
  }

  runDFS() {
    if(this.choosenElement == null)
    return
  this.algo.DFS(this.nodes, this.edges)
  this.choosenElement = null
  }

  resetColors() {
    this.nodes.forEach(node => node.data.customColor = this.properties.defaultColor)
  }

}
