import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repostitory: Repository<Specification>;

  constructor() {
    this.repostitory = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repostitory.create({
      name,
      description,
    });

    await this.repostitory.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repostitory.findOne({ name });

    return specification;
  }
}

export { SpecificationsRepository };
