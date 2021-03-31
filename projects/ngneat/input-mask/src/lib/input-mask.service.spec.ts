import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { InputMaskService } from './input-mask.service';

describe('InputMaskService', () => {
  let spectator: SpectatorService<InputMaskService>;
  const createService = createServiceFactory(InputMaskService);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
