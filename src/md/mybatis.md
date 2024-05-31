---
filename: mybatis.md
tags:
  - java
  - jakarataEE
  - mybatis
  - oracle
category: mybatis
created: Fri, 31 May 2024 02:27:03 GMT
title: MyBatis 세팅
---




# MyBatis

> MyBatis is a first class persistence framework with support for custom SQL, stored procedures and advanced mappings.

- custom SQL, mapping 을 지원하는 framework, mapping 이란 SQL 실행 결과를 JAVA 객체로 가져오는 것입니다
- SQL을 직접 작성해야 하므로 ORM과 다릅니다

## Getting started

### Installation

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.16</version>
</dependency>
```

### Settings

pom.xml 에 추가

```java title="../main/java/com/user/project/MyBatisFactory.java"
package com.user.project.mybatis;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class MyBatisFactory {
    private static SqlSessionFactory sqlSessionFactory;
    static {
        String resource = "mybatis-config.xml";
        try {
            InputStream inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public static SqlSession getSqlSession() {
        return sqlSessionFactory.openSession(true);
    }
}
```

HelloServlet 이 위치한 패키지에 mybatis 패키지를 생성하고, mybatis 패키지에 MyBatisFactory.java 파일을 생성합니다

```xml title=".../src/main/resources/mybatis-config.xml"
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${driver}"/>
                <property name="url" value="${url}"/>
                <property name="username" value="${username}"/>
                <property name="password" value="${password}"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="data.xml"/>
    </mappers>
</configuration>
```

파일을 /resources 폴더에 생성한 경우 위처럼 파일 이름으로 접근이 가능합니다
<br/>
value 부분에 드라이버와 정보를 직접 입력해도 되고, 아래처럼 /resources 폴더에 파일을 생성하고 파일을 불러와도 됩니다

```xml title=".../src/main/resources/mybatis-config.xml"
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <properties resource="db.properties"></properties>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${driver}"/>
                <property name="url" value="${url}"/>
                <property name="username" value="${username}"/>
                <property name="password" value="${password}"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="data.xml"/>
    </mappers>
</configuration>
```

```bash title=".../src/main/resources/db.properties"
driver=oracle.jdbc.OracleDriver
url=jdbc:oracle:thin:@localhost:1521:xe
username=user123456
password=123456789
```

/resource 폴더 내에 data.xml 을 생성합니다

```xml title=".../src/main/resources/data.xml"
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.user.project">
    <select id="getData" resultType="path.to.dto.DataDTO" parameterType="int">
        select * from data where id = #{id}
    </select>
</mapper>
```

- CRUD(create, select, update, delete) 를 mapper 안에서 할 수 있습니다

- SQL은 세미콜론으로 끝나지 않아야 합니다

- parameter 는 하나의 객체만 전달 가능합니다, SQL에 여러개의 parameter가 필요할 경우 다른 자료구조나 객체를 사용해야 합니다

  - 사용된 parameter는 parameterType 에 명시해야 합니다

  - SQL에 #{key} 값으로 parameter를 전달 가능합니다

  - parameter의 field 이름이 key값과 일치하면 자동으로 SQL에 입력됩니다

- SQL 에서 부등호를 사용할 수 없습니다 사용하고자 한다면 부등호가 들어갈 자리를 다음과 같이 감싸주어야 합니다

```xml
<select id="getDataList" resultType="DataDTO">
    select * from data where id <![CDATA[>=]]> 200 AND id <![CDATA[<=]]> 210
</select>
...
<select id="getDataList2" resultType="DataDTO" parameterType="HashMap">
    <![CDATA[
        select * from data where id >= #{start} AND id <= #{end}
    ]]>
</select>
```

id 값은 겹치면 안 됩니다

```java title=".../src/main/java/com/user/project/dto/DataDTO.java"
package com.user.project.DTO;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DataDTO {
    private int no;
    private String title;
    private String content;
    private String created;
    private String author;
    private String password;
}
```

DTO를 작성하고 DAO를 작성합니다

```java title=".../src/main/java/com/user/project/dao/DataDAO.java"
package com.user.project.DAO;

import com.user.project.DTO.DataDTO;
import com.user.project.mybatis.MyBatisFactory;
import org.apache.ibatis.session.SqlSession;

public class DataDAO {
    public DataDTO getData() {
        DataDTO dataDTO = null;
        SqlSession sqlSession = MyBatisFactory.getSqlSession();
        dataDTO = sqlSession.selectOne("getData", 210);
        sqlSession.close();
        return dataDTO;
    }
}
```

com.user.project.Controller package를 만들고 Data.java 이름의 Servlet 파일을 만듭니다, WEB-INF 폴더에 view.jsp도 작성합니다

```java title=".../src/main/java/com/user/project/controller/data/Data.java"
package com.user.project.Controller;

import com.user.project.DAO.DataDAO;
import com.user.project.DTO.DataDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/data")
public class Data extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        DataDAO dataDAO = new DataDAO();
        DataDTO dataDTO = dataDAO.getData();
        req.setAttribute("dataDTO",dataDTO);
        req.getRequestDispatcher("/WEB-INF/view.jsp").forward(req, resp);
    }
}
```

```xml title=".../src/main/webapp/WEB-INF/view.jsp"
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>View</title>
</head>
<body>
<h1>${dataDTO.title}</h1>
</body>
</html>
```

/data 경로에서 view.jsp 가 정상적으로 출력되는지 확인합니다

### Reference

[mybatis.org](https://mybatis.org/mybatis-3/getting-started.html)