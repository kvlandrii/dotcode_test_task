import { paths } from './paths'
import { IHeaderButton } from './types'

export const HEADER_BUTTONS: IHeaderButton[] = [
    { label: 'Workspace', href: paths.workspace.root },
    { label: 'Transactions', href: paths.transactions.root },
]

export const LOCAL_STORAGE_KEY = 'workspace-blocks'
