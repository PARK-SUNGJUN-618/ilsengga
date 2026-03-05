import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          일생가
        </Link>

        <p className="hidden text-sm text-gray-500 sm:block">
          일본 생활 가능하세요?
        </p>
      </div>
    </header>
  );
}
