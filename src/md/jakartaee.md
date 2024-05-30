---
title: Jakarata EE
category: JakartaEE
tag:
  - java
  - jakarataEE
---

# JakartaEE

## Structure

```bash
C:.
│  mvnw
│  mvnw.cmd
│  pom.xml
│
├─.mvn
│  └─wrapper
│          maven-wrapper.jar
│          maven-wrapper.properties
│
└─src
    ├─main
    │  ├─java
    │  │  └─com
    │  │      └─user
    │  │          └─test
    │  │                  HelloServlet.java
    │  │
    │  ├─resources
    │  └─webapp
    │      │  index.jsp
    │      │
    │      └─WEB-INF
    │              web.xml
    │
    └─test
        ├─java
        └─resources
```

### Files

- pom.xml : 의존성 패키지 파일을 명시하는 파일
- /WEB-INF/ : .jsp 파일을 보관하는 폴더, .jsp 파일은 MVC 패턴의 View에 해당
- HelloServlet.java : Servlet 기본 파일, 사용자의 요청을 처리, Servlet 파일은 MVC 패턴의 Controller에 해당
