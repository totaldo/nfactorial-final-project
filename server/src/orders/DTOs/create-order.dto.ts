import { ApiProperty } from "@nestjs/swagger"

export class CreateOrderDto {
    @ApiProperty()
    name: string
    
    @ApiProperty()
    info: string
    
    @ApiProperty()
    percentage: number

    @ApiProperty()
    supplierId: number

    @ApiProperty()
    consumerId: number

    @ApiProperty()
    productId: number
}