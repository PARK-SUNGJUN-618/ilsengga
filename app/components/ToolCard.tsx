import Link from "next/link";

type ToolCardProps = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

export default function ToolCard({
  title,
  description,
  href,
  badge,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border bg-white p-5 transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
    >
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

      <div className="mt-4 text-sm font-medium text-gray-700">사용해보기 →</div>
    </Link>
  );
}
