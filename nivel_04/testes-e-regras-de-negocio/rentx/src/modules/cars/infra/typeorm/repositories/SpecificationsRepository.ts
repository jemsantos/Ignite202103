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

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repostitory.create({
      name,
      description,
    });

    await this.repostitory.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repostitory.findOne({ name });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repostitory.findByIds(ids);

    return specifications;
  }
}

export { SpecificationsRepository };
