/** @format */
export const GET_TYPE = /^\[object ([A-z]+)\]$/

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function type(variable: unknown): string {
    const match = Object.prototype.toString.call(variable).match(GET_TYPE)
    if (match && (match as string[]).length === 2) {
        return match[1]
    } else {
        console.error(`[参数]:${variable},匹配结果:${match}`)
    }
}
