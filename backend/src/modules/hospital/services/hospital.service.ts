import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from '../entities/hospital.entity';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
  ) {}

  async createHospital(hospital: Hospital): Promise<Hospital> {
    try {
      const newHospital = await this.hospitalRepository.create(hospital);
      return await this.hospitalRepository.save(newHospital);
    } catch (error) {
      throw new Error('Error creating hospital: ' + error.message);
    }
  }

  async getHospitalById(id: number): Promise<Hospital> {
    try {
      return await this.hospitalRepository.findOne({
        where: { hospitalId: id },
      });
    } catch (error) {
      throw new Error('Error getting hospital: ' + error.message);
    }
  }

  async getAllHospitals(): Promise<Hospital[]> {
    try {
      return await this.hospitalRepository.find();
    } catch (error) {
      throw new Error('Error getting hospitals: ' + error.message);
    }
  }

  async updateHospital(id: number, updatedData: Hospital): Promise<Hospital> {
    try {
      await this.hospitalRepository.update(id, updatedData);
      return await this.getHospitalById(id);
    } catch (error) {
      throw new Error('Error updating hospital: ' + error.message);
    }
  }

  async deleteHospital(id: number): Promise<void> {
    try {
      await this.hospitalRepository.softDelete(id);
    } catch (error) {
      throw new Error('Error deleting hospital: ' + error.message);
    }
  }
}
