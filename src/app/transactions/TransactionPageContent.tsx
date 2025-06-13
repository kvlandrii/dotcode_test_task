'use client'

import BTCSumDisplay from '@/components/atoms/BTCSumDisplay'
import ControlButton from '@/components/atoms/ControlButton'
import BTCTable from '@/components/organisms/BTCTable'
import { useBTCTransactions } from '@/hooks/useTransactions'

const TransactionPageContent = () => {
    const { reset, start, stop, totalAmount, transactions, isRunning } =
        useBTCTransactions()

    return (
        <div className="flex flex-col items-center gap-10 py-8">
            <div className="flex gap-4 w-full max-w-4xl justify-center">
                <ControlButton
                    label="Start"
                    color={'green'}
                    onClick={start}
                    disabled={isRunning}
                />
                <ControlButton
                    label="Stop"
                    color={'red'}
                    onClick={stop}
                    disabled={!isRunning}
                />
                <ControlButton
                    label="Reset"
                    color={'yellow'}
                    onClick={reset}
                />
            </div>

            <BTCSumDisplay totalSum={totalAmount} />

            <div className="w-full max-w-5xl">
                <BTCTable transactions={transactions} />
            </div>
        </div>
    )
}

export default TransactionPageContent
