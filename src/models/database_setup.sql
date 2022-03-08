-- Create minify database
CREATE DATABASE minify;

-- CREATE USER TABLE
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(250) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    registered timestamptz
);

-- CREATE USER_FOLDER TABLE
CREATE TABLE folders(
    id SERIAL PRIMARY KEY,
    folder_name VARCHAR(250),
    
)