import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './account.entity';
import { Base } from './base.entity';

@Entity()
export class Transaction extends Base {
  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: 'account_number' })
  account: Account;

  @Column()
  type: string;

  @Column()
  amount: number;
}
