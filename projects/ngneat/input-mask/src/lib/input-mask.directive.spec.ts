import { InputMaskDirective } from '@ngneat/input-mask';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

describe('HighlightDirective', () => {
  let spectator: SpectatorDirective<InputMaskDirective>;
  const createDirective = createDirectiveFactory(InputMaskDirective);

  beforeEach(() => {
    spectator = createDirective(`<input inputMask>`);
  });

  it('should get the instance', () => {
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });
});
