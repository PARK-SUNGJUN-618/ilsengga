<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Working Rules

- 기본적으로 먼저 프로젝트를 분석하고 변경 계획을 제시한다.
- 사용자가 명시적으로 승인하기 전에는 파일을 수정하지 않는다.
- 사용자가 명시적으로 요청하지 않는 한 파일을 생성, 삭제, 이동 또는 수정하지 않는다.
- 사용자가 명시적으로 요청하지 않는 한 `git add`, `git commit`, `git push`, `git reset` 등의 Git 변경 작업을 수행하지 않는다.
- 사용자가 명시적으로 요청하지 않는 한 의존성 설치나 패키지 변경(`npm install`, `npm uninstall` 등)을 수행하지 않는다.
- 현재 작업과 직접적으로 관련되지 않은 파일이나 코드는 변경하지 않는다.
- 변경이 필요한 경우 먼저 변경 대상 파일, 변경 이유, 수정 내용을 설명하고 승인을 기다린다.
- 승인 후에도 요청된 범위 내에서만 변경한다.
- 코드 변경 후에는 가능한 경우 lint, type check, build 등의 검증을 수행하고 결과를 보고한다.
- commit이나 push가 필요한 경우에도 사용자의 별도 승인을 받은 후 수행한다.
