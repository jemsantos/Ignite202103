import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

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
