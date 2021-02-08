import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Node, Edge } from '@swimlane/ngx-graph';
import { GraphFormService } from '../service/graph-form/graph-form.service';
import { Algorithms } from '../data/algorithms'
import { CurrentAlgorithmService, RunningAlgorithm } from '../service/current-algorithm/current-algorithm.service';
import * as pregeneratedGraph from '../data/graph';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CanvasComponent {

  edges: Edge[] = []
  nodes: Node[] = []
  algo: Algorithms = new Algorithms()
  choosenElement: Node = null
  beforeChoosenColor: string = null
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
    this.graphFormService.lengthGenerated.subscribe(() => this.generteLenghts(0, 40))
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
      this.deleteEdge(temp)
      return
    }
    this.edges.push({
      source: this.choosenElement.id,
      target: target,
      data: {
        customColor: '#343a40',
        isNode: false,
      }
    })
    this.edges = [...this.edges]
  }

  deleteEdge(edge: Edge) {
    this.edges = this.edges.filter(element => element.id != edge.id)
  }

  chooseElement(element: any) {
    this.dropElement()
    this.beforeChoosenColor = element.data.customColor
    this.choosenElement = element
    this.choosenElement.data.customColor = this.properties.choosenColor
  }

  dropElement() {
    if (this.choosenElement == null)
      return
    this.choosenElement.data.customColor = this.beforeChoosenColor
    this.choosenElement = null
  }

  setEdgeLength(edge: Edge) {
    let x = prompt()
    edge.data.length = 0
    if (Number.isInteger(Number(x)))
      edge.data.length = x
  }

  resetGraph() {
    this.nodes.forEach(node =>
      node.data = {
        customColor: this.properties.defaultColor,
        stroke: this.properties.stroke,
        stroke_width: this.properties.node_stroke_width,
        isNode: true
      }
    )
    this.edges.forEach(edge => edge.data.customColor = '#343a40')
    this.choosenElement = null
  }

  generteLenghts(max: number, min: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    this.edges.forEach(edge => edge.data.length = Math.floor(Math.random() * (max - min)) + min)
  }

  //CONTEXT MENU

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, element: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': element };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  //GRAPHS

  generateGraph(graph: pregeneratedGraph.PregeneratedGraph) {
    let temp: pregeneratedGraph.Graph = pregeneratedGraph.PregeneratedGraph.generateGraph(graph)
    this.nodes = temp.nodes
    this.edges = temp.edges
    this.nodes.forEach(node =>
      node.data = {
        customColor: this.properties.defaultColor,
        stroke: this.properties.stroke,
        stroke_width: this.properties.node_stroke_width,
        isNode: true
      })
    this.edges.forEach(edge => {
      // let temp = null
      // if (graph == pregeneratedGraph.PregeneratedGraph.RandomDirectedGraph)
      //   temp = edge.data.length
      edge.data = {}
      edge.data.customColor = '#343a40'
      // edge.data.length = temp
      edge.data.isNode = false
    })
  }

  //ALGORITHMS

  async runAlgorithm(algorithm: RunningAlgorithm) {
    switch (algorithm) {
      case RunningAlgorithm.BFS: {
        await this.algo.BFS(this.nodes, this.edges, this.choosenElement)
        break
      }
      case RunningAlgorithm.DFS: {
        await this.algo.DFS(this.nodes, this.edges, this.choosenElement)
        break
      }
      case RunningAlgorithm.SCC: {
        await this.algo.findStronglyConnectedComponents(this.nodes, this.edges, this.choosenElement)
        break
      }
      case RunningAlgorithm.BRIDGES: {
        await this.algo.findBridges(this.nodes, this.edges)
        break
      }
      case RunningAlgorithm.DIJKSTRA: {
        if (!this.checkForEdgesLengths())
          break
        await this.algo.dijkstra(this.nodes, this.edges, this.choosenElement)
        break
      }
      case RunningAlgorithm.PRIM: {
        if (!this.checkForEdgesLengths())
          break
        await this.algo.prim(this.nodes, this.edges)
        break
      }
      case RunningAlgorithm.KRUSKAL: {
        if (!this.checkForEdgesLengths())
          break
        // this.edges.sort((a, b) => a.data.length - b.data.length)
        await this.algo.kruskal(this.nodes, this.edges)
        break
      }
      case RunningAlgorithm.FORDFULKERSON: {
        if (!this.checkForEdgesLengths())
          break
        await this.algo.fordFulkerson(this.nodes, this.edges)
        break
      }
      case RunningAlgorithm.BELLMANFORD: {
        if (!this.checkForEdgesLengths())
          break
        await this.algo.bellmanFord(this.nodes, this.edges, this.choosenElement)
        break
      }
      default: {
        this.resetGraph()
        this.nodes = this.nodes
        this.edges = this.edges
      }
    }
    this.choosenElement = null
  }

  checkForEdgesLengths() {
    return this.edges.find(res => res.data.length == null) == null
  }

}