import { Vertex } from "./vertex";
import { Edge } from "./edge";

export class Graph {
    vertices: Vertex[];
    relations: Edge[];

    // addVertex(id: string) {
    //     this.vertices.push({ id: id })
    // }

    // addRelation(sourceId: string, targetId: string) {
    //     this.relations.push({ sourceId: Number(sourceId), targetId: Number(targetId) })
    // }

    // removeVertex(id: string) {
    //     this.vertices = this.vertices.filter(res => res.id != id)
    // }

    // removeRelation(sourceId: string, targetId: string) {
    //     this.relations = this.relations.filter(res => res.targetId != Number(targetId) && res.sourceId != Number(sourceId))
    // }
}




function BFS(graph: Graph) {
    console.log(graph)
}