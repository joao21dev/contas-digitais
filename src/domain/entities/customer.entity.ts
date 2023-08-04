import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { Account } from './account.entity';

@Entity()
export class Customer extends Base {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 20 })
  document: string;

  @Column({ length: 500 })
  address: string;

  @Column({ length: 255 })
  email: string;

  @OneToMany(() => Account, (account) => account.customer)
  accounts: Account[];
}
