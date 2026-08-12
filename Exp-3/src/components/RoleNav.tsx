import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function RoleNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <nav
      className="
        relative flex items-center justify-between gap-4
        overflow-hidden rounded-2xl
        border border-blue-900/50
        bg-[#071326]
        px-5 py-3
        shadow-[0_10px_35px_rgba(0,0,0,0.45)]
      "
    >
      {/* Spider-Man red accent line */}
      <div
        className="
          absolute left-0 right-0 top-0 h-[3px]
          bg-gradient-to-r from-[#e21b2d] via-red-500 to-[#1261c9]
        "
      />

      {/* Logo + Navigation */}
      <div className="flex items-center gap-3">
        {/* Spider logo */}
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className="
            flex items-center gap-2
            px-2 py-2
            text-white
            transition-all
            hover:scale-[1.02]
          "
        >
          <span
            className="
              text-2xl
              drop-shadow-[0_0_10px_rgba(226,27,45,0.65)]
            "
          >
            🕷️
          </span>

          <div className="hidden sm:block">
            <div
              className="
                text-sm font-black tracking-[0.18em]
                text-white
              "
            >
              SPIDER OPS
            </div>

            <div
              className="
                text-[9px] font-semibold tracking-[0.2em]
                text-slate-500
              "
            >
              ADMIN NETWORK
            </div>
          </div>
        </Link>

        {/* Dashboard */}
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{
            className:
              "bg-[#e21b2d]/15 text-white border border-[#e21b2d]/30 shadow-[0_0_15px_rgba(226,27,45,0.12)]",
          }}
          className="
            rounded-lg
            border border-transparent
            px-3 py-2
            text-sm font-semibold
            text-slate-400
            transition-all
            hover:border-blue-900/50
            hover:bg-blue-950/40
            hover:text-white
          "
        >
          Dashboard
        </Link>

        {/* Content */}
        <Link
          to="/content"
          activeProps={{
            className:
              "bg-[#1261c9]/15 text-white border border-[#1261c9]/30 shadow-[0_0_15px_rgba(18,97,201,0.12)]",
          }}
          className="
            rounded-lg
            border border-transparent
            px-3 py-2
            text-sm font-semibold
            text-slate-400
            transition-all
            hover:border-blue-900/50
            hover:bg-blue-950/40
            hover:text-white
          "
        >
          Content
        </Link>
      </div>

      {/* User Controls */}
      <div className="flex items-center gap-3">
        {/* Role badge */}
        <Badge
          className="
            border border-[#e21b2d]/30
            bg-[#e21b2d]/10
            px-3 py-1
            text-[10px]
            font-black
            uppercase
            tracking-[0.12em]
            text-red-400
            shadow-[0_0_12px_rgba(226,27,45,0.08)]
          "
        >
          {user.role}
        </Badge>

        {/* Logout */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            logout();
            navigate({ to: "/" });
          }}
          className="
            border-slate-700
            bg-slate-950/40
            text-slate-300
            transition-all
            hover:border-red-500/50
            hover:bg-red-500/10
            hover:text-red-400
          "
        >
          <LogOut className="mr-2 size-4" />
          Logout
        </Button>
      </div>
    </nav>
  );
}