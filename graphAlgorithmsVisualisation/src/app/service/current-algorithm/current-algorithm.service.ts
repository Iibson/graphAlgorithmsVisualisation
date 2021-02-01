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
  private currentAlgorithmTimeSource = new BehaviorSubject<number>(510)
  currentAlgorithmTime = this.currentAlgorithmTimeSource.asObservable()

  constructor() { }

  changeCurrentAlgorithm(algorithm: RunningAlgorithm) {
    this.currentAlgorithmSource.next(algorithm)
  }

  changeCurrentAlgorithmTime(time: number) {
    this.currentAlgorithmTimeSource.next(time)
  }
}
