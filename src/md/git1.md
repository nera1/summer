---
tags:
  - git
  - github
  - reset
  - commit
  - checkout
  - add
  - revert
  - log
  - diff
  - status
category: git
title: Git 버전 관리
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

## Command

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

$ git status
On branch main
Your branch is ahead of 'origin/main' by 2 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

#### git commit -am

```bash title="Bash"
$ git commit -am "message"
```

stating과 commit을 한꺼번에 처리한다 단, 한번이라도 commit 되어 추적중인 파일들에 해당된다

#### git commit --amend

```bash title="Bash"
$ git commit --amend
```

가장 최근의 commit 메세지 수정

### git log

```bash title="Bash"
commit 2294cfdc................... (HEAD -> main)
Author: user <user@mail.com>
Date:   Wed May 12 23:32:16 2003 +0900
...
```

commit 하여 repository에 저장된 버전을 확인한다\
현재 branch에 해당하는 commit의 log를 확인한다

#### git log --oneline

```bash title="Bash"
$ git log --oneline
7244cfd (HEAD -> main) update
30fa8d2 add markdown.md
8f6c3f8 (origin/main, origin/HEAD) remove codeValue attr from tag
04f0562 fix copy button
3c6164f add copy button
...
```

commit의 hash 값을 보기 편하게 출력한다

#### git log --oneline --branches

```bash title="Bash"
$ git log --oneline --branches
...
```

현재 checkout된 branch뿐만 아니라 모든 branch의 commit log를 출력한다

#### git log --oneline --graph

```bash title="Bash"
$ git log --oneline --graph
...
*   be551a9 fix button
|\
| * 03529cb fix parser
* | 823a748 fix category list item
|/
...
```

branch 및 commit의 관계를 시각적 그래프 형태로 표현

#### git log --stat

```bash title="Bash"
$ git log --stat
commit 112cfdc34................. (HEAD -> main)
Author: user <user@mail.com>
Date:   Thu May 12 12:32:16 1991 +0900

    update

 markdown.md | 24 +++++++++++++++++++++++-
 1 file changed, 23 insertions(+), 1 deletion(-)
```

--stat 옵션을 통해 commit 과 관련된 파일을 함께 볼 수 있다

### git diff

```bash title="Bash"
# 워킹 디렉토리와 스테이징 영역 사이의 변경 사항 보기
git diff

# 스테이징된 변경 사항 보기
git diff --staged

# 특정 파일의 변경 사항 보기
git diff README.md

# 두 커밋 사이의 변경 사항 보기
git diff commit1 commit2

# 두 브랜치 사이의 변경 사항 보기
git diff branch1 branch2

# 특정 커밋과 현재 워킹 디렉토리 사이의 변경 사항 보기
git diff commit
```

### git checkout

#### git checkout -- filename

```bash title="Bash"
$ git checkout -- markdown.md
```

파일 수정 후 checkout 한다면, 해당 파일의 마지막 commit 시점으로 되돌린다

#### git checkout branchname

```bash title="Bash"
$ git checkout develop
```

다른 branch로 전환한다

### git reset

#### git reset HEAD filename

```bash title="Bash"
$ git add markdown.md
$ git reset HEAD markdown.md
```

해당 파일의 staging을 취소한다

#### git reset HEAD^

```bash title="Bash"
$ git reset HEAD^
```

가장 최근의 commit을 취소한다

#### git reset options

```bash title="Bash"
# 최근 commit을 하기 전 상태로 working tree를 되돌림
$ git reset --soft HEAD^

# 최근 commit과 staging을 하기 전 상태로 working tree를 되돌린다
# git reset 명령의 default 옵션
$ git reset --mixed HEAD^

# 최근 commit과 staging, 파일 수정을 하기 전 상태로 작업 트리를 되돌린다
# 이 옵션으로 되돌린 내용은 복구할 수 없다
$ git reset --hard HEAD^
```

#### git reset hash

```bash title="Bash"
$ git reset --hard dl21bqo
```

해시 dl21bqo 이후에 생성된 commit을 삭제하고 dl21bqo commit으로 이동한다

### git revert

```bash title="Bash"
$ git revert ejq1z0k
```

commit의 해시 순서는 'dl21bqo' -- 'ejq1z0k' -- '1ppzqa2'\
'ejq1z0k' commit을 revert 한다면 'ejq1z0k' commit을 취소한\
'wqi0o1s' commit이 새로 생성되어 commit 이력이 아래와 같이 변경된다\
'dl21bqo' -- 'ejq1z0k' -- '1ppzqa2' -- 'wqi0o1s'
