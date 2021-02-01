import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RunningAlgorithm } from 'src/app/data/algorithms';

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
