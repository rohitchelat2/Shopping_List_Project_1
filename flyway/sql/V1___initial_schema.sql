CREATE TABLE shopping_lists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  total INTEGER DEFAULT 0,
  completed INTEGER DEFAULT 0
);

CREATE TABLE shopping_list_items (
  id SERIAL PRIMARY KEY,
  shopping_list_id INTEGER REFERENCES shopping_lists(id),
  name TEXT NOT NULL,
  collected BOOLEAN DEFAULT FALSE
);