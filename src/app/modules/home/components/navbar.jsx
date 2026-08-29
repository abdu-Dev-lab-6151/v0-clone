import { auth } from "@clerk/nextjs/server"; // አዲሱ የ Clerk አጠቃቀም
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export default async function Navbar() {
  const { userId } = await auth(); // ተጠቃሚው መግባቱንና አለመግባቱን እዚህ ያረጋግጣል

  return (
    <nav className="p-4 bg-transparent fixed top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={"/logo.svg"}
            alt="Vibe"
            width={32}
            height={32}
            className="shrink-0 invert dark:invert-0"
          />
        </Link>

        <div className="flex gap-2">
          {/* ተጠቃሚው ካልገባ (userId ከሌለ) ቁልፎቹን አሳይ */}
          {!userId ? (
            <>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Sign Up</Button>
              </SignUpButton>
            </>
          ) : (
            /* ተጠቃሚው ከገባ የፕሮፋይል ፎቶውን አሳይ */
            <UserButton />
          )}
        </div>
      </div>
    </nav>
  );
}

{
  /* <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={"/logo.svg"}
            alt="Vibe"
            width={32}
            height={32}
            className="shrink-0 invert dark:invert-0"
          />
        </Link> */
}
