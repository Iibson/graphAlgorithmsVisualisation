import { Edge, Node } from "@swimlane/ngx-graph";
import { Queue } from "queue-typescript";
import { priorityQueue } from './priority-queue'

export class Algorithms {

    setTime(time: number) {
        AlgoSupport.time = time
    }

    async BFS(nodes: Node[], edges: Edge[], startingNode: Node) {
        startingNode = (startingNode == null) ? nodes[0] : startingNode
        let queue = new Queue<Node>()
        nodes.forEach(node => {
            node.data.visited = false
            node.data.parent = null
            node.data.customColor = AlgoSupport.properties.defaultColor
        })
        edges.forEach(edge => edge.data.customColor = '#343a40')
        queue.enqueue(startingNode)
        startingNode.data.visited = true
        startingNode.data.shortest_path = 0
        while (queue.length > 0) {
            let node = queue.dequeue()
            node.data.customColor = AlgoSupport.properties.visitingColor
            for (let i = 0; i < edges.length; i++) {
                let targetNode = nodes.find(node => node.id == edges[i].target)
                if (edges[i].source == node.id && targetNode.data.visited == false) {
                    targetNode.data.visited = true
                    targetNode.data.parent = edges[i].source
                    await AlgoSupport.delay()
                    // edges[i].data.customColor = AlgoSupport.properties.toVisitColor
                    targetNode.data.customColor = AlgoSupport.properties.toVisitColor
                    queue.enqueue(targetNode)
                }
            }
            await AlgoSupport.delay()
            // if (node.data.parent != null)
            //     edges.find(res => res.source == node.data.parent && res.target == node.id).data.customColor = AlgoSupport.properties.visitedColor
            node.data.customColor = AlgoSupport.properties.visitedColor
        }
    }

    async DFS(nodes: Node[], edges: Edge[], startingNode: Node) {
        startingNode = (startingNode == null) ? nodes[0] : startingNode
        nodes.forEach(node => {
            node.data.visited = false
            node.data.parent = null
            node.data.customColor = AlgoSupport.properties.defaultColor
        })
        edges.forEach(edge => edge.data.customColor = '#343a40')
        startingNode.data.customColor = AlgoSupport.properties.visitingColor
        let time = [0]
        await this.visitDFS(startingNode, nodes, edges, time, AlgoSupport.properties.visitedColor)
        for (let i = 0; i < nodes.length; i++) {
            if (!nodes[i].data.visited)
                await this.visitDFS(nodes[i], nodes, edges, time, AlgoSupport.properties.visitedColor)
        }
    }

    async visitDFS(node: Node, nodes: Node[], edges: Edge[], time: number[], color: string) {
        await AlgoSupport.delay()
        node.data.customColor = AlgoSupport.properties.visitingColor
        // if (node.data.parent != null)
        //     edges.find(res => res.source == node.data.parent && res.target == node.id).data.customColor = AlgoSupport.properties.visitingColor
        node.data.entry = time[0]
        time[0]++
        node.data.visited = true
        for (let i = 0; i < edges.length; i++) {
            if (edges[i].source == node.id) {
                let targetNode = nodes.find(res => res.id == edges[i].target)
                if (!targetNode.data.visited) {
                    targetNode.data.parent = node.id
                    await this.visitDFS(targetNode, nodes, edges, time, color)
                    await AlgoSupport.delay()
                }
            }
        }
        node.data.processed = time[0]
        time[0]++
        // if(node.data.parent != null)
        //     edges.find(res => res.source == node.data.parent && res.target == node.id).data.customColor = color
        node.data.customColor = color
    }

    async findStronglyConnectedComponents(nodes: Node[], edges: Edge[], startingNode: Node) {
        await this.DFS(nodes, edges, startingNode)
        nodes.sort((a, b) => b.data.processed - a.data.processed)
        edges.forEach(res => {
            let temp: string = res.source
            res.source = res.target
            res.target = temp
        })
        nodes.forEach(node => node.data.visited = false)
        for (let i = 0; i < nodes.length; i++) {
            if (!nodes[i].data.visited)
                await this.visitDFS(nodes[i], nodes, edges, [0], AlgoSupport.randomRgba())
        }
        edges.forEach(res => {
            let temp: string = res.source
            res.source = res.target
            res.target = temp
        })
        nodes.sort((a, b) => Number(a.id) - Number(b.id))
    }

    async findBridges() { //TODO

    }

    async findArticualtionPoints() { //TODO

    }

    async dijkstra(nodes: Node[], edges: Edge[], startingNode: Node) {
        startingNode = (startingNode == null) ? nodes[0] : startingNode
        let queue = priorityQueue<Node>()
        nodes.forEach(node => {
            node.data.parent = null
            node.data.path = Number.MAX_SAFE_INTEGER
            node.data.visited = false
            node.data.customColor = AlgoSupport.properties.defaultColor
        })
        edges.forEach(edge => edge.data.customColor = '#343a40')
        startingNode.data.path = 0
        queue.insert(startingNode, startingNode.data.path)
        while (!queue.isEmpty()) {
            let node: Node = queue.pop()
            if (node.data.visited) {
                node.data.customColor = AlgoSupport.properties.visitedColor
                continue
            }
            node.data.visited = true
            if (node.data.parent != null)
                edges.find(res => res.source == node.data.parent && res.target == node.id).data.customColor = AlgoSupport.properties.visitedColor
            node.data.customColor = AlgoSupport.properties.visitingColor
            for (let i = 0; i < edges.length; i++) {
                let targetNode = nodes.find(node => node.id == edges[i].target)
                if (edges[i].source == node.id && targetNode.data.visited == false) {
                    if (targetNode.data.path > node.data.path + edges[i].data.length) {
                        targetNode.data.parent = node.id
                        targetNode.data.path = node.data.path + edges[i].data.length
                        queue.insert(targetNode, targetNode.data.path)
                        if (targetNode.data.parent != null)
                            edges.find(res => res.source == targetNode.data.parent && res.target == targetNode.id).data.customColor = AlgoSupport.properties.toVisitColor
                        targetNode.data.customColor = AlgoSupport.properties.toVisitColor
                        await AlgoSupport.delay()
                    }
                }
            }
            if (node.data.parent != null)
                edges.find(res => res.source == node.data.parent && res.target == node.id).data.customColor = AlgoSupport.properties.visitedColor
            node.data.customColor = AlgoSupport.properties.visitedColor
            await AlgoSupport.delay()
        }
    }

    async prim(nodes: Node[], edges: Edge[]) {
        let startingNode = nodes[0]
        let queue = priorityQueue<Node>()
        nodes.forEach(node => {
            node.data.path = Number.MAX_SAFE_INTEGER
            node.data.visited = false
            node.data.customColor = AlgoSupport.properties.defaultColor
            node.data.parent = null
        })
        edges.forEach(edge => edge.data.customColor = '#343a40')
        startingNode.data.path = 0
        queue.insert(startingNode, startingNode.data.path)
        while (!queue.isEmpty()) {
            let node: Node = queue.pop()
            if (node.data.visited) {
                node.data.customColor = AlgoSupport.properties.visitedColor
                continue
            }
            node.data.visited = true
            if (node.data.parent != null)
                edges.find(res => res.source == node.data.parent && res.target == node.id).data.customColor = AlgoSupport.properties.visitedColor
            node.data.customColor = AlgoSupport.properties.visitingColor
            for (let i = 0; i < edges.length; i++) {
                let targetNode = nodes.find(node => node.id == edges[i].target)
                if (edges[i].source == node.id && targetNode.data.visited == false) {
                    if (targetNode.data.path > node.data.path) {
                        targetNode.data.parent = node.id
                        targetNode.data.path = node.data.path
                        queue.insert(targetNode, targetNode.data.path)
                        if (targetNode.data.parent != null)
                            edges.find(res => res.source == targetNode.data.parent && res.target == targetNode.id).data.customColor = AlgoSupport.properties.toVisitColor
                        targetNode.data.customColor = AlgoSupport.properties.toVisitColor
                        await AlgoSupport.delay()
                    }
                }
            }
            if (node.data.parent != null)
                edges.find(res => res.source == node.data.parent && res.target == node.id).data.customColor = AlgoSupport.properties.visitedColor
            node.data.customColor = AlgoSupport.properties.visitedColor
            await AlgoSupport.delay()
        }
    }
}

class AlgoSupport {
    static time: number;
    static properties = {
        visitedColor: "#80ff80",
        visitingColor: "#008000",
        toVisitColor: "yellow",
        defaultColor: '#ffffff'
    }

    static setTime(time: number) {
        this.time = time
    }

    static randomRgba(): string {
        return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
    }

    static delay() {
        return new Promise(resolve => setTimeout(resolve, this.time));
    }
}
