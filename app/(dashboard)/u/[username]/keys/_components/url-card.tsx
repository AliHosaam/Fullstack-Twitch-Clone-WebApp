import { Input } from "@/components/ui/input";
import CopyButton from "./copy-button";

interface UrlCardProps {
  value: string | null;
}

const UrlCard = ({ value }: UrlCardProps) => {
  return (
    <div className="rounded-xl bg-[rgb(31,33,43)]  p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Server URL</p>
        <div className="w-full space-y-2">
          <div className="w-full flex items-center gap-x-2">
            <Input value={value || ""} disabled placeholder="Server URL" />
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
