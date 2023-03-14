import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Order } from "src/orders/order.entity";
import { Product } from "src/products/product.entity";

@Entity()
export class Supplier {
    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    id: number

    @ApiProperty()
    @Column()
    name: string

    @ApiProperty()
    @Column()
    address: string

    @ApiProperty()
    @Column()
    type: string

    @OneToMany(() => Order, order => order.supplier)
    orders: Order[]

    @OneToMany(() => Product, product => product.supplier)
    products: Product[]
}