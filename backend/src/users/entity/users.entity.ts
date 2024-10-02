import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // This will store the hashed password

  @Column()
  phone_number: string;

  @Column('simple-array', { nullable: true })
  payment_methods: string[]; // Array for storing payment methods

  @CreateDateColumn()
  created_at: Date; // Automatically stores creation date

  @UpdateDateColumn()
  updated_at: Date; // Automatically stores the last update date
}
