import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Account } from './account.entity';

@Entity()
export class Customer extends Base {
  @Column()
  name: string;

  @Column()
  document: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @OneToMany(() => Account, (account) => account.customer_info)
  accounts: Account[];
}
