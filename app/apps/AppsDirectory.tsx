"use client";

import { useState } from "react";
import type { AppItem, Audience, AvailabilityStatus, Condition, Platform, PlatformCondition, Purpose, RequirementStatus, SupportStatus } from "@/data/apps";

type Status = AvailabilityStatus | RequirementStatus | SupportStatus;
const statusLabels: Record<Status, string> = {
  available: "가능", unavailable: "불가", conditional: "조건부", unknown: "미확인",
  required: "필요", not_required: "불필요", supported: "지원", unsupported: "미지원", partial: "일부 지원",
};
const purposeLabels: Record<Purpose, string> = {
  maps: "지도", translation: "번역", transport: "교통", safety: "재난 정보",
  communication: "연락", payment: "결제", shopping: "중고 거래", administration: "행정·인증",
};
const platformLabels = { ios: "iOS", android: "Android" };
const filters = [
  { value: "all", label: "전체" },
  { value: "travel", label: "여행" },
  { value: "resident", label: "거주" },
] as const;

function forPlatform<S extends string>(value: PlatformCondition<S>, platform: Platform): Condition<S> {
  return "status" in value ? value : value[platform];
}

function StatusValue({ value }: { value: Condition<Status> }) {
  const positive = ["available", "not_required", "supported"].includes(value.status);
  const conditional = ["conditional", "partial"].includes(value.status);
  const negative = ["unavailable", "unsupported"].includes(value.status);
  const color = positive ? "bg-emerald-50 text-emerald-800"
    : conditional ? "bg-amber-50 text-amber-800"
    : negative ? "bg-red-50 text-red-800" : "bg-gray-100 text-gray-700";
  const symbol = positive ? "✓" : conditional ? "△" : negative ? "✕" : value.status === "required" ? "!" : "?";
  return (
    <>
      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
        <span aria-hidden="true">{symbol}</span>{statusLabels[value.status]}
      </span>
      {value.note && <p className="mt-1.5 text-sm leading-6 text-gray-600">{value.note}</p>}
    </>
  );
}

function ConditionRow({ label, value, platforms }: {
  label: string;
  value: PlatformCondition<Status>;
  platforms?: AppItem["platforms"];
}) {
  const ios = forPlatform(value, "ios");
  const android = forPlatform(value, "android");
  const iosUnavailable = platforms && forPlatform(platforms, "ios").status === "unavailable";
  const androidUnavailable = platforms && forPlatform(platforms, "android").status === "unavailable";
  const same = ios.status === android.status && ios.note === android.note;
  const hasNote = (!iosUnavailable && ios.note) || (!androidUnavailable && android.note);
  return (
    <div className={`grid py-2.5 ${hasNote ? "grid-cols-1 gap-1.5" : "grid-cols-[6rem_minmax(0,1fr)] gap-3"}`}>
      <dt className="text-sm text-gray-600">{label}</dt>
      <dd className="min-w-0">
        {iosUnavailable && androidUnavailable ? <span className="text-sm text-gray-500">— 해당 없음</span>
          : iosUnavailable ? <StatusValue value={android} />
          : androidUnavailable ? <StatusValue value={ios} />
          : same ? <StatusValue value={ios} />
          : <div className="space-y-2">
            {(["ios", "android"] as const).map((platform) => (
              <div key={platform}>
                <span className="mr-2 text-xs text-gray-500">{platformLabels[platform]}</span>
                <StatusValue value={forPlatform(value, platform)} />
              </div>
            ))}
          </div>}
      </dd>
    </div>
  );
}

function AppCard({ app }: { app: AppItem }) {
  return (
    <article id={app.id} aria-labelledby={`${app.id}-title`} className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <h2 id={`${app.id}-title`} className="text-xl font-bold">{app.name}</h2>
      <p className="mt-2 text-sm leading-6 text-gray-600">{app.description}</p>
      <p className="mt-2 text-xs font-medium text-gray-500">
        <span className="sr-only">추천 대상: </span>
        {app.audiences.map((audience) => audience === "travel" ? "여행" : "거주").join("·")}
        {" · "}<span className="sr-only">용도: </span>{purposeLabels[app.purpose]}
      </p>
      {app.scopeNote && <p className="mt-3 text-sm leading-6 text-gray-600">{app.scopeNote}</p>}
      <dl className="mt-4 divide-y divide-gray-100">
        <ConditionRow label="iOS / Android" value={app.platforms} />
        <ConditionRow label="한국 휴대폰" value={app.conditions.koreanPhone} platforms={app.platforms} />
        <ConditionRow label="일본 전화번호" value={app.conditions.japanesePhoneRequired} platforms={app.platforms} />
        <ConditionRow label="일본 계정" value={app.conditions.japaneseStoreAccountRequired} platforms={app.platforms} />
        <ConditionRow label="일본 거주" value={app.conditions.japaneseResidenceRequired} platforms={app.platforms} />
        <ConditionRow label="한국어" value={app.conditions.koreanSupported} platforms={app.platforms} />
      </dl>
      {(app.cautions.length > 0 || app.sources.length > 0) && (
        <details className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-600">
          <summary className="cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4">주의사항·확인 근거</summary>
          {app.cautions.length > 0 && <ul className="mt-3 list-disc space-y-2 pl-5 leading-6">
            {app.cautions.map((caution) => <li key={caution}>{caution}</li>)}
          </ul>}
          {app.lastVerified === null && <p className="mt-3 text-xs leading-5">아래는 재확인할 공식 자료입니다. 이용 조건 검증은 아직 완료하지 않았습니다.</p>}
          <ul className="mt-3 space-y-2">
            {app.sources.map((source) => <li key={source.url}><a className="underline underline-offset-4 hover:text-gray-900" href={source.url}>{source.label}</a></li>)}
          </ul>
        </details>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
        <a href={app.officialUrl} className="rounded text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-gray-900">공식 사이트 <span aria-hidden="true">↗</span><span className="sr-only">: {app.name}</span></a>
        <span>마지막 확인: {app.lastVerified ? <time dateTime={app.lastVerified}>{app.lastVerified}</time> : "미검증"}</span>
      </div>
    </article>
  );
}

export default function AppsDirectory({ apps }: { apps: AppItem[] }) {
  const [filter, setFilter] = useState<"all" | Audience>("all");
  const visibleApps = apps.filter((app) => filter === "all" || app.audiences.includes(filter));
  return (
    <section className="mt-8" aria-label="일본 필수 앱 목록">
      <div className="flex gap-2" role="group" aria-label="추천 대상 필터">
        {filters.map(({ value, label }) => (
          <button key={value} type="button" aria-pressed={filter === value} aria-controls="apps-list" onClick={() => setFilter(value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 ${filter === value ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"}`}>
            {label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-500" role="status" aria-live="polite" aria-atomic="true">
        {filters.find(({ value }) => value === filter)?.label} · {visibleApps.length}개 앱
      </p>
      <div id="apps-list" className="mt-4 grid items-start gap-4 sm:grid-cols-2">
        {visibleApps.map((app) => <AppCard key={app.id} app={app} />)}
      </div>
    </section>
  );
}
