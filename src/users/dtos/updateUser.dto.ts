import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly givenName: string;

  @IsNotEmpty()
  readonly familyName: string;
}
