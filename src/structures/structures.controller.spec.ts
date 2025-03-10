import { Test, TestingModule } from '@nestjs/testing';
import { StructureController } from './structures.controller';

describe('StructureController', () => {
  let controller: StructureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StructureController],
    }).compile();

    controller = module.get<StructureController>(StructureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
