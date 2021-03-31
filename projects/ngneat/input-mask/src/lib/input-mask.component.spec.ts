import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { InputMaskComponent } from './input-mask.component';

describe('InputMaskComponent', () => {
  let spectator: Spectator<InputMaskComponent>;
  const createComponent = createComponentFactory(InputMaskComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
