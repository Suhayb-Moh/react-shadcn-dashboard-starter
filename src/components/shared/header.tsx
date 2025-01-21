import { navItems } from '@/constants/data';
import { usePathname } from '@/routes/hooks';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import { ModeToggle } from './theme-toggle';
import UserNav from './user-nav';

// Custom hook to find the matched path
const useMatchedPath = (pathname: string) => {
  const matchedPath =
    navItems.find((item) => item.url === pathname) ||
    navItems.find(
      (item) => pathname.startsWith(item.url + '/') && item.url !== '/'
    );
  return matchedPath?.title || '';
};

export default function Header() {
  const pathname = usePathname();
  const headingText = useMatchedPath(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {/* <Breadcrumbs /> */}
      </div>

      <div className="flex items-center gap-2 px-4">
        <div className="hidden md:flex">{/* <SearchInput /> */}</div>
        <UserNav />
        <ModeToggle />
      </div>
    </header>
  );
}
