import { Component, OnInit } from '@angular/core';
import { Node, Edge } from '@swimlane/ngx-graph';
import { GraphFormService } from '../service/graph-form.service';
import * as EdgeIntreface from '../data/edge';
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  edges: Edge[] = []
  nodes: Node[] = []
  properties = {
    defaultColor: '#ffffff',
    choosenColor: 'red',
    stroke: '#000000',
    node_stroke_width: 2,
    edge_stroke_width: 10
  }
  choosenElement: Node = null

  constructor(private graphFormService: GraphFormService) {
    this.graphFormService.vertexAdded.subscribe(res => this.addNode(res))
  }

  ngOnInit(): void {
  }

  addNode(adding: boolean) {
    if (!adding)
      return
    this.nodes.push({
      id: String(this.nodes.length),
      label: '',
      data: {
        customColor: this.properties.defaultColor,
        stroke: this.properties.stroke,
        stroke_width: this.properties.node_stroke_width
      }
    } as Node)
    this.nodes = [...this.nodes]
    this.graphFormService.changeVertexAdded(false)
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
}
