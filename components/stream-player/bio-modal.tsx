"use client";
import { ElementRef, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { updateUser } from "@/actions/user";

interface BioModalProps {
  initialBio: string | null;
}

const BioModal = ({ initialBio }: BioModalProps) => {
  const [value, setValue] = useState(initialBio || "");
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);

  const onSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("Bio updated successfully");
          closeRef.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Edit your bio</DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            disabled={isPending}
            onChange={(e) => setValue(e.target.value)}
            placeholder="User bio"
            value={value}
            className="resize-none bg-[rgb(31,33,43)]"
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="primary" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BioModal;
