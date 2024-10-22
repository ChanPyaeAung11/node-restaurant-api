INSERT INTO restaurants (name, sales) VALUES
('Pasta Paradise', 5000.00),
('Burger Haven', 7500.50),
('Sushi Central', 3000.75),
('Taco Town', 4500.25),
('Pizza Place', 6000.00),
('Steakhouse Supreme', 8000.00),
('Vegan Delight', 2000.00),
('Seafood Shack', 7000.00),
('Diner Dash', 3500.00),
('Café Corner', 2500.00);

INSERT INTO employees (name, restaurant_id, position) VALUES
('Alice Johnson', 1, 'Manager'),
('Bob Smith', 1, 'Chef'),
('Cathy Brown', 2, 'Waitress'),
('David Wilson', 2, 'Bartender'),
('Eva Green', 3, 'Chef'),
('Frank White', 4, 'Manager'),
('Grace Lee', 5, 'Waitress'),
('Henry Adams', 5, 'Chef'),
('Ivy Clark', 6, 'Manager'),
('Jack Martin', 7, 'Waiter'),
('Karen Thompson', 8, 'Chef'),
('Leo Scott', 9, 'Bartender'),
('Mia Harris', 10, 'Manager'),
('Nina Lewis', 1, 'Waitress'),
('Oscar Walker', 2, 'Chef'),
('Paula Hall', 3, 'Waiter'),
('Quinn Young', 4, 'Manager'),
('Rita King', 5, 'Chef'),
('Sam Wright', 6, 'Waitress'),
('Tina Green', 7, 'Bartender');

INSERT INTO menu (name, price) VALUES
('Spaghetti Bolognese', 12.50),
('Cheeseburger', 10.00),
('California Roll', 8.50),
('Tacos', 9.00),
('Margherita Pizza', 11.00),
('Ribeye Steak', 25.00),
('Vegan Burger', 12.00),
('Grilled Salmon', 20.00),
('Caesar Salad', 8.00),
('Chocolate Lava Cake', 6.00),
('BBQ Ribs', 15.00),
('French Fries', 3.00),
('Pancakes', 7.50),
('Chicken Curry', 12.00),
('Fish and Chips', 13.50),
('Mushroom Risotto', 14.00),
('Caprese Salad', 9.00),
('Shrimp Tacos', 11.50),
('Lentil Soup', 5.00),
('Apple Pie', 4.50);

INSERT INTO customers (name) VALUES
('John Doe'),
('Jane Smith'),
('Emily Johnson'),
('Michael Brown'),
('Sarah Davis'),
('David Wilson'),
('Laura Garcia'),
('James Martinez'),
('Patricia Rodriguez'),
('Robert Lee');

INSERT INTO orders (customer_id, restaurant_id) VALUES
(1, 1),  -- John Doe, Pasta Paradise
(1, 2),  -- John Doe, Burger Haven
(2, 3),  -- Jane Smith, Sushi Central
(2, 4),  -- Jane Smith, Taco Town
(3, 5),  -- Emily Johnson, Pizza Place
(3, 6),  -- Emily Johnson, Steakhouse Supreme
(4, 7),  -- Michael Brown, Vegan Delight
(4, 8),  -- Michael Brown, Seafood Shack
(5, 9),  -- Sarah Davis, Diner Dash
(5, 10), -- Sarah Davis, Café Corner
(6, 1),  -- David Wilson, Pasta Paradise
(7, 2),  -- Laura Garcia, Burger Haven
(8, 3),  -- James Martinez, Sushi Central
(9, 4),  -- Patricia Rodriguez, Taco Town
(10, 5), -- Robert Lee, Pizza Place
(1, 6),  -- John Doe, Steakhouse Supreme
(2, 7),  -- Jane Smith, Vegan Delight
(3, 8),  -- Emily Johnson, Seafood Shack
(4, 9),  -- Michael Brown, Diner Dash
(5, 10); -- Sarah Davis, Café Corner

INSERT INTO order_items (order_id, item_id) VALUES
(1, 1),  -- Order 1: Spaghetti Bolognese
(1, 12), -- Order 1: French Fries
(2, 2),  -- Order 2: Cheeseburger
(2, 10), -- Order 2: Chocolate Lava Cake
(3, 3),  -- Order 3: California Roll
(3, 9),  -- Order 3: Caesar Salad
(4, 4),  -- Order 4: Tacos
(4, 8),  -- Order 4: Grilled Salmon
(5, 5),  -- Order 5: Margherita Pizza
(5, 14), -- Order 5: Chicken Curry
(6, 6),  -- Order 6: Ribeye Steak
(6, 11), -- Order 6: BBQ Ribs
(7, 7),  -- Order 7: Vegan Burger
(7, 13), -- Order 7: Pancakes
(8, 8),  -- Order 8: Shrimp Tacos
(8, 15), -- Order 8: Mushroom Risotto
(9, 9),  -- Order 9: Chocolate Lava Cake
(9, 16), -- Order 9: Caprese Salad
(10, 10),-- Order 10: Fish and Chips
(10, 17),-- Order 10: Lentil Soup
(11, 1),   -- Order 11: Spaghetti Bolognese
(11, 2),   -- Order 11: Cheeseburger
(11, 3),   -- Order 11: California Roll
(12, 4),   -- Order 12: Tacos
(12, 5),   -- Order 12: Margherita Pizza
(12, 6),   -- Order 12: Ribeye Steak
(13, 7),   -- Order 13: Vegan Burger
(13, 8),   -- Order 13: Shrimp Tacos
(13, 9),   -- Order 13: Chocolate Lava Cake
(14, 10),  -- Order 14: Fish and Chips
(14, 11),  -- Order 14: BBQ Ribs
(15, 12),  -- Order 15: French Fries
(15, 13),  -- Order 15: Pancakes
(16, 14),  -- Order 16: Chicken Curry
(16, 15),  -- Order 16: Mushroom Risotto
(17, 16),  -- Order 17: Caprese Salad
(17, 17),  -- Order 17: Lentil Soup
(18, 18),  -- Order 18: Grilled Salmon
(18, 19),  -- Order 18: Caesar Salad
(19, 20),  -- Order 19: Chocolate Lava Cake
(19, 1),   -- Order 19: Fish Tacos
(20, 2),   -- Order 20: Vegan Burger
(20, 3);   -- Order 20: BBQ Ribs



INSERT INTO customers (name) VALUES
('Alice Williams'),
('Brian Taylor'),
('Catherine Anderson'),
('Daniel Thomas'),
('Ella Martinez'),
('Franklin Harris'),
('Grace Robinson'),
('Hannah Clark'),
('Isaac Lewis'),
('Julia Walker');