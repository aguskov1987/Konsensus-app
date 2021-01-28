// TODO: move this into common service
export class Utility {
    public static splitArrayIntoGroups<T>(array: T[], howMany: number): T[][] {
        let idx = 0
        let result: T[][] = []

        while (idx < array.length) {
            if (idx % howMany === 0) result.push([])
            result[result.length - 1].push(array[idx++])
        }

        return result
    }
}