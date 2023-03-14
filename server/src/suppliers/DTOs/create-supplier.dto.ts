import { ApiProperty } from "@nestjs/swagger"

export class CreateSupplierDto {
    @ApiProperty()
    readonly name: string
    
    @ApiProperty()
    readonly address: string
    
    @ApiProperty({
        description: "Электронный или бумажный"
    })
    readonly type: string
}