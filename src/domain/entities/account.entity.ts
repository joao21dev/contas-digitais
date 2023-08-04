import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Account {
  @PrimaryColumn()
  account_id: number;

  @Column()
  customer_id: number;

  @Column()
  balance: number;

  @ManyToOne(() => Customer, (customer) => customer.accounts)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
