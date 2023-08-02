import { PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './cerate-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
