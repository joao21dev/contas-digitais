import { CreateCustomerService } from './create-customer/create-customer.service';
import { FindByCustomerIdCustomerService } from './find-by-customer-id-customer/find-by-customer-id-customer.service';
import { UpdateCustomerService } from './update-customer/update-customer.service';
import { FindAllCustomersService } from './find-all-customers/find-all-customers.service';

export default [
  FindAllCustomersService,
  CreateCustomerService,
  UpdateCustomerService,
  FindByCustomerIdCustomerService,
];
