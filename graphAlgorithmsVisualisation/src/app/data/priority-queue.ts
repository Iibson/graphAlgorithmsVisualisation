export interface PriorityQueue<T> {
    insert(item: T, priority: number): void
    pop(): T
    isEmpty(): boolean
}

export const priorityQueue = <T>(): PriorityQueue<T> => {
    const data: [number, T][] = []

    return {
        insert: (i, p) => {
            for (let j = 0; j < data.length; j++)
                if (p < data[j][0]) {
                    data.splice(p, 0, [p, i])
                    return
                }
            data.push([p, i])
        },
        isEmpty: () => data.length == 0,
        pop: () => {
            let res = data[0][1]
            data.splice(0, 1)
            return res
        }
    }
}