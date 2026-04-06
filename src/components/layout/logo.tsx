import Image from "next/image";

interface LogoProps {
  dark?: boolean;
}

export function Logo({ dark = false }: LogoProps) {
  return (
    <a href="/" className="shrink-0">
      <Image
        src="https://d2lpxiu1sq3srq.cloudfront.net/images/logo.svg"
        alt="HarmoniTravel"
        width={150}
        height={36}
        unoptimized
        className={dark ? "brightness-0 invert" : ""}
      />
    </a>
  );
}
