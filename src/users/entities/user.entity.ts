import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";
import { Role } from "./role.entity";

@Entity('users')
export class User {
@PrimaryGeneratedColumn()
id!: number;

@Column()
name!: string;

@Column({ unique: true })
email!: string;

@Column()
age!: number;

@OneToMany(() => Post, (post) => post.user)
posts!: Post[];

@ManyToMany(() => Role, (role) => role.Users)
@JoinTable()
roles!: Role[];

@CreateDateColumn()
createAt!: Date;

@UpdateDateColumn()
updateAt!: Date;
}
