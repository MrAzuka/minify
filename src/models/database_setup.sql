-- Create minify database
CREATE DATABASE minify;

-- CREATE USER TABLE
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(250),
    email VARCHAR(250) UNIQUE,
    password VARCHAR(30)
);

-- CREATE USER_FOLDER TABLE
CREATE TABLE folders(
    id SERIAL PRIMARY KEY,
    folder_name VARCHAR(250),
    
)