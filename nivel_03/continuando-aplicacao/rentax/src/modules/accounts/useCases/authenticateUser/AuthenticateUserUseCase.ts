import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    console.log("'UsersRepository' created");
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Usuário exsite?
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("E-mail or password incorrect!");
    }

    // Senha está correta?
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("E-mail or password incorrect!");
    }

    // Gerar jsonwebtoken -- Your String: daniignitenodejs
    const token = sign({}, "04e578574be9e3e544c787080cc62043", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
