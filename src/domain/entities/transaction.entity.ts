import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @Column()
  account_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ length: 10 })
  transaction_type: string;

  // Relação com a entidade "Account"
  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;
}
