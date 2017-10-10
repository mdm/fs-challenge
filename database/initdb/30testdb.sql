CREATE DATABASE IF NOT EXISTS test;
CREATE USER 'test'@'%' IDENTIFIED BY 'password';
GRANT ALL ON test.* TO 'test'@'%';
FLUSH PRIVILEGES;
USE test
SOURCE /docker-entrypoint-initdb.d/10schema.sql
