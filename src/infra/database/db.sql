CREATE TABLE IF NOT EXISTS Customer (
  customer_id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  document varchar(20) NOT NULL,
  address varchar(500) NOT NULL,
  email varchar(255) NOT NULL,
  deleted_at timestamp(6) NULL,
  created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

CREATE TABLE IF NOT EXISTS Account (
  account_id int PRIMARY KEY,
  customer_id int NOT NULL,
  balance numeric NOT NULL,
  deleted_at timestamp(6) NULL, 
  created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    FOREIGN KEY (customer_id)
    REFERENCES Customer (customer_id)
);

CREATE TABLE IF NOT EXISTS Transaction (
  transaction_id int PRIMARY KEY,
  account_id int NOT NULL,
  amount decimal(10,2) NOT NULL,
  transaction_type varchar(10) NOT NULL,
  deleted_at timestamp(6) NULL,
  created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  FOREIGN KEY (account_id) 
  REFERENCES Account (account_id) 
);

