import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Supplier } from "src/suppliers/supplier.entity";
import { Order } from "src/orders/order.entity";

@Entity()
export class Product {
    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    id: number

    @ApiProperty()
    @Column()
    name: string

    @ApiProperty()
    @Column()
    amount: number

    @ApiProperty()
    @Column()
    price: number

    @ApiProperty()
    @Column()
    unit: string

    @ManyToOne(() => Supplier, supplier => supplier.products)
    supplier: Supplier

    @ApiProperty()
    @Column()
    supplierId: number

    @OneToOne(() => Order, order => order.product)
    order: Order

    @Column({ type: 'int', default: 0 })
    orderId: number
}