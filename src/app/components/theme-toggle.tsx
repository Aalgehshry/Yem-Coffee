import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

/**
 * Light / dark switch.
 *
 * `theme.css` already defined a full `.dark` palette and `next-themes` was
 * already a dependency, but nothing ever added the `dark` class — so the dark
 * theme was dead code. This wires it up and persists the choice.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The resolved theme is only known in the browser. Rendering the icon before
  // mount would show the wrong one for a frame on a dark-mode machine.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  // Until the effect above has run, `resolvedTheme` is undefined — so the
  // label stays neutral rather than claiming a direction that may be wrong.
  const label = !mounted
    ? 'Toggle theme'
    : isDark
      ? 'Switch to light theme'
      : 'Switch to dark theme';

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={!mounted}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={label}
    >
      {mounted && isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  );
}
