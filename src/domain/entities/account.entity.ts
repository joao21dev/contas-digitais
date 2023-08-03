import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { Customer } from './customer.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Account extends Base {
  @Column({ unique: true })
  account_number: number;

  @ManyToOne(() => Customer, (customer) => customer.accounts)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  balance: number;

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.destination_account,
  )
  transactions: Transaction[];
}
