import { Component, ViewChild } from '@angular/core';
import { Node, Edge } from '@swimlane/ngx-graph';
import { GraphFormService } from '../service/graph-form/graph-form.service';
import { Algorithms } from '../data/algorithms'
import { CurrentAlgorithmService, RunningAlgorithm } from '../service/current-algorithm/current-algorithm.service';
import * as pregeneratedGraph from '../data/graph';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent {

  edges: Edge[] = []
  nodes: Node[] = []
  algo: Algorithms = new Algorithms()
  choosenElement: Node = null
  properties = {
    defaultColor: '#ffffff',
    choosenColor: 'red',
    stroke: '#343a40',
    node_stroke_width: 2
  }

  constructor(private graphFormService: GraphFormService, private currentAlgorithmService: CurrentAlgorithmService) {
    this.currentAlgorithmService.currentAlgorithm.subscribe(res => this.runAlgorithm(res))
    this.currentAlgorithmService.currentAlgorithmTime.subscribe(res => this.algo.setTime(res))
    this.graphFormService.vertexAdded.subscribe(res => this.addNode(res))
    this.graphFormService.pregeneratedGraph.subscribe(res => this.generateGraph(res))
    this.algo.setTime(500)
    this.nodes = []
    this.edges = []
  }

  addNode(node: Node) {
    this.nodes.push(node)
    this.nodes = [...this.nodes]
  }

  deleteNode(node: Node) {
    this.nodes = this.nodes.filter(res => res != node)
    this.edges = this.edges.filter(res => res.source != node.id && res.target != node.id)
  }

  manageEdge(target: string) {
    let temp = this.edges.find(res => res.target == target && res.source == this.choosenElement.id)
    if (temp != null) {
      this.edges = this.edges.filter(element => element != temp)
      return
    }
    this.edges.push({
      source: this.choosenElement.id,
      target: target
    })
    this.edges = [...this.edges]
  }

  chooseNode(element: Node) {
    this.dropNode()
    this.choosenElement = element
    this.choosenElement.data.customColor = this.properties.choosenColor
  }

  dropNode() {
    if (this.choosenElement == null)
      return
    this.choosenElement.data.customColor = this.properties.defaultColor
    this.choosenElement = null
  }

  resetColors() {
    this.nodes.forEach(node => node.data.customColor = this.properties.defaultColor)
    this.choosenElement = null
  }

  generateGraph(graph: pregeneratedGraph.PregeneratedGraph) {
    let temp: pregeneratedGraph.Graph = pregeneratedGraph.PregeneratedGraph.generateGraph(graph)
    this.nodes = temp.nodes
    this.edges = temp.edges
    this.nodes.forEach(node =>
      node.data = {
        customColor: this.properties.defaultColor,
        stroke: this.properties.stroke,
        stroke_width: this.properties.node_stroke_width
      })
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
        this.nodes = this.nodes
        this.edges = this.edges
      }
    }
    this.choosenElement = null
  }

  //CONTEXT MENU HERE

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, item: Node) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}