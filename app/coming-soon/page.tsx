import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "준비 중",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
          ← 일생가 홈
        </Link>

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-gray-900">준비 중</h1>
        </div>

        <div className="mt-8 rounded-xl border bg-white p-6">
          <p className="text-gray-500">🚧 이 기능은 준비 중입니다.</p>
        </div>
      </div>
    </main>
  );
}
