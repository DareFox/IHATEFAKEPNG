const previousUrlMap: Record<number,URL> = {};



export function updatePreviousUrl(id: number, url: URL) {
    previousUrlMap[id] = url
}

export function removePreviousUrl(id: number) {
    delete previousUrlMap[id]
}

export function getPreviousUrl(id: number): URL | undefined {
    return previousUrlMap[id]
}

