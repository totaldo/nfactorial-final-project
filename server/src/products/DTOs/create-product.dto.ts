import { ApiProperty } from "@nestjs/swagger"

export class CreateProductDto {
    @ApiProperty()
    name: string
    
    @ApiProperty()
    amount: number
    
    @ApiProperty()
    price: number
    
    @ApiProperty()
    unit: string

    @ApiProperty()
    supplierId: number
}