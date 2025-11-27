'use client';

import {SidebarTrigger} from '@/components/ui/sidebar';
import { ConnectButton } from '@/components/web3/ConnectButton';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex w-full items-center justify-end gap-4">
        <ConnectButton />
      </div>
    </header>
  );
}
