'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  PlusCircle,
  ShieldCheck,
  Github,
  CircleHelp,
} from 'lucide-react';

const links = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/create-pool',
    label: 'Create Pool',
    icon: PlusCircle,
  },
  {
    href: '/verify-contract',
    label: 'Verify Contract',
    icon: ShieldCheck,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M15.22 13.56a6 6 0 0 0-6.44 0"></path><path d="M16.5 16a9 9 0 0 0-9 0"></path></svg>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            MicroPool
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map(link => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === link.href}
                  tooltip={link.label}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help">
              <CircleHelp />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <a href="https://github.com/FirebaseExtended/ai-apps" target="_blank" rel="noopener noreferrer" className='w-full'>
                <SidebarMenuButton tooltip="GitHub">
                    <Github />
                    <span>Source Code</span>
                </SidebarMenuButton>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
