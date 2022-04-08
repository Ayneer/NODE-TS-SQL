CREATE DATABASE "test-sw"
WITH
    OWNER = postgres ENCODING = 'UTF8' CONNECTION
LIMIT
    = -1;

CREATE SCHEMA sw AUTHORIZATION postgres;

CREATE TABLE
    sw."user" (
        id serial NOT NULL,
        name text NOT NULL,
        email text NOT NULL,
        password text NOT NULL,
        PRIMARY KEY (email)
    );

ALTER TABLE
    IF EXISTS sw."user" OWNER TO postgres;