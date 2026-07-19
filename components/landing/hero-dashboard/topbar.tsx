"use client";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  Search,
  Settings2,
} from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
        flex
        items-center
        justify-between

        border-b
        border-slate-200

        bg-white/70

        px-8
        py-5

        backdrop-blur-xl
      "
    >
      {/* Left */}

      <div>

        <h2 className="text-2xl font-black tracking-tight text-slate-900">

          SEO Dashboard

        </h2>

        <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">

          <span className="relative flex h-2.5 w-2.5">

            <span
              className="
                absolute
                inline-flex

                h-full
                w-full

                animate-ping

                rounded-full

                bg-emerald-500

                opacity-60
              "
            />

            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />

          </span>

          Live syncing

        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div
          className="
            flex
            items-center
            gap-3

            rounded-2xl

            border
            border-slate-200

            bg-white

            px-4
            py-3

            shadow-sm

            transition-all
            duration-300

            hover:border-violet-300
            hover:shadow-md

            focus-within:border-violet-500
            focus-within:ring-4
            focus-within:ring-violet-100
          "
        >

          <Search className="h-4 w-4 text-slate-400" />

          <input
            placeholder="Search pages..."
            className="
              w-52

              bg-transparent

              text-sm

              outline-none

              placeholder:text-slate-400
            "
          />

        </div>

        {/* Date */}

        <button
          className="
            flex
            items-center
            gap-2

            rounded-2xl

            border
            border-slate-200

            bg-white

            px-4
            py-3

            shadow-sm

            transition-all
            duration-300

            hover:border-violet-300
            hover:bg-slate-50
            hover:shadow-md
          "
        >

          <CalendarDays className="h-4 w-4 text-slate-500" />

          <span className="text-sm font-medium">

            Last 28 Days

          </span>

          <ChevronDown className="h-4 w-4 text-slate-500" />

        </button>

        {/* Filter */}

        <button
          className="
            flex
            h-11
            w-11

            items-center
            justify-center

            rounded-2xl

            border
            border-slate-200

            bg-white

            shadow-sm

            transition-all
            duration-300

            hover:rotate-90
            hover:bg-slate-50
            hover:shadow-md
          "
        >

          <Settings2 className="h-5 w-5 text-slate-600" />

        </button>

        {/* Notification */}

        <button
          className="
            relative

            flex
            h-11
            w-11

            items-center
            justify-center

            rounded-2xl

            border
            border-slate-200

            bg-white

            shadow-sm

            transition-all
            duration-300

            hover:bg-slate-50
            hover:shadow-md
          "
        >

          <Bell className="h-5 w-5 text-slate-600" />

          <span
            className="
              absolute
              right-3
              top-3

              flex
              h-2.5
              w-2.5
            "
          >

            <span
              className="
                absolute
                inline-flex

                h-full
                w-full

                animate-ping

                rounded-full

                bg-emerald-500

                opacity-70
              "
            />

            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />

          </span>

        </button>

        {/* Avatar */}

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-12
              w-12

              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-br

              from-violet-600
              to-sky-500

              font-bold

              text-white

              ring-4
              ring-white

              shadow-xl
            "
          >

            FA

          </div>

          <div className="hidden xl:block">

            <p className="text-sm font-semibold">
  Workspace Owner
</p>

<p className="text-xs text-slate-500">
  SEO Specialist
</p>

          </div>

        </div>

      </div>

    </header>
  );
}