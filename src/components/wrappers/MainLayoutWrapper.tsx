import { FC } from 'react'
import Header from '../organisms/Header'

interface IMainLayoutWrapperProps {
    children: React.ReactNode
}

const MainLayoutWrapper: FC<IMainLayoutWrapperProps> = ({ children }) => {
    return (
        <div className="flex flex-col items-center gap-10">
            <Header />
            <main className='w-full'>{children}</main>
        </div>
    )
}

export default MainLayoutWrapper
