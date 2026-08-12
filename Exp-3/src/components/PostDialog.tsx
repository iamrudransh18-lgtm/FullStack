import { useState } from "react";
import { FileText, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Post } from "@/lib/posts";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post?: Post | undefined;
  onSubmit: (
    values: Pick<Post, "title" | "excerpt" | "status">,
  ) => void;
};

export function PostDialog({
  open,
  onOpenChange,
  post,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [status, setStatus] = useState<Post["status"]>(
    post?.status ?? "draft",
  );

  const isEditing = Boolean(post);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) {
          setTitle(post?.title ?? "");
          setExcerpt(post?.excerpt ?? "");
          setStatus(post?.status ?? "draft");
        }

        onOpenChange(next);
      }}
    >
      <DialogContent
        className="
          overflow-hidden
          border border-blue-900/50
          bg-[#071326]
          p-0
          text-white
          shadow-[0_25px_70px_rgba(0,0,0,0.65)]
          sm:max-w-lg
        "
      >
        {/* Spider-Man top accent */}
        <div
          className="
            absolute left-0 right-0 top-0
            h-[3px]
            bg-gradient-to-r
            from-[#e21b2d]
            via-red-500
            to-[#1261c9]
          "
        />

        <DialogHeader className="relative px-6 pb-5 pt-7">

          {/* Icon */}
          <div
            className="
              mb-4 flex size-12
              items-center justify-center
              rounded-xl
              border border-red-500/25
              bg-red-500/10
              shadow-[0_0_20px_rgba(226,27,45,0.12)]
            "
          >
            <FileText className="size-6 text-red-400" />
          </div>

          <DialogTitle
            className="
              text-2xl
              font-black
              tracking-tight
              text-white
            "
          >
            {isEditing ? "Edit Post" : "Create New Post"}
          </DialogTitle>

          <DialogDescription
            className="
              mt-2
              text-sm
              leading-6
              text-slate-400
            "
          >
            {isEditing
              ? "Update the selected transmission in the content network."
              : "Create a new transmission for the Spider Ops content network."}
          </DialogDescription>

        </DialogHeader>

        {/* Form */}
        <div className="space-y-5 px-6">

          {/* Title */}
          <div className="space-y-2">

            <Label
              htmlFor="title"
              className="
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-slate-400
              "
            >
              Post Title
            </Label>

            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="
                border-blue-900/50
                bg-[#040d1c]
                text-white
                placeholder:text-slate-600
                focus:border-red-500/60
                focus:ring-red-500/20
              "
            />

          </div>

          {/* Excerpt */}
          <div className="space-y-2">

            <Label
              htmlFor="excerpt"
              className="
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-slate-400
              "
            >
              Excerpt
            </Label>

            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Enter a short description..."
              className="
                min-h-[110px]
                resize-none
                border-blue-900/50
                bg-[#040d1c]
                text-white
                placeholder:text-slate-600
                focus:border-red-500/60
                focus:ring-red-500/20
              "
            />

          </div>

          {/* Status */}
          <div className="space-y-2">

            <Label
              htmlFor="status"
              className="
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-slate-400
              "
            >
              Publication Status
            </Label>

            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as Post["status"])
              }
            >
              <SelectTrigger
                id="status"
                className="
                  border-blue-900/50
                  bg-[#040d1c]
                  text-white
                  focus:border-red-500/60
                "
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent
                className="
                  border-blue-900/50
                  bg-[#071326]
                  text-white
                "
              >
                <SelectItem
                  value="draft"
                  className="
                    focus:bg-yellow-500/10
                    focus:text-yellow-300
                  "
                >
                  Draft
                </SelectItem>

                <SelectItem
                  value="published"
                  className="
                    focus:bg-green-500/10
                    focus:text-green-300
                  "
                >
                  Published
                </SelectItem>
              </SelectContent>
            </Select>

          </div>

          {/* Security indicator */}
          <div
            className="
              flex items-center gap-3
              rounded-xl
              border border-blue-900/40
              bg-[#040d1c]
              px-4 py-3
            "
          >
            <span
              className="
                flex size-2
                rounded-full
                bg-green-400
                shadow-[0_0_10px_rgba(74,222,128,0.8)]
              "
            />

            <span
              className="
                text-xs
                font-semibold
                text-slate-400
              "
            >
              Content network connection secure
            </span>
          </div>

        </div>

        {/* Footer */}
        <DialogFooter
          className="
            mt-6
            border-t
            border-blue-900/40
            bg-[#040d1c]
            px-6
            py-4
          "
        >

          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="
              text-slate-400
              hover:bg-white/5
              hover:text-white
            "
          >
            <X className="mr-2 size-4" />
            Cancel
          </Button>

          <Button
            disabled={!title.trim()}
            onClick={() => {
              onSubmit({
                title: title.trim(),
                excerpt: excerpt.trim(),
                status,
              });

              onOpenChange(false);
            }}
            className="
              bg-[#e21b2d]
              font-bold
              text-white
              shadow-[0_7px_20px_rgba(226,27,45,0.25)]
              hover:bg-[#c91627]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Save className="mr-2 size-4" />

            {isEditing ? "Update Post" : "Save Post"}
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}