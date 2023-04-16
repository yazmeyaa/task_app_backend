CREATE TABLE User (
    id INT(12) NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY (username),
    UNIQUE KEY (email)
);

/*
 id: уникальный идентификатор пользователя;
 username: имя пользователя, уникальное поле;
 email: email пользователя, уникальное поле;
 password: хэш пароля пользователя;
 created_at: дата и время создания записи;
 updated_at: дата и время обновления записи.
 */