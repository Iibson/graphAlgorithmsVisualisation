import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Node } from '@swimlane/ngx-graph';
import { PregeneratedGraph } from '../../data/graph'

@Injectable({
  providedIn: 'root'
})
export class GraphFormService {

  private vertexAddedSource = new BehaviorSubject<Node>({} as Node)
  vertexAdded = this.vertexAddedSource.asObservable();
  private pregeneratedGraphSource = new BehaviorSubject<PregeneratedGraph>(null)
  pregeneratedGraph = this.pregeneratedGraphSource.asObservable()
  private lengthGeneratedSource = new BehaviorSubject<null>(null)
  lengthGenerated = this.lengthGeneratedSource.asObservable()

  constructor() { }

  changeVertexAdded(message: Node) {
    this.vertexAddedSource.next(message)
  }

  changePregeneratedGraph(graph: PregeneratedGraph) {
    this.pregeneratedGraphSource.next(graph)
  }

  changeLengthGenerated(message: null) {
    this.lengthGeneratedSource.next(message)
  }

  
}
