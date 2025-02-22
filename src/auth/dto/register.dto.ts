import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Поле имя не должно быть пустым' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Поле с фамилией не должно быть пустым' })
  surname: string;

  @IsString()
  @IsNotEmpty({ message: 'Поле email не должно быть пустым' })
  @IsEmail({}, { message: 'Введите корректный email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Поле пароля не должно быть пустым' })
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Поле повторного пароля не должно быть пустым' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  passwordRepeat: string;
}
