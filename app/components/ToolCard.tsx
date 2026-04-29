import Link from "next/link";

type ToolCardProps = {
  title: string;
  description: string;
  href: string;
  badge?: string;
  isAvailable?: boolean;
};

export default function ToolCard({
  title,
  description,
  href,
  badge,
  isAvailable = true,
}: ToolCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:underline">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
        </div>

        {badge && (
          <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-4 text-sm font-medium text-gray-700">
        {isAvailable ? "사용해보기 →" : "준비 중"}
      </div>
    </>
  );

  if (!isAvailable) {
    return (
      <div
        aria-disabled="true"
        className="group block cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 p-5"
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group block rounded-xl border bg-white p-5 transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
    >
      {content}
    </Link>
  );
}
