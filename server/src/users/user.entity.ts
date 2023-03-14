import { Role } from "src/auth/common/constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    username: string

    @Column()
    password: string

    // salt to hash passwords
    @Column({ nullable: true })
    salt: string

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    role: Role
}