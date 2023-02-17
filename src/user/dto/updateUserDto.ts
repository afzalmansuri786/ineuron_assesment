import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto { 
    @ApiProperty({type: String})
    name: string;


    @ApiProperty({type: String})
    status: string }