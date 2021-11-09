import { ICreateStudentDTO } from '../../../dtos/ICreateStudentDTO';
import {
  IFindStudentParams,
  IStudentsRepository,
} from '../../../repositories/IStudentsRepository';

import Student, { IStudentsSchema } from '../schemas/Student';

export class StudentsRepositoryMongoose implements IStudentsRepository {
  async findAll(params?: IFindStudentParams): Promise<IStudentsSchema[]> {
    return Student.find({
      $or: [
        { name: { $regex: params?.search || '', $options: 'i' } },
        {
          student_id_keep: {
            $regex: params?.search || '',
            $options: 'i',
          },
        },
      ],
    })
      .skip(Number(params?.offset) || 0)
      .limit(Number(params?.limit) || 10);
  }

  async countAll(params?: IFindStudentParams): Promise<number> {
    return Student.find({
      $or: [
        { name: { $regex: params?.search || '', $options: 'i' } },
        {
          student_id_keep: {
            $regex: params?.search || '',
            $options: 'i',
          },
        },
      ],
    }).count();
  }

  async findById(id: string): Promise<IStudentsSchema | null> {
    return Student.findById(id).populate('student_logs');
  }

  async findByKeepId(keep_id: string): Promise<IStudentsSchema | null> {
    return Student.findOne({ student_id_keep: keep_id });
  }

  async create(createStudentData: ICreateStudentDTO): Promise<void> {
    const { name, student_id_keep, logs } = createStudentData;

    await Student.create({
      name,
      student_id_keep,
      student_logs: logs,
    });
  }

  async createMany(createManyStudentData: ICreateStudentDTO[]): Promise<void> {
    await Student.insertMany(createManyStudentData);
  }

  async save(student: IStudentsSchema): Promise<void> {
    await student.save();
  }
}
