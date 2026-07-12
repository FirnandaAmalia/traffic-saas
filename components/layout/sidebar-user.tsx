"use client";

import { signOut } from "next-auth/react";

import {
  LogOut,
  Settings,
  CreditCard,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

interface SidebarUserProps {
  name?: string |null;
  email?: string |null;
  image?: string |null;
}

export default function SidebarUser({
  name,
  email,
  image,
}: SidebarUserProps) {
  return (
    <div className="mt-auto rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center gap-3 p-4">

        <Avatar className="h-12 w-12">

          <AvatarImage src={image ?? ""} />

          <AvatarFallback>
            {name?.charAt(0) ?? "U"}
          </AvatarFallback>

        </Avatar>

        <div className="min-w-0">

          <p className="truncate font-semibold">
            {name}
          </p>

          <p className="truncate text-xs text-slate-500">
            {email}
          </p>

        </div>

      </div>

      <div className="border-t">

        <button className="flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-slate-50">

          <Settings className="h-4 w-4" />

          Profile & Settings

        </button>

        <button className="flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-slate-50">

          <CreditCard className="h-4 w-4" />

          Billing

        </button>

      </div>

      <div className="border-t p-3">

        <Button
          variant="destructive"
          className="w-full justify-start gap-2"
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOut className="h-4 w-4" />

          Logout

        </Button>

      </div>

    </div>
  );
}