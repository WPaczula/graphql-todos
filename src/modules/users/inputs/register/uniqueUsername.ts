import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../../repositories';

@ValidatorConstraint({ async: true })
class UniqueUserNameConstraint implements ValidatorConstraintInterface {
  validate(userName: string) {
    return UserRepository()
      .findOne({ where: { userName } })
      .then((user) => {
        if (user) return false;
        return true;
      });
  }
}

const UniqueUserName = (validationOptions?: ValidationOptions) =>
  function decorate(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueUserNameConstraint,
    });
  };

export default UniqueUserName;
