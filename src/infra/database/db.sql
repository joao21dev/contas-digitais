CREATE TABLE IF NOT EXISTS Customer (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  document varchar(20) NOT NULL,
  address varchar(500) NOT NULL,
  email varchar(255) NOT NULL,
  deleted_at timestamp(6) NULL,
  created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

CREATE TABLE IF NOT EXISTS Account (
  id SERIAL PRIMARY KEY,
  account_number int NOT NULL,
  customer_id integer NOT NULL,
  balance numeric NOT NULL,
  deleted_at timestamp(6) NULL, 
  created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  CONSTRAINT uk_account_account_number UNIQUE (account_number),
    CONSTRAINT fk_customer
    FOREIGN KEY (customer_id)
    REFERENCES Customer (id)
);

CREATE TABLE IF NOT EXISTS Transaction (
  id SERIAL PRIMARY KEY,
  destination_account int NOT NULL,
  amount decimal(10,2) NOT NULL,
  type varchar(10) NOT NULL,
  deleted_at timestamp(6) NULL,
  created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  CONSTRAINT fk_transaction_destination_account 
  FOREIGN KEY (destination_account) 
  REFERENCES Account (account_number) 
);

