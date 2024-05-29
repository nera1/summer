# Sumr

Sumr 는 Next.js 를 사용하는 정적 사이트 생성기입니다

- 마크다운을 작성하여 src/app/md 폴더에 넣으면 빌드 시 자동으로 페이지를 생성합니다

- 마크다운 상단에 .yaml/.yml 을 작성하면 해당 정보로 카테고리 및 태그를 생성합니다

- 간단한 포스트의 제목 검색을 지원합니다

## 사용법

```bash
---
created: 2024-05-29
author: Nera
modified: 2024-05-29
category: markdown
tags:
  - tag1
  - tag2
  - tag3
title: title
---

# Markdown Start from here
...
```

- 항목의 순서는 전혀 상관이 없습니다

- created 항목이 없다면, 파일의 생성 날짜를 확인하여 자동으로 생성합니다

- modified 항목이 없다면, 파일의 변경 날짜를 확인하여 자동으로 생성합니다

- markdown 에 명시된 값은 파일의 정보보다 우선합니다

  - 파일 생성일이 2024-05-11 이고 markdown 에 명시된 created 가 2024-05-20 이면 created 항목으로 날짜를 계산합니다

- category, title 항목은 필수로 작성해야 합니다

- 제목, 태그, 카테고리 항목은 한글을 지원합니다

- 카테고리와 카테고리 아이콘의 매칭은 카테고리 이름과 카테고리 아이콘 파일의 이름의 유사도로 확인합니다

  - 유사도가 높은 아이콘 파일이 존재하지 않다면, 기본 아이콘으로 매칭됩니다

## 문의사항

nera4936@gmail.com

## 라이센스

Sumr is [MIT licensed](./LICENSE).
