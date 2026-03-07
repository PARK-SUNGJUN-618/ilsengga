import ToolCard from "./ToolCard";

type Tool = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

type CategorySectionProps = {
  title: string;
  description: string;
  tools: Tool[];
};

export default function CategorySection({
  title,
  description,
  tools,
}: CategorySectionProps) {
  return (
    <section className="mt-12">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>

        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>
    </section>
  );
}
