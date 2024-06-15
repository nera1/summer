---
tags:
  - git
  - github
  - branch
  - checkout
  - merge
  - stash
category: git
title: Git branch
---

# Git 2

## branch

작업의 흐름, branch를 사용해 서로 다른 작업들이 독립적으로 진행될 수 있음

## Command

### git branch

#### git branch branchname

```bash title="Bash"
$ git branch develop
```

branchname 이름의 branch를 생성

### git checkout

#### git checkout branchname

```bash title="Bash"
$ git checkout develop
```

다른 branch로 전환한다

#### git checkout -b branchname

```bash title="Bash"
$ git checkout -b feature/login
```

branch의 생성과 해당 branch로 checkout을 한번에 한다

### git log

#### git log branch1..branch2

```bash title="Bash"
# branch develop에는 없고 feature/header branch에만 있는 commit출력
$ git log develop..feature/header

# branch feature/header에는 없고 develop branch에만 있는 commit출력
$ git log feature/header..develop
```

두 branch branch1, branch2 사이에 마침표 두개를 찍어 사용한다\
branch1에 존재하지 않고 branch2에만 있는 commit을 출력한다

### git merge

```bash title="Bash"
# develop branch로 checkout
$ git checkout develop
# feature/button branch를 develop branch에 merge한다
$ git merge feature/button
```

A branch에 B branch를 merge하려면 A branch로 checkout후 git merge B 실행

#### git merge --no-edit

```bash title="Bash"
# merge 과정에서 commit message editor를 사용하지 않고 git 지정 메세지 사용
$ git merge develop --no-edit
# 사용하지 않는 editor를 다시 사용하여 commit message 수정
$ git merge feature/button --edit
```

### conflict

다른 A, B branch에서 markdown.md 파일의 같은 부분을 수정하고 A, B branch를 merge하면 충돌이 발생한다\
같은 파일의 다른 부분을 수정하면 수정사항을 모두 적용한 파일이 conflict 없이 생성된다\
충돌은 같은 파일의 같은 line, 혹은 인접한 line을 다른 branch에서 수정했을 때 발생한다

```bash title="Bash"
<<<<<<< HEAD
print("hello");
=======
print("hello world!");
>>>>>>> feature
```

충돌이 발생한 지점에서 어떤 코드를 선택할지 적용하고 가로줄(===), 구분선(<<<>>>) 을 모두 지우고 파일을 저장한다

### git branch -d

branch를 삭제해도 같은 이름으로 branch를 다시 생성하면 예전 작업 내용이 나타난다\
repository에서 완전히 삭제하는것이 아닌 git의 flow로부터 숨기는것이다

#### git branch -d branchname

```bash title="Bash"
$ git branch -d develop
```

A branch를 삭제하기 전 다른 branch로 checkout한다\
local branch를 삭제한다. 삭제하려는 branch가 다른 branch에 병합되지 않은 상태라면 오류가 발생한다

#### git branch -D branchname

```bash title="Bash"
$ git branch -D feature/button
```

merge하지 않은 branch를 강제로 삭제한다

#### git push origin --delete branchname

```bash title="Bash"
$ git push origin --delete feature/button
```

remote repository에 존재하는 branch를 삭제한다

#### git branch -m newbranchname

```bash title="Bash"
# 현재 checkout한 branch의 이름 변경
git branch -m newbranchname
# 임의의 branch 이름 변경
git branch -m oldbranchname newbranchname
```

#### remote branch name 변경

```bash title="Bash"
# 1. local branch 이름 변경
git branch -m oldbranchname newbranchname

# 2. 새로운 이름으로 remote branch에 push
git push origin newbranchname

# 3. remote repository에서 이전 이름의 branch 삭제
git push origin --delete oldbranchname

# 4. 원격 트래킹 branch 이름 변경
git fetch origin
git branch -u origin/newbranchname newbranchname
```

local branch의 이름을 바꾸고, 새로 바꾼 이름으로 push한 뒤 바뀌기 전 remote branch는 삭제

### git stash

파일을 수정하고 commit하지 않은 상태에서 다른 파일을 commit해야 할 경우\
작업중인 파일을 잠시 숨길 수 있다\
stack 형태로 관리된다

```bash title="Bash"
# 현재 작업중인 commit하지 않은 파일을 숨김
$ git stash

# 다른 작업을 마치고 숨긴 파일을 작업하기 위해 다시 가져옴
$ git statsh pop

# stash stack에서 가장 최근 항목을 삭제
$ git stash drop

# stash stack에서 가장 최근 항목을 되돌리지만 stack의 내역은 남겨둠
$ git stash apply
```
