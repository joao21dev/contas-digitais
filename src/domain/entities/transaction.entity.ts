import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Transaction {
  @PrimaryColumn()
  transaction_id: number;

  @Column()
  account_id: number;

  @Column('decimal', { precision: 2, scale: 2 })
  amount: number;

  @Column({ length: 10 })
  transaction_type: string;

  // Relação com a entidade "Account"
  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
