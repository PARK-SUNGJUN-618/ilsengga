"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ChecklistSection } from "@/data/japan-life-checklist";

const STORAGE_KEY = "ilsengga:checklist:japan-life";
const focusStyle = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900";

function parseCompletedIds(raw: string | null, validIds: Set<string>): string[] {
  try {
    const value: unknown = raw === null ? null : JSON.parse(raw);
    if (!value || typeof value !== "object" || !("version" in value) || value.version !== 1 ||
      !("completedIds" in value) || !Array.isArray(value.completedIds)) return [];
    return [...new Set(value.completedIds.filter(
      (id): id is string => typeof id === "string" && validIds.has(id),
    ))];
  } catch {
    return [];
  }
}

export default function JapanLifeChecklist({ sections }: { sections: ChecklistSection[] }) {
  const validIds = useMemo(() => new Set(sections.flatMap((section) => section.items.map((item) => item.id))), [sections]);
  const [state, setState] = useState({ completedIds: [] as string[], restored: false, storageError: false });

  useEffect(() => {
    let completedIds: string[] = [];
    let storageError = false;
    try {
      completedIds = parseCompletedIds(window.localStorage.getItem(STORAGE_KEY), validIds);
    } catch {
      storageError = true;
    }
    // Restore browser storage after hydration; this effect never writes to storage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ completedIds, restored: true, storageError });
  }, [validIds]);

  const completedIds = new Set(state.completedIds.filter((id) => validIds.has(id)));
  const total = sections.reduce((count, section) => count + section.items.length, 0);
  const completed = completedIds.size;
  const progress = total === 0 ? 0 : Math.round(completed / total * 100);

  function toggle(id: string, checked: boolean) {
    if (!state.restored) return;
    const next = new Set(completedIds);
    if (checked) next.add(id);
    else next.delete(id);
    const nextIds = [...next];
    setState((previous) => ({ ...previous, completedIds: nextIds }));
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, completedIds: nextIds }));
      setState((previous) => ({ ...previous, storageError: false }));
    } catch {
      setState((previous) => ({ ...previous, storageError: true }));
    }
  }

  function reset() {
    if (!state.restored || !window.confirm("체크 상태를 모두 초기화할까요? 이 브라우저에 저장된 체크 기록이 삭제됩니다.")) return;
    setState((previous) => ({ ...previous, completedIds: [] }));
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      setState((previous) => ({ ...previous, storageError: false }));
    } catch {
      setState((previous) => ({ ...previous, storageError: true }));
    }
  }

  return (
    <div className="mt-8 space-y-10">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p id="checklist-progress" className="font-semibold" role="status" aria-atomic="true">
          전체 {total}개 중 {completed}개 완료 · {progress}%
        </p>
        <progress aria-labelledby="checklist-progress" value={progress} max={100} className="mt-4 block h-3 w-full accent-gray-800" />
        {!state.restored && <p className="mt-3 text-sm text-gray-600">저장된 체크 상태를 불러오는 중입니다.</p>}
        {state.storageError && (
          <p role="status" className="mt-3 text-sm leading-6 text-gray-600">
            이 브라우저에 체크 상태를 저장하거나 저장 기록을 변경할 수 없습니다. 체크는 가능하지만 새로고침하면 현재 상태가 유지되지 않을 수 있습니다.
          </p>
        )}
      </div>

      {sections.map((section) => (
        <section key={section.id} aria-labelledby={`${section.id}-heading`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id={`${section.id}-heading`} className="text-xl font-bold">{section.title}</h2>
            <span className="text-sm text-gray-600">
              {section.items.filter((item) => completedIds.has(item.id)).length} / {section.items.length} 완료
            </span>
          </div>
          {section.description && <p className="mt-2 text-sm leading-6 text-gray-600">{section.description}</p>}
          <ul className="mt-4 space-y-3">
            {section.items.map((item) => {
              const checked = completedIds.has(item.id);
              const checkboxId = `checklist-${item.id}`;
              return (
                <li key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={checked}
                      disabled={!state.restored}
                      onChange={(event) => toggle(item.id, event.target.checked)}
                      aria-describedby={`${checkboxId}-description${item.conditionNote ? ` ${checkboxId}-condition` : ""}`}
                      className={`mt-3 h-5 w-5 shrink-0 cursor-pointer accent-gray-800 ${focusStyle}`}
                    />
                    <div className="min-w-0 flex-1">
                      <label htmlFor={checkboxId} className="flex min-h-11 cursor-pointer flex-wrap items-center justify-between gap-2 py-2 font-semibold">
                        <span>{item.title}</span>
                        <span className="text-xs font-normal text-gray-600">{checked ? "완료" : "미완료"}</span>
                      </label>
                      <p id={`${checkboxId}-description`} className="text-sm leading-6 text-gray-600">{item.description}</p>
                      {item.conditionNote && (
                        <p id={`${checkboxId}-condition`} className="mt-2 text-sm leading-6 text-gray-600">
                          <span className="font-medium">적용 조건: </span>{item.conditionNote}
                        </p>
                      )}
                      {(item.details?.length || item.sources?.length || item.lastVerified) ? (
                        <details className="mt-2 text-sm leading-6 text-gray-600">
                          <summary className={`min-h-11 cursor-pointer rounded py-2.5 font-medium text-gray-800 ${focusStyle}`}>
                            자세히 보기<span className="sr-only">: {item.title}</span>
                          </summary>
                          {item.details && <ul className="list-disc space-y-2 pl-5">{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
                          {item.sources && (
                            <div className="mt-4 border-t border-gray-100 pt-3">
                              <p className="font-medium">출처 / 참고</p>
                              <ul>
                                {item.sources.map((source) => (
                                  <li key={source.url}>
                                    {source.url.startsWith("/") ? (
                                      <Link href={source.url} className={`inline-flex min-h-11 items-center rounded py-2 underline underline-offset-4 ${focusStyle}`}>{source.name}</Link>
                                    ) : (
                                      <a href={source.url} target="_blank" rel="noopener noreferrer" className={`inline-block min-h-11 rounded py-2 underline underline-offset-4 ${focusStyle}`}>
                                        {source.name}<span className="sr-only"> (새 탭에서 열림)</span>
                                      </a>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {item.lastVerified && <p className="mt-2 text-xs text-gray-500">마지막 확인: <time dateTime={item.lastVerified}>{item.lastVerified}</time></p>}
                        </details>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      <div className="border-t border-gray-200 pt-6">
        <button type="button" onClick={reset} disabled={!state.restored} className={`min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 ${focusStyle}`}>
          체크 상태 초기화
        </button>
      </div>
    </div>
  );
}
