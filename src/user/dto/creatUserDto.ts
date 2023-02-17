import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto { 
    @ApiProperty({type: String})
    name: string;

    @ApiProperty({type: String})
    email: string;

    @ApiProperty({type: String})
    status: string }