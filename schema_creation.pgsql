DROP DATABASE IF EXISTS dummy_rest;
CREATE DATABASE dummy_rest;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS menu;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE IF NOT EXISTS restaurants(
    id SERIAL PRIMARY KEY,
    name text not null unique ,
    sales numeric(10,2)
);

CREATE TABLE IF NOT EXISTS employees(
    id SERIAL PRIMARY KEY,
    name text,
    restaurant_id int,
    position text,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE IF NOT EXISTS menu(
    id SERIAL PRIMARY KEY,
    name text not null unique ,
    price numeric(4,2)
);

CREATE TABLE IF NOT EXISTS customers(
    id SERIAL PRIMARY KEY ,
    name TEXT not null
);

CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY ,
    customer_id int,
    restaurant_id int,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS order_items(
   order_id int,
    item_id int,
     PRIMARY KEY (order_id, item_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (item_id) REFERENCES menu(id)
);