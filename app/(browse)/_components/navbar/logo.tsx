import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1 shrink-0 mr-12 lg:shrink lg:mr-0">
          <Image
            src="/ghost-svgrepo-com.svg"
            alt="Gamehub"
            width={32}
            height={32}
          />
        </div>
        <div className={cn("hidden lg:block", font.className)}>
          <p className="text-lg font-semibold">Gamehub</p>
          <p className="text-sm text-muted-foreground">Let&apos;s play</p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
