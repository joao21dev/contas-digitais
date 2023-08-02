import { CreateCustomerController } from './create-customer/create-customer.controller';
import { FindAllCustomersController } from './find-all-customers/find-all-customers.controller';
import { FindByIdCustomerController } from './find-by-id-customer/find-by-id-customer.controller';
import { UpdateCustomerController } from './update-customer/update-customer.controller';

export default [
  FindAllCustomersController,
  CreateCustomerController,
  FindByIdCustomerController,
  UpdateCustomerController,
];
