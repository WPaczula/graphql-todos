import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import User from '../../entity/user';

@ValidatorConstraint({ async: true })
class UniqueUserNameConstraint implements ValidatorConstraintInterface {
  validate(userName: string) {
    return User.findOne({ where: { userName } }).then((user) => {
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
