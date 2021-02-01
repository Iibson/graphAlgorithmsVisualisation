import { Edge, Node } from "@swimlane/ngx-graph";
import { Queue } from "queue-typescript";

export class Algorithms {

    async BFS(nodes: Node[], edges: Edge[], startingNode: Node) {
        let queue = new Queue<Node>()
        nodes.forEach(node => {
            node.data.visited = false
            node.data.parent = null
            node.data.customColor = '#ffffff'
        })
        queue.enqueue(startingNode)
        startingNode.data.visited = true
        startingNode.data.shortest_path = 0
        while (queue.length > 0) {
            let node = queue.dequeue()
            node.data.customColor = "#008000"
            await this.delay(1000)
            for (let i = 0; i < edges.length; i++) {
                let targetNode = nodes.find(node => node.id == edges[i].target)
                if (edges[i].source == node.id && targetNode.data.visited == false) {
                    targetNode.data.visited = true
                    targetNode.data.parent = edges[i].source
                    targetNode.data.customColor = "yellow"
                    queue.enqueue(targetNode)
                }
            }
            await this.delay(1000)
            node.data.customColor = "#80ff80"
        }
    }

    async DFS(nodes: Node[], edges: Edge[]) {
        nodes.forEach(node => {
            node.data.visited = false
            node.data.parent = null
            node.data.customColor = '#ffffff'
        })
        let time = 0
        for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i].data.visited)
            await this.visitDFS(nodes[i], nodes, edges, time)
        }
    }

    async visitDFS(node: Node, nodes: Node[], edges: Edge[], time: number) {
        await this.delay(1000)
        node.data.customColor = "#008000"
        node.data.entry = time
        time++;
        node.data.visited = true
        // edges.forEach(async edge => {
        //     if (edge.source == node.id) {
        //         let targetNode = nodes.find(res => res.id == edge.target)
        //         if (!targetNode.data.visited){
        //             await this.visitDFS(targetNode, nodes, edges, time)
        //         }
        //     }
        // })
        for (let i = 0; i < edges.length; i++) {
            if (edges[i].source == node.id) {
                let targetNode = nodes.find(res => res.id == edges[i].target)
                if (!targetNode.data.visited){
                    await this.visitDFS(targetNode, nodes, edges, time)
                }
            }
        }
        time++
        node.data.processed = time
        node.data.customColor = "#80ff80"
        await this.delay(1000)
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
