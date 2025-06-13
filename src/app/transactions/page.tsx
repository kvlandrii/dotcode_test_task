'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Loading from '../loading'
import FullScreenLoader from '@/components/loaders/FullScreenLoader'

const TransactionsPageContent = dynamic(
    () => import('./TransactionPageContent'),
    {
        loading: () => <FullScreenLoader />,
    }
)

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <TransactionsPageContent />
        </Suspense>
    )
}
