---
filename: index.md
tags:
  - notice
  - generateStaticParams
  - next.js
category: notice
title: Notice
created: Fri, 31 May 2024 02:27:03 GMT
---

# Notice

## Build

- 게시판 생성 시 첫 번째 마크다운 파일이 존재해야 빌드가 가능합니다.
- 첫 마크다운 파일에는 **_title, tags, category_** 항목이 반드시 포함되어야 빌드가 가능합니다.

## ETC

```typescript title="page.tsx"
export function generateStaticParams() {
    ...
    if (process.env.NODE_ENV === "production") {
      value = decodeURIComponent(value);
    }
    ...
    return params;
}
```

정적 파일 생성 시 URL에서 한글로 된 파라미터 또는 쿼리를 받아오는 경우 인코딩에 주의해야 합니다.

- 개발 모드에서는 문자열 그대로, 빌드 시에는 인코딩된 형태로 받아옵니다.
- GitHub 환경과 개발 환경이 다른 OS이기 때문에 발생하는 문제인지 불분명합니다.