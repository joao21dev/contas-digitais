import entities from '@domain/entities';
import { InfraModule } from '@infra/infra.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresentationModule } from '@presentation/presentation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([...entities]),
    PresentationModule,
    InfraModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
