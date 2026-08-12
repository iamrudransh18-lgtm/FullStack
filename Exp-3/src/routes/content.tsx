import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  FileText,
  Pencil,
  Plus,
  Trash2,
  Shield,
  Radio,
} from "lucide-react";

import { useAuth } from "@/lib/auth";
import { RoleNav } from "@/components/RoleNav";
import { RequireRole } from "@/components/RequireRole";
import { PostDialog } from "@/components/PostDialog";
import { Button } from "@/components/ui/button";

import {
  createPost,
  deletePost,
  updatePost,
  usePosts,
  type Post,
} from "@/lib/posts";

export const Route = createFileRoute("/content")({
  head: () => ({
    meta: [
      {
        title: "Spider Ops - Content Network",
      },
      {
        name: "description",
        content: "Spider Ops content management network.",
      },
      {
        property: "og:title",
        content: "Spider Ops - Content Network",
      },
      {
        property: "og:description",
        content: "Role-based content management system.",
      },
    ],
  }),

  component: Content,
});

function Content() {
  const { ready, user, role } = useAuth();
  const navigate = useNavigate();

  const posts = usePosts();

  const [editing, setEditing] = useState<Post | undefined>(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) {
      navigate({ to: "/" });
    }
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return null;
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-6 sm:px-8">

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <RoleNav />

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header
        className="
          relative mt-10 overflow-hidden rounded-2xl
          border border-blue-900/50
          bg-[#071326]
          p-7
          shadow-[0_15px_40px_rgba(0,0,0,0.4)]
        "
      >
        {/* Spider-Man top line */}
        <div
          className="
            absolute left-0 right-0 top-0 h-[3px]
            bg-gradient-to-r
            from-[#e21b2d]
            via-red-500
            to-[#1261c9]
          "
        />

        {/* Background glow */}
        <div
          className="
            pointer-events-none
            absolute -right-20 -top-20
            size-64 rounded-full
            bg-red-600/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute -bottom-32 left-1/3
            size-72 rounded-full
            bg-blue-600/10
            blur-3xl
          "
        />

        <div
          className="
            relative flex flex-col
            justify-between gap-6
            sm:flex-row sm:items-center
          "
        >

          {/* LEFT SIDE */}
          <div>

            {/* System label */}
            <div
              className="
                mb-3 flex items-center gap-2
                text-xs font-bold uppercase
                tracking-[0.2em]
                text-red-400
              "
            >
              <Radio className="size-3.5" />

              Spider Ops / Content Network
            </div>

            {/* Title */}
            <h1
              className="
                flex items-center gap-3
                text-4xl font-black
                tracking-tight text-white
                sm:text-5xl
              "
            >
              <span
                className="
                  flex size-12 items-center
                  justify-center rounded-xl
                  border border-red-500/25
                  bg-red-500/10
                  shadow-[0_0_20px_rgba(226,27,45,0.12)]
                "
              >
                <FileText className="size-6 text-red-400" />
              </span>

              Posts
            </h1>

            {/* Description */}
            <p
              className="
                mt-4 max-w-2xl
                text-sm leading-6
                text-slate-400
              "
            >
              Manage the content network from your
              administrative control center.
            </p>

            {/* Role */}
            <div
              className="
                mt-3 flex items-center gap-2
                text-xs text-slate-500
              "
            >
              Current clearance:

              <span
                className="
                  rounded-full
                  border border-red-500/25
                  bg-red-500/10
                  px-2.5 py-1
                  font-mono font-bold
                  uppercase
                  text-red-400
                "
              >
                {role}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            className="
              flex flex-col
              items-start gap-3
              sm:items-end
            "
          >

            {/* Network status */}
            <div
              className="
                flex items-center gap-2
                rounded-full
                border border-green-500/20
                bg-green-500/10
                px-3 py-1.5
                text-[10px]
                font-black uppercase
                tracking-widest
                text-green-400
              "
            >
              <span
                className="
                  size-1.5 rounded-full
                  bg-green-400
                  shadow-[0_0_8px_rgba(74,222,128,0.8)]
                "
              />

              Network Online
            </div>

            {/* New post */}
            <RequireRole permission="post:create">
              <Button
                onClick={() => {
                  setEditing(undefined);
                  setOpen(true);
                }}
                className="
                  bg-[#e21b2d]
                  font-bold text-white
                  shadow-[0_8px_25px_rgba(226,27,45,0.25)]
                  hover:bg-[#c91627]
                "
              >
                <Plus className="mr-2 size-4" />

                New Post
              </Button>
            </RequireRole>
          </div>
        </div>
      </header>

      {/* =====================================================
          DATABASE HEADER
      ===================================================== */}

      <div
        className="
          mt-8 flex flex-col
          justify-between gap-3
          sm:flex-row sm:items-center
        "
      >
        <div>
          <p
            className="
              text-xs font-bold
              uppercase tracking-[0.18em]
              text-slate-500
            "
          >
            Content Database
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {posts.length}{" "}
            {posts.length === 1 ? "post" : "posts"} detected
          </p>
        </div>

        <div
          className="
            flex items-center gap-2
            text-xs text-slate-500
          "
        >
          <Shield className="size-4 text-blue-400" />

          Role-based access enabled
        </div>
      </div>

      {/* =====================================================
          POSTS
      ===================================================== */}

      <ul className="mt-5 space-y-4">

        {posts.map((post) => {

          /*
           * Convert the status to a string before checking it.
           * This avoids TypeScript problems if the Post type
           * uses a union/enum for status.
           */
          const status = String(post.status);
          const isPublished =
            status.toLowerCase() === "published";

          return (
            <li
              key={post.id}
              className="
                group relative overflow-hidden
                rounded-2xl
                border border-blue-900/40
                bg-[#071326]
                p-5
                shadow-[0_10px_30px_rgba(0,0,0,0.28)]
                transition-all duration-200
                hover:-translate-y-1
                hover:border-blue-700/50
                hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)]
              "
            >

              {/* Left accent */}
              <div
                className="
                  absolute bottom-0 left-0 top-0
                  w-1
                  bg-gradient-to-b
                  from-[#e21b2d]
                  to-[#1261c9]
                  opacity-70
                  transition-opacity
                  group-hover:opacity-100
                "
              />

              <div
                className="
                  flex flex-col
                  justify-between gap-5
                  pl-2
                  sm:flex-row
                  sm:items-center
                "
              >

                {/* POST INFORMATION */}
                <div className="min-w-0">

                  <div
                    className="
                      flex items-center gap-3
                    "
                  >

                    {/* Icon */}
                    <div
                      className="
                        flex size-10 shrink-0
                        items-center justify-center
                        rounded-lg
                        border border-blue-900/40
                        bg-[#040d1c]
                      "
                    >
                      <FileText
                        className="
                          size-4
                          text-blue-400
                        "
                      />
                    </div>

                    {/* Title */}
                    <h2
                      className="
                        truncate
                        text-lg font-bold
                        text-white
                      "
                    >
                      {post.title}
                    </h2>
                  </div>

                  {/* Excerpt */}
                  <p
                    className="
                      mt-3
                      text-sm leading-6
                      text-slate-400
                    "
                  >
                    {post.excerpt}
                  </p>

                  {/* STATUS */}
                  <div
                    className="
                      mt-4 flex
                      items-center gap-2
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        font-black uppercase
                        tracking-[0.15em]
                        text-slate-600
                      "
                    >
                      Status
                    </span>

                    <span
                      className={`
                        rounded-full
                        px-2.5 py-1
                        text-[10px]
                        font-black uppercase
                        tracking-wider
                        ${
                          isPublished
                            ? `
                              border
                              border-green-500/20
                              bg-green-500/10
                              text-green-400
                            `
                            : `
                              border
                              border-yellow-500/20
                              bg-yellow-500/10
                              text-yellow-400
                            `
                        }
                      `}
                    >
                      {status}
                    </span>
                  </div>
                </div>

                {/* =================================================
                    ACTION BUTTONS
                ================================================= */}

                <div
                  className="
                    flex shrink-0 gap-2
                  "
                >

                  {/* EDIT */}
                  <RequireRole permission="post:update">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditing(post);
                        setOpen(true);
                      }}
                      className="
                        border-blue-900/50
                        bg-[#040d1c]
                        text-slate-300
                        hover:border-blue-500/50
                        hover:bg-blue-500/10
                        hover:text-blue-300
                      "
                    >
                      <Pencil className="mr-2 size-4" />

                      Edit
                    </Button>
                  </RequireRole>

                  {/* DELETE */}
                  <RequireRole permission="post:delete">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        deletePost(post.id);
                      }}
                      className="
                        text-slate-500
                        hover:bg-red-500/10
                        hover:text-red-400
                      "
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </RequireRole>

                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {posts.length === 0 && (
        <div
          className="
            mt-5 rounded-2xl
            border border-dashed
            border-blue-900/50
            bg-[#071326]
            px-6 py-14
            text-center
          "
        >
          <div
            className="
              mx-auto flex size-14
              items-center justify-center
              rounded-full
              border border-blue-900/50
              bg-blue-500/10
            "
          >
            <FileText
              className="
                size-6
                text-blue-400
              "
            />
          </div>

          <h2
            className="
              mt-4
              text-lg font-bold
              text-white
            "
          >
            No posts detected
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            The content network is currently empty.
          </p>
        </div>
      )}

      {/* =====================================================
          POST DIALOG
      ===================================================== */}

      <PostDialog
        key={editing?.id ?? "new"}
        open={open}
        onOpenChange={setOpen}
        post={editing}
        onSubmit={(values) => {
          if (editing) {
            updatePost(editing.id, values);
          } else {
            createPost(values, role ?? "admin");
          }
        }}
      />
    </main>
  );
}