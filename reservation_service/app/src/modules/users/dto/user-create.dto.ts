import { IsDefined, IsEmail, IsIn, IsString, Length } from "class-validator";
import { UserRoleEnum } from "src/enums/user-role.enum";
import { User } from "src/modules/users/mongo.schemas/user.schema";

export class CreateUserDto extends User {
  @IsDefined() @IsString() @IsEmail()
  email: string;

  @IsDefined() @IsString() @Length(10)
  passwordHash: string;

  @IsDefined() @IsString() @Length(3)
  name: string;

  @IsString()
  contactPhone: string;

  @IsString() @IsIn([UserRoleEnum.client, UserRoleEnum.admin, UserRoleEnum.manager])
  role: string;
}
