import { useEffect, useRef } from 'react';

export function useOnClickOutside<T extends HTMLElement>(
  handler: (e: MouseEvent | TouchEvent) => void,
  classNameIgnoreIdentifiers?: string[]
) {
  const ref = useRef<T | null>(null);
  const identifiersRef = useRef<string[] | undefined>(
    classNameIgnoreIdentifiers
  );

  const getRef = (node: T | null): void => {
    ref.current = node;
  };

  useEffect(() => {
    identifiersRef.current = classNameIgnoreIdentifiers;
  }, [classNameIgnoreIdentifiers]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent): void => {
      if (!ref.current) return;

      let ignoreIdentifierMatch;

      if (identifiersRef.current && event.target instanceof HTMLElement) {
        const { target } = event;
        ignoreIdentifierMatch = identifiersRef.current.some((className) =>
          target.classList.contains(className)
        );
      }

      if (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- fix
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        ignoreIdentifierMatch
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, ref]);

  return getRef;
}
