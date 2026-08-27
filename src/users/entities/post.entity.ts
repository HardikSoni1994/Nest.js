import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('posts')
export class Post {
@PrimaryGeneratedColumn()
id!: number;

@Column()
title!: string;

@Column('text')
content!: string;

@ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE'})
user!: User;

@CreateDateColumn()
createdAt!: Date;

@UpdateDateColumn()
updatedAt!: Date;
}