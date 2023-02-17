import * as process from "process"
import * as path from "path"

export function getLocationInfo(depth: number): string {
    const e = new Error();
    const regex = /\((.*)\)$/
    //const regex = /\((.*):(\d+):(\d+)\)$/ //further splitted; file,line,column,
    if (e.stack === undefined) {
        throw new Error("NO STACK INFO")
    } const line = e.stack.split("\n")[depth + 2]
    const match = regex.exec(line);
    return path.relative(process.cwd(), (() => {
        if (match === null) {
            const begin = "    at /"
            if (line.startsWith(begin)) {
                return path.relative(process.cwd(), line.substring(begin.length - 1));
            } else {
                throw new Error(`COULD NOT PARSE STACK LINE: ${line}`)
            }
        } else {
            return match[1]
        }
    })())
}

