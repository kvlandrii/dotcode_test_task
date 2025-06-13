export const createWebSocket = (
    socketUrl: string,
    op: string,
    onMessage: (event: MessageEvent) => void,
    onError: (error: Event) => void
): WebSocket => {
    const socket = new WebSocket(socketUrl)

    socket.onopen = () => {
        socket.send(JSON.stringify({ op }))
    }

    socket.onmessage = onMessage
    socket.onerror = onError

    return socket
}

export const closeWebSocket = (socket: WebSocket | null): void => {
    if (socket) {
        socket.close()
    }
}
