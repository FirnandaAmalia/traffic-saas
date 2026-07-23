"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FolderKanban,
  Search,
  BarChart3,
  Brain,
  FileText,
  CreditCard,
  Settings,
  TrendingUp,
  Target,
  Download,
} from "lucide-react";


const ICONS = {

  dashboard: LayoutDashboard,

  folder: FolderKanban,

  search: Search,

  chart: BarChart3,

  brain: Brain,

  file: FileText,

  credit: CreditCard,

  settings: Settings,

  trending: TrendingUp,

  target: Target,

  download: Download,

};


interface SidebarNavItemProps {

  href:string;

  label:string;

  icon:keyof typeof ICONS;

}



export default function SidebarNavItem({

  href,

  label,

  icon,

}: SidebarNavItemProps){


  const pathname = usePathname();


  const Icon = ICONS[icon];


  const isActive =
    pathname === href
    ||
    (
      href !== "/dashboard"
      &&
      pathname.startsWith(href)
    );


  return (

    <Link

      href={href}

      className={`
        flex
        items-center
        gap-3
        rounded-xl
        px-3
        py-3
        text-sm
        transition-all
        duration-200

        ${
          isActive

          ?

          "bg-blue-50 text-blue-700 font-semibold shadow-sm"

          :

          "text-slate-600 hover:bg-slate-100 hover:text-slate-900"

        }
      `}

    >


      <Icon

        className={`
          h-5
          w-5

          ${
            isActive

            ?

            "text-blue-600"

            :

            "text-slate-500"

          }
        `}

      />


      <span>
        {label}
      </span>


    </Link>

  );

}