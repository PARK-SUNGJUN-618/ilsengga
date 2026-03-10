import Link from "next/link";

export default function JobChangePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
          ← 일생가 홈
        </Link>

        <div className="mt-8">
          <p className="text-sm font-medium text-gray-500">💼 직장</p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            이직 연봉 비교
          </h1>

          <p className="mt-3 text-gray-600">
            현재 직장과 이직 후의 연봉을 비교해보세요.
          </p>
        </div>

        <div className="mt-8 rounded-xl border bg-white p-6">
          <p className="text-gray-500">🚧 이 기능은 준비 중입니다.</p>
        </div>
      </div>
    </main>
  );
}
