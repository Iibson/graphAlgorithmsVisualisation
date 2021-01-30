import { Component, OnInit } from '@angular/core';
import { Vertex } from '../data/vertex';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  vertices: Vertex[] = []
  isAddingVertecies: boolean

  constructor() {
    this.isAddingVertecies = true
  }

  ngOnInit(): void {
  }

  addVertex(x: number, y: number) {
    this.vertices.push({ number: this.vertices.length, x: x, y: y })
  }

  getVertices() {
    return this.vertices
  }

  onMouseClick(e: MouseEvent) {
    if (this.isAddingVertecies)
      this.addVertex(e.x, e.y)
  }

  changeIsAddingVertecies() {
    this.isAddingVertecies = !this.isAddingVertecies
  }
}
