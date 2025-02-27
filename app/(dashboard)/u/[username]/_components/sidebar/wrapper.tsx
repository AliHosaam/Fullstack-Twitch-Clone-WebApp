"use client";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-[rgb(31,33,43)] border-r border-[#2d2e35] z-50",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
