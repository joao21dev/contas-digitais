import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './account.entity';
import { Base } from './base.entity';

@Entity()
export class Transaction extends Base {
  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: 'destination_account' })
  destination_account: number;

  @Column()
  type: string;

  @Column()
  amount: number;
}
