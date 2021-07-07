import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  /* findByName(name: string): Promise<Car>;
  list(): Promise<Car[]>; */
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}

export { ICarsRepository };
