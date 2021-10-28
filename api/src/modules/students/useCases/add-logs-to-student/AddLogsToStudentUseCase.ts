import { inject, injectable } from 'tsyringe';
import { IStudentLogsRepository } from '../../repositories/IStudentLogsRepository';
import { IStudentsRepository } from '../../repositories/IStudentsRepository';

@injectable()
export class AddLogsToStudentUseCase {
  constructor(
    @inject('StudentsRepository')
    private studentRepository: IStudentsRepository,
    @inject('StudentLogsRepository')
    private studentLogsRepository: IStudentLogsRepository,
  ) {}

  async run(): Promise<void> {
    const students = await this.studentRepository.findAll({
      limit: 200,
      offset: 1200,
    });

    // console.log(students);

    students.forEach(async (student, index) => {
      // console.log(student);

      const logs = await this.studentLogsRepository.findAllByKeepId(
        student.student_id_keep,
        {
          limit: 4000,
        },
      );

      const logs_id = logs.map(log => log._id);

      student.student_logs = logs_id;

      await this.studentRepository.save(student);
      console.log(`foi ${index}\n `);
    });
  }
}
