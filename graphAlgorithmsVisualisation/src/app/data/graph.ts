import { Edge, Node } from "@swimlane/ngx-graph";

export interface Graph {
    nodes: Node[],
    edges: Edge[],
}

export enum PregeneratedGraph {
    Dag,
    BinTree,
    StronglyConnectedComponent,
    RandomGraph
}

export namespace PregeneratedGraph {
    let temp = getRandomInt(5, 20)

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
                        { source: '1', target: '2' },
                        { source: '2', target: '3' },
                        { source: '2', target: '4' },
                        { source: '3', target: '4' },
                        { source: '3', target: '5' },
                        { source: '4', target: '5' },
                    ]
                }
            case PregeneratedGraph.BinTree:
                return {
                    nodes: [
                        { id: '0', label: '' },
                        { id: '1', label: '' },
                        { id: '2', label: '' },
                        { id: '3', label: '' },
                        { id: '4', label: '' },
                        { id: '5', label: '' },
                        { id: '6', label: '' },
                        { id: '7', label: '' },
                        { id: '8', label: '' },
                        { id: '9', label: '' },
                        { id: '10', label: '' },
                        { id: '11', label: '' },
                        { id: '12', label: '' },
                        { id: '13', label: '' },
                        { id: '14', label: '' }
                    ],
                    edges: [
                        { source: '0', target: '1' },
                        { source: '0', target: '2' },
                        { source: '1', target: '3' },
                        { source: '1', target: '4' },
                        { source: '2', target: '5' },
                        { source: '2', target: '6' },
                        { source: '3', target: '7' },
                        { source: '3', target: '8' },
                        { source: '4', target: '9' },
                        { source: '4', target: '10' },
                        { source: '5', target: '11' },
                        { source: '5', target: '12' },
                        { source: '6', target: '13' },
                        { source: '6', target: '14' }
                    ]
                }
            case PregeneratedGraph.StronglyConnectedComponent:
                return {
                    nodes: [
                        { id: '0', label: '' },
                        { id: '1', label: '' },
                        { id: '2', label: '' },
                        { id: '3', label: '' },
                        { id: '4', label: '' },
                        { id: '5', label: '' },
                        { id: '6', label: '' },
                        { id: '7', label: '' },
                        { id: '8', label: '' },
                    ],
                    edges: [
                        { source: '0', target: '1' },
                        { source: '1', target: '0' },
                        { source: '2', target: '3' },
                        { source: '3', target: '4' },
                        { source: '4', target: '0' },
                        { source: '4', target: '2' },
                        { source: '5', target: '2' },
                        { source: '5', target: '6' },
                        { source: '6', target: '7' },
                        { source: '7', target: '8' },
                        { source: '8', target: '0' },
                        { source: '8', target: '5' }
                    ]
                }
            case PregeneratedGraph.RandomGraph: {
                let nodes: Node[] = []
                let edges: Edge[] = []
                for (let i = 0; i < temp; i++)
                    nodes.push({ id: String(i), label: '' })
                for (let i = 0; i < Number(temp / 10) * getRandomInt(5, 10); i++)
                    edges.push({
                        source: String(getRandomInt(0, temp - 1)),
                        target: String(getRandomInt(0, temp - 1)),
                        data: {
                            length: getRandomInt(5, 20)
                        }
                    })
                nodes.forEach(node => {
                    edges.push({
                        source: node.id,
                        target: String(getRandomInt(0, temp - 1)),
                        data: {
                            length: getRandomInt(5, 20)
                        }
                    })
                })
                edges = [...new Set(edges)]
                edges = edges.filter(res => res.source != res.target)
                return {
                    nodes: nodes,
                    edges: edges
                }
            }
            default:
                return { nodes: [], edges: [] }
        }
    }

    export function numberOfNodes(graph: PregeneratedGraph) {
        temp = getRandomInt(5, 20)
        switch (graph) {
            case PregeneratedGraph.Dag:
                return 6
            case PregeneratedGraph.BinTree:
                return 15
            case PregeneratedGraph.StronglyConnectedComponent:
                return 9
            case PregeneratedGraph.RandomGraph:
                return temp
            default:
                return 0
        }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}