---
filename: git4.md
tags:
  - git
  - github
  - clone
  - pull
  - fetch
  - fork
category: git
created: Sat, 15 Jun 2024 07:39:23 GMT
title: Git 협업
---

# 협업

## git clone

### git clone remote_repository_address folderpath

```bash title="Bash"
git clone https://github.com/user/project.git project
# 연결 확인
git remote -v
```

project directory에 remote repository를 복제한다

## git pull

```bash title="Bash"
# 내려받고자 하는 branch로 이동한다
git checkout develop
# remote repository의 develop branch 내역을 local develop branch로 내려받는다
git pull
# 아래 명령어로도 가능하다
git pull origin develop
```

## git fetch

```bash title="Bash"
git fetch

# main branch의 내역만을 가져온다
git fetch origin main

# remote repository의 모든 branch내역을 가져온다
git fetch origin

# FETCH_HEAD branch로 checkout
git checkout FETCH_HEAD

# origin/main, origin/HEAD가 표시된 commit이 remote branch의 최신 commit
git log --oneline
0375d59 (HEAD, origin/main, origin/HEAD) fix bug 2
d08ffff fix copy button
acb5bd9 make header

# pull 하고자 하는 branch로 checkout하여 pull할 수도 있지만 FEATCH_HEAD commit을 병합할 수도 있다
git checkout develop
git merge FETCH_HEAD
```

pull 명령어가 remote branch의 파일 내역을 직접 local branch와 합치는 명령어라면,\
fetch는 변경 내역만을 가져오고 작업중인 branch에 병합하지 않는다

## git fork

remote repository를 내 local repository에 복제하는 작업을 clone\
다른 사람의 repository를 복사하여 나의 repository로 만드는것을 fork라 한다\
github에서 fork한 뒤 생성된 remote repository는 내 remote repository처럼 사용하면 된다