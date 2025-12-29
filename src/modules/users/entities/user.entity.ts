import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CategoriaUsuario } from './categoria-usuario.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ name: 'id_categoria' })
  id_categoria: number;

  @ManyToOne(() => CategoriaUsuario)
  @JoinColumn({ name: 'id_categoria' })
  categoria: CategoriaUsuario;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
