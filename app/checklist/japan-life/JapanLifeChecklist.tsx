"use client";

import Checklist from "@/app/components/Checklist";
import type { ChecklistSection } from "@/data/checklist";

const storageKey = "ilsengga:checklist:japan-life";

export default function JapanLifeChecklist({ sections }: { sections: ChecklistSection[] }) {
  return <Checklist key={storageKey} sections={sections} storageKey={storageKey} />;
}
