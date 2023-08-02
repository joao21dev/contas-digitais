import { CreateCustomerService } from './create-customer/create-customer.service';
import { FindByIdCustomerService } from './find-by-id-customer/find-by-id-customer.service';
import { UpdateCustomerService } from './update-customer/update-customer.service';
import { FindAllCustomersService } from './find-all-customers/find-all-customers.service';

export default [
  FindAllCustomersService,
  CreateCustomerService,
  UpdateCustomerService,
  FindByIdCustomerService,
];
