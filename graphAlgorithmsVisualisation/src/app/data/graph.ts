import { Vertex } from "./vertex";
import { Edge } from './edge'

export interface Graph {
    vertices:Vertex[],
    relations:Edge[]
}


export function BFS(graph: Graph) {
    console.log(graph)
}