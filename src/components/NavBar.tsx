import { Flag } from "lucide-react";
import Link from "next/link";

const NavBar = () => {

    return(
        <nav className="sticky h-14 insert-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <div className="max-auto w-full px-2.5 md:px-20">
          <Link href={'/'}>
            <div className="flex h-14 items-center gap-1 border-b border-zinc-200">
              <Flag className="h-4 w-4 text-primary"/>
              <h1 className="text-lg font-semibold">Fun with Flags</h1>
            </div>
          </Link>
        </div>
      </nav>
    )
}

export default NavBar;