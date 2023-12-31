-- scripts para inserção de dados

-- Inserir um novo cliente
INSERT INTO Customer (name, document, address, email)
VALUES
  ('João Silva', '123456789', '123 Main St', 'joao@example.com');

-- Inserir uma nova conta associada ao cliente criado anteriormente
INSERT INTO Account (account_id, customer_id, balance)
VALUES (1, 1, 1000.00);

-- Inserir uma nova transação associada à conta criada anteriormente
INSERT INTO Transaction (transaction_id, account_id, amount, transaction_type)
VALUES (1, 1, 200.00, 'deposit');

-- Atualizar o saldo da conta
UPDATE Account
SET balance = 1200.00
WHERE account_id = 1;

-- Atualizar informações do cliente
UPDATE Customer
SET name = 'João da Silva', email = 'joao.silva@example.com'
WHERE customer_id = 1;

-- Encontrar uma conta criada
SELECT * FROM Account WHERE account_id = 1;

-- Encontrar um cliente criado
SELECT * FROM Customer WHERE customer_id = 1;

-- Encontrar uma movimentação criada
SELECT * FROM Transaction WHERE transaction_id = 1;
