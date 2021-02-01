import { Edge, Node } from "@swimlane/ngx-graph";
import { Queue } from "queue-typescript";

export class Algorithms {
    time: number;
    properties: any;

    async BFS(nodes: Node[], edges: Edge[], startingNode: Node) {
        let queue = new Queue<Node>()
        nodes.forEach(node => {
            node.data.visited = false
            node.data.parent = null
            node.data.customColor = this.properties.defaultColor
        })
        queue.enqueue(startingNode)
        startingNode.data.visited = true
        startingNode.data.shortest_path = 0
        while (queue.length > 0) {
            let node = queue.dequeue()
            node.data.customColor = this.properties.visitingColor
            await this.delay(this.time)
            for (let i = 0; i < edges.length; i++) {
                let targetNode = nodes.find(node => node.id == edges[i].target)
                if (edges[i].source == node.id && targetNode.data.visited == false) {
                    targetNode.data.visited = true
                    targetNode.data.parent = edges[i].source
                    targetNode.data.customColor = this.properties.toVisitColor
                    queue.enqueue(targetNode)
                }
            }
            await this.delay(this.time)
            node.data.customColor = this.properties.visitedColor
        }
    }

    async DFS(nodes: Node[], edges: Edge[], startingNode: Node) {
        nodes.forEach(node => {
            node.data.visited = false
            node.data.parent = null
            node.data.customColor = this.properties.defaultColor
        })
        let time = 0
        await this.visitDFS(startingNode, nodes, edges, time)
        for (let i = 0; i < nodes.length; i++) {
            if (!nodes[i].data.visited)
                await this.visitDFS(nodes[i], nodes, edges, time)
        }
    }

    async visitDFS(node: Node, nodes: Node[], edges: Edge[], time: number) {
        await this.delay(this.time)
        node.data.customColor = this.properties.visitingColor
        node.data.entry = time
        time++;
        node.data.visited = true
        for (let i = 0; i < edges.length; i++) {
            if (edges[i].source == node.id) {
                let targetNode = nodes.find(res => res.id == edges[i].target)
                if (!targetNode.data.visited) {
                    await this.visitDFS(targetNode, nodes, edges, time)
                }
            }
        }
        time++
        node.data.processed = time
        node.data.customColor = this.properties.visitedColor
        await this.delay(this.time)
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setTime(time: number) {
        this.time = time
    }

    constructor(time: number) {
        this.time = time
        this.properties = {
            visitedColor : "#80ff80",
            visitingColor : "#008000",
            toVisitColor: "yellow",
            defaultColor: '#ffffff'
        }
    }
}

export enum RunningAlgorithm {
    BFS,
    DFS
}