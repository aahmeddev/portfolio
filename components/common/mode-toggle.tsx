"use client";

import { useTheme } from "next-themes";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 px-0 rounded-full border border-border/60">
          <Icons.sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Icons.moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Icons.moon className="mr-2 h-4 w-4" />
          <span>Dark (Biotech Slate)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Icons.sun className="mr-2 h-4 w-4" />
          <span>Light (Lab Clean)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Icons.laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
