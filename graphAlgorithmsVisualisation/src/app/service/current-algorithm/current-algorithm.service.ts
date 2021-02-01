import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum RunningAlgorithm {
  BFS,
  DFS
}

@Injectable({
  providedIn: 'root'
})
export class CurrentAlgorithmService {

  private currentAlgorithmSource = new BehaviorSubject<RunningAlgorithm>(null)
  currentAlgorithm = this.currentAlgorithmSource.asObservable()

  constructor() { }

  changeCurrentAlgorithm(algorithm: RunningAlgorithm) {
    this.currentAlgorithmSource.next(algorithm)
  }
}
