import { Sidebar } from './sidebar'

type Props = {
  children: JSX.Element
}

export const Layout = ({ children }: Props) => {
  return (
    <div className='h-full flex'>
      <Sidebar />
      <div className='p-10 w-full min-h-[100vh] bg-zinc-50 h-full ml-[248px] dark:bg-background'>{children}</div>
    </div>
  )
}
