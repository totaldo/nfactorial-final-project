import { ApiProperty } from "@nestjs/swagger";

export class CreateConsumerDto {
    @ApiProperty()
    name: string
}