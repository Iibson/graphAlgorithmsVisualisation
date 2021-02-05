export class UnionNode {
    parent: UnionNode
    rank: number
    color: string

    public static findSet(x: UnionNode): UnionNode {
        if (x != x.parent)
            x.parent = this.findSet(x.parent)
        return x.parent
    }

    public static findColor(x: UnionNode) {
        if (x.color != x.parent.color)
        x.parent.color = this.findColor(x.parent)
    return x.color
    }

    public static union(x: UnionNode, y: UnionNode) {
        x = this.findSet(x)
        y = this.findSet(y)
        if (x.rank > y.rank){
            y.parent = x
            y.color = x.color
            return x
        }
        else {
            x.parent = y
            x.color = y.color
            if (x.rank == y.rank)
                y.rank++
            return y
        }
    }

    constructor(color: string){
        this.color = color
        this.parent = this
        this.rank = 0
    }
}
