import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphFormService {

  private vertexAddedSource = new BehaviorSubject<boolean>(false)
  vertexAdded = this.vertexAddedSource.asObservable();

  constructor() { }

  changeVertexAdded(message: boolean) {
    this.vertexAddedSource.next(message)
  }
}
