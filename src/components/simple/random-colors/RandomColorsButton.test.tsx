import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { appRender } from '@tests/renders/appRender';

import { Reset } from '../reset/Reset';
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

  it('should render without any status prop, so no game state can hide it', () => {
    // The component takes no status prop: it is always rendered.
    // Game-level behaviour across status changes is not covered by this unit test.
    appRender(<RandomColorsButton onClick={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: buttonName }),
    ).toBeInTheDocument();
  });

  it('should share the exact class list of the Replay button, without inline style', () => {
    // Reset renders the Replay button for status 'GameOver': compare against its real classes.
    appRender(<Reset status="GameOver" onClick={vi.fn()} />);
    const replayClassName = screen.getByRole('button', {
      name: 'Replay',
    }).className;

    appRender(<RandomColorsButton onClick={vi.fn()} />);
    const button = screen.getByRole('button', { name: buttonName });

    expect(button.className).toBe(replayClassName);
    expect(button).not.toHaveAttribute('style');
  });
});
