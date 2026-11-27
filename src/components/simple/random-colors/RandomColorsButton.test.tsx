import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { appRender } from '@tests/renders/appRender';

import { RandomColorsButton } from './RandomColorsButton';

const buttonName = 'Couleurs aléatoires';

describe('RandomColorsButton component', () => {
  it('should render a button named "Couleurs aléatoires"', () => {
    appRender(<RandomColorsButton onClick={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: buttonName }),
    ).toBeInTheDocument();
  });

  it('should call the click handler once when clicked', async () => {
    const handleClick = vi.fn();
    const { user } = appRender(<RandomColorsButton onClick={handleClick} />);

    await user.click(screen.getByRole('button', { name: buttonName }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be reachable with Tab and triggerable with Enter or Space', async () => {
    const handleClick = vi.fn();
    const { user } = appRender(<RandomColorsButton onClick={handleClick} />);

    await user.tab();
    expect(screen.getByRole('button', { name: buttonName })).toHaveFocus();

    await user.keyboard('{Enter}');
    await user.keyboard(' ');

    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('should stay rendered regardless of the game state', () => {
    // The component takes no status prop: it is always rendered, unlike Reset.
    appRender(<RandomColorsButton onClick={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: buttonName }),
    ).toBeInTheDocument();
  });

  it('should use the Replay base styles without random colour styling', () => {
    appRender(<RandomColorsButton onClick={vi.fn()} />);

    const button = screen.getByRole('button', { name: buttonName });
    expect(button).toHaveClass(
      'bg-sky-900',
      'hover:bg-sky-800',
      'text-white',
      'rounded-lg',
      'shadow-lg',
    );
    expect(button).not.toHaveAttribute('style');
  });
});
