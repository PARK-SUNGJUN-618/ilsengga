export type ChecklistSource = { name: string; url: string };
export type ChecklistItem = {
  id: string;
  title: string;
  description: string;
  conditionNote?: string;
  details?: string[];
  sources?: ChecklistSource[];
  lastVerified?: string;
};
export type ChecklistSection = {
  id: string;
  title: string;
  description?: string;
  items: ChecklistItem[];
};

export type ChecklistStorageKey =
  | "ilsengga:checklist:japan-life"
  | "ilsengga:checklist:japan-travel";
