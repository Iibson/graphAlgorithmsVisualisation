import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Node } from '@swimlane/ngx-graph';

@Injectable({
  providedIn: 'root'
})
export class GraphFormService {

  private vertexAddedSource = new BehaviorSubject<Node>({} as Node)
  vertexAdded = this.vertexAddedSource.asObservable();

  constructor() { }

  changeVertexAdded(message: Node) {
    this.vertexAddedSource.next(message)
  }
}
