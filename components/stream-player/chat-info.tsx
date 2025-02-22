import { useMemo } from "react";
import Hint from "../hint";
import { Info } from "lucide-react";

interface ChatInfoProps {
  isChatDelayed: boolean;
  isFollowersOnly: boolean;
}

const ChatInfo = ({ isChatDelayed, isFollowersOnly }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isChatDelayed) {
      return "Only followers can chat";
    }

    if (isChatDelayed && !isFollowersOnly) {
      return "Messages are delayed by 3 seconds";
    }

    if (isChatDelayed && isFollowersOnly) {
      return "Only followers can chat. Messages are delayed by 3 seconds";
    }

    return "";
  }, [isChatDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isChatDelayed) {
      return "Followers only";
    }

    if (isChatDelayed && !isFollowersOnly) {
      return "Slow mode";
    }

    if (isChatDelayed && isFollowersOnly) {
      return "Followers only and slow mode";
    }

    return "";
  }, [isChatDelayed, isFollowersOnly]);

  if (!isChatDelayed && !isFollowersOnly) {
    return null;
  }

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};

export default ChatInfo;
