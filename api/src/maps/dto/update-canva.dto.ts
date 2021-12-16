import { PartialType } from '@nestjs/mapped-types';
import { GenerateCanva } from './generate-canva.dto';

export class UpdateMapDto extends PartialType(GenerateCanva) {}
