"use client";

import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function RoleSidebar({
  links,
  role,
  children,
}: {
  links: any[];
  role: string;
  children: React.ReactNode;
}) {

  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-neutral-100 dark:bg-neutral-900">

      <Sidebar open={open} setOpen={setOpen}>

        <SidebarBody className="flex flex-col justify-between">

          <div>

            <h2 className="mb-6 text-lg font-bold text-black dark:text-white">
              {role} Panel
            </h2>

            <div className="flex flex-col gap-2">

              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}

            </div>

          </div>

        </SidebarBody>

      </Sidebar>

      <main className="flex-1 overflow-y-auto p-10">
        {children}
      </main>

    </div>
  );
}