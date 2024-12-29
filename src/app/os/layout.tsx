import { SidebarProvider } from '@/components/ui/sidebar'

export default function Layout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return <SidebarProvider>{children}</SidebarProvider>
}
