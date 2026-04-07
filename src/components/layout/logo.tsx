import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  dark?: boolean;
}

export function Logo({ dark = false }: LogoProps) {
  return (
    <Link href="/" className="shrink-0">
      <Image
        src="https://d2lpxiu1sq3srq.cloudfront.net/images/logo.svg"
        alt="HarmoniTravel"
        width={150}
        height={36}
        style={{ height: "auto" }}
        unoptimized
        className={dark ? "brightness-0 invert" : undefined}
      />
    </Link>
  );
}
