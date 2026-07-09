import { describe, it, expect, beforeEach } from 'vitest';
import { StudioHeader } from './studio-header';

describe('StudioHeader', () => {
  let component: StudioHeader;
  beforeEach(() => {
    component = new StudioHeader();
  });

  it('should create with title signal initialized', () => {
    expect(component.title()).toBe('Theme Designer Studio');
  });
});

