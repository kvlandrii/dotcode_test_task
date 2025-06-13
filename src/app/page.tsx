'use client'
import { Suspense } from 'react'
import Loading from './loading'
import dynamic from 'next/dynamic'
import FullScreenLoader from '@/components/loaders/FullScreenLoader'

const Workspace = dynamic(() => import('./WorkspacePageContent'), {
    loading: () => <FullScreenLoader />,
})

export default function Home() {
    return (
        <Suspense fallback={<Loading />}>
            <Workspace />
        </Suspense>
    )
}
