import { useCallback, useEffect, useReducer, useRef } from 'react'
import { ITransaction } from '@/lib/types'
import { createWebSocket, closeWebSocket } from '@/utils/socket'
import { v4 as uuid } from 'uuid'

const SOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL!

type TransactionState = {
    transactions: ITransaction[]
    totalAmount: number
    isRunning: boolean
}

type TransactionAction =
    | { type: 'ADD_TRANSACTIONS'; payload: ITransaction[] }
    | { type: 'RESET' }
    | { type: 'SET_RUNNING'; payload: boolean }

const initialState: TransactionState = {
    transactions: [],
    totalAmount: 0,
    isRunning: false,
}

function transactionReducer(
    state: TransactionState,
    action: TransactionAction
): TransactionState {
    switch (action.type) {
        case 'ADD_TRANSACTIONS':
            return {
                ...state,
                transactions: [...state.transactions, ...action.payload],
                totalAmount:
                    state.totalAmount +
                    action.payload.reduce((sum, { amount }) => sum + amount, 0),
            }
        case 'RESET':
            return { ...initialState, isRunning: state.isRunning }
        case 'SET_RUNNING':
            return { ...state, isRunning: action.payload }
        default:
            return state
    }
}

export function useBTCTransactions() {
    const socket = useRef<WebSocket | null>(null)
    const [state, dispatch] = useReducer(transactionReducer, initialState)

    const handleMessage = useCallback((event: MessageEvent) => {
        try {
            const data = JSON.parse(event.data)
            const from = data.x.inputs[0]?.prev_out.addr || 'Unknown'
            const to = data.x.out as Array<{ addr: string; value: number }>

            const newTransactions = to
                .map((t) => ({
                    id: uuid(),
                    from,
                    to: t.addr,
                    amount: t.value / 100000000,
                }))
                .filter(({ amount }) => amount > 0)

            if (newTransactions.length > 0) {
                dispatch({ type: 'ADD_TRANSACTIONS', payload: newTransactions })
            }
        } catch (error) {
            console.error('Error processing message:', error)
        }
    }, [])

    const handleError = useCallback((error: Event) => {
        console.error('WebSocket error:', error)
        dispatch({ type: 'SET_RUNNING', payload: false })
    }, [])

    const start = useCallback(() => {
        socket.current = createWebSocket(
            SOCKET_URL,
            'unconfirmed_sub',
            handleMessage,
            handleError
        )
        dispatch({ type: 'SET_RUNNING', payload: true })
    }, [handleMessage, handleError])

    const stop = useCallback(() => {
        if (socket.current) {
            closeWebSocket(socket.current)
            socket.current = null
            dispatch({ type: 'SET_RUNNING', payload: false })
        }
    }, [])

    const reset = useCallback(() => {
        dispatch({ type: 'RESET' })
    }, [])

    useEffect(() => {
        return stop
    }, [stop])

    return {
        transactions: state.transactions,
        totalAmount: state.totalAmount,
        isRunning: state.isRunning,
        start,
        stop,
        reset,
    }
}
