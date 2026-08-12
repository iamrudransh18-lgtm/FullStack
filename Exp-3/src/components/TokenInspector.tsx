import { useState } from "react";
import { ChevronDown, LockKeyhole, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { decodeUnverified } from "@/lib/jwt";

export function TokenInspector() {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);

  if (!token) return null;

  const decoded = decodeUnverified(token);

  return (
    <section className="relative mt-10 overflow-hidden rounded-2xl border border-blue-900/50 bg-[#071326] shadow-[0_15px_40px_rgba(0,0,0,0.4)]">

      {/* Spider-Man red accent */}
      <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[#e21b2d] via-red-500 to-[#1261c9]" />

      <button
        onClick={() => setOpen((o) => !o)}
        className="
          flex w-full items-center justify-between
          px-5 py-5
          text-left
          text-sm font-bold
          text-white
          transition-all
          hover:bg-white/[0.03]
        "
      >
        <div className="flex items-center gap-3">

          {/* Security icon */}
          <div
            className="
              flex size-10 items-center justify-center
              rounded-xl
              border border-red-500/25
              bg-red-500/10
              text-red-400
              shadow-[0_0_18px_rgba(226,27,45,0.12)]
            "
          >
            <LockKeyhole className="size-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="tracking-wide">
                Security / Token Inspector
              </span>

              <span
                className="
                  rounded-full
                  border border-green-500/25
                  bg-green-500/10
                  px-2 py-0.5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-widest
                  text-green-400
                "
              >
                Active
              </span>
            </div>

            <p className="mt-1 text-xs font-normal text-slate-500">
              Inspect your current authentication token
            </p>
          </div>
        </div>

        <ChevronDown
          className={`size-5 text-slate-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-blue-900/40 p-5">

          {/* Status row */}
          <div className="mb-5 grid gap-3 sm:grid-cols-2">

            <div
              className="
                rounded-xl
                border border-blue-900/40
                bg-[#040d1c]
                p-4
              "
            >
              <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Token Status
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-green-400">
                <ShieldCheck className="size-4" />
                Authentication Active
              </div>
            </div>

            <div
              className="
                rounded-xl
                border border-blue-900/40
                bg-[#040d1c]
                p-4
              "
            >
              <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Security Layer
              </div>

              <div className="text-sm font-semibold text-blue-300">
                JWT Session
              </div>
            </div>

          </div>

          {/* Decoded token */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Decoded Payload
              </span>

              <span className="text-[10px] font-semibold text-red-400">
                SPIDER OPS
              </span>
            </div>

            <pre
              className="
                overflow-x-auto
                rounded-xl
                border border-blue-900/40
                bg-[#020817]
                p-4
                font-mono
                text-xs
                leading-6
                text-blue-200
                shadow-inner
              "
            >
              {JSON.stringify(decoded, null, 2)}
            </pre>
          </div>

          {/* Raw token */}
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              Raw Authentication Token
            </div>

            <div
              className="
                break-all
                rounded-xl
                border border-red-900/30
                bg-[#020817]
                p-4
                font-mono
                text-[11px]
                leading-5
                text-slate-400
              "
            >
              {token}
            </div>
          </div>

        </div>
      )}
    </section>
  );
}