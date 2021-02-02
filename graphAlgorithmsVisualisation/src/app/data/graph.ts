import { Edge, Node } from "@swimlane/ngx-graph";

export interface Graph {
    nodes: Node[],
    edges: Edge[]
}

export enum PregeneratedGraph {
    Dag,
    PetersenGraph,
    StronglyConnectedComponent
}

export namespace PregeneratedGraph {
    export function generateGraph(graph: PregeneratedGraph) {
        switch (graph) {
            case PregeneratedGraph.Dag:
                return {
                    nodes: [
                        { id: '0', label: '' },
                        { id: '1', label: '' },
                        { id: '2', label: '' },
                        { id: '3', label: '' },
                        { id: '4', label: '' },
                        { id: '5', label: '' },
                    ],
                    edges: [
                        { source: '0', target: '1' },
                        { source: '0', target: '2' },
                        { source: '0', target: '3' },
                        { source: '1', target: '2' },
                        { source: '1', target: '4' },
                        { source: '2', target: '3' },
                        { source: '2', target: '4' },
                        { source: '3', target: '4' },
                        { source: '3', target: '5' },
                        { source: '4', target: '5' },
                    ]
                }
            case PregeneratedGraph.PetersenGraph:
                return { nodes: [], edges: [] }
            case PregeneratedGraph.StronglyConnectedComponent:
                return { nodes: [], edges: [] }
            default:
                return { nodes: [], edges: [] }

        }
    }

    export function numberOfNodes(graph: PregeneratedGraph) {
        switch (graph) {
            case PregeneratedGraph.Dag:
                return 6
            case PregeneratedGraph.PetersenGraph:
                return 0
            case PregeneratedGraph.StronglyConnectedComponent:
                return 0
            default:
                return 0
        }
    }
}