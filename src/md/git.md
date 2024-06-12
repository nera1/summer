---
tags:
  - git
  - github
category: git
title: Git 1
---

# Git 1

## Git 버전

### 작업 트리(working tree)

파일 수정, 저장 등의 작업을 하는 현재 우리 눈에 보이는 디렉터리

### 스테이지(stage)

버전으로 만들 파일이 대기하는 곳

### 저장소(repository)

스테이지(stage)에 대기하고 있던 파일을 버전으로 만들어 저장하는 곳

### Process

1. 작업 트리에서 파일을 생성, 수정, 삭제

2. 해당 파일을 버전으로 만들고 싶다면 스테이지에 넣는다

3. 커밋(commit)명령을 통해 새로운 버전을 생성하면, 스테이지에 대기하던 파일이 저장소에 저장된다

## 명령어

### git status

git 의 현재 상태를 출력한다

```bash title="Bash"
$ git status
On branch main
Your branch is up to date with 'origin/main'. // 현재 branch

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .../markdown.md // commit한 파일(아직 커밋한 파일 없음)

nothing added to commit but untracked files present (use "git add" to track) // commit 할 파일
```

위 markdown.md 파일은 git add 하기 전 작업 트리 단계의 파일이다

### git add

```bash title="Bash"
$ git add markdown.md
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   markdown.md
```

working tree 의 markdown.md 파일이 stage 에 추가되었다

### git commit

```bash title="Bash"
$ git commit -m "add markdown.md"
[main 30fa8d2] add markdown.md
 1 file changed, 53 insertions(+)
 create mode 100644 markdown.md
```
