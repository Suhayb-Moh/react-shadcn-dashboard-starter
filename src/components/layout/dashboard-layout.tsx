import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '../app-sidebar';
import Header from '../shared/header';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
