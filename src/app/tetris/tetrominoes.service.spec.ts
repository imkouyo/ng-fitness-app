import { TestBed } from '@angular/core/testing';

import { TetrominoesService } from './tetrominoes.service';

describe('TetrominoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TetrominoesService = TestBed.get(TetrominoesService);
    expect(service).toBeTruthy();
  });
});
