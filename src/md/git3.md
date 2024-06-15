---
filename: git3.md
tags:
  - git
  - github
  - repository
  - remote
  - push
  - SSH
category: git
created: Sat, 15 Jun 2024 07:39:23 GMT
title: Git remote repository
---

# Remote repository

local repository가 아닌 곳에 만든 repository\

## git init directoryname

```bash title="Bash"
git init project1
```

새 directory(project1)를 만들면서 해당 directory를 repository로 초기화

## git remote add origin remoteRepositoryAddress

```bash title="Bash"
git remote add origin https://github.com/user/project1.git
```

origin은 remote repository 주소가 길어 origin이라는 단어로 줄여서 사용한다는 뜻

## 연결 확인

```bash title="Bash"
git remove -v
origin  https://github.com/user/project1.git (fetch)
origin  https://github.com/user/project1.git (push)
```

## git push

remote repository에 파일 업로드

### git push -u origin branchname

```bash title="Bash"
git push -u origin develop
# 처음으로 push한 이후 push하고자 하는 branch로 checkout하여 다음과 같이 push
git push
```

local repository의 develop branch를 remote repository의 develop branch로 push\
-u 옵션은 local branch를 remote branch로 연결하기 위한 것으로 한번만 사용

## SSH

다른 컴퓨터 환경에서 local repository를 생성하고 remote repository에 연결 하기 위해서 SSH 키 생성이 필요

```bash title="Bash"
ssh-keygen

# ssh-keygen 옵션
# -t 생성할 키의 타입 주로 rsa 알고리즘을 사용
# -b 키의 길이를 비트 단위로 지정, rsa 는 기본적으로 3072비트
# -C 키에 대한 주석
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
cd ~/.ssh
# 키 파일의 이름을 입력하지 않으면 기본적으로 id_rsa.pub로 생성된다
cat id_rsa.pub
ssh-rsa ........== user@mail.com
# cat 명령어로 출력된 ssh-rsa 부터 문자열을 전부 복사한다
# Windows 의 git bash를 사용중이라면 다음과 같이 파일 내용을 클립보드에 복사할 수 있다
cat id_rsa.pub | clip.exe
```

Github에 로그인 후 프로필 메뉴에서\
Settings > SSG and GPG Keys > SSH keys 탭의 New SSH key > title 입력 및 Key에 복사한 내용 붙여넣기 > Add SSH key