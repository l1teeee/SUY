import { useEffect, useRef, useState } from "react";
import type { FocusEvent, MouseEvent } from "react";
import { usePathname } from "next/navigation";

export function useDisclosure<Container extends HTMLElement, Trigger extends HTMLElement>() {
  const pathname = usePathname();
  const containerRef = useRef<Container>(null);
  const triggerRef = useRef<Trigger>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openedOnPathname, setOpenedOnPathname] = useState(pathname);

  // Adjusting state while rendering (not in an effect) also covers back/forward navigation
  // without a frame where the stale panel is still open.
  if (openedOnPathname !== pathname) {
    setOpenedOnPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    function closeOnPointerDownOutside(event: PointerEvent) {
      const container = containerRef.current;
      if (container && event.target instanceof Node && !container.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const focusWasInside = containerRef.current?.contains(document.activeElement) ?? false;
      setIsOpen(false);
      // Only reclaim focus when it was inside, so Escape never steals it from another control.
      if (focusWasInside) triggerRef.current?.focus();
    }

    document.addEventListener("pointerdown", closeOnPointerDownOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDownOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  function toggle() {
    setIsOpen((current) => !current);
  }

  // A null relatedTarget (click on non-focusable content, window blur) is handled by the pointer
  // listener, so only a real move of focus to another element closes here.
  function closeWhenFocusLeaves(event: FocusEvent<HTMLElement>) {
    const nextFocused = event.relatedTarget;
    if (nextFocused instanceof Node && !event.currentTarget.contains(nextFocused)) {
      setIsOpen(false);
    }
  }

  // Needed for links to the current route, where the pathname does not change.
  function closeWhenLinkClicked(event: MouseEvent<HTMLElement>) {
    if (event.target instanceof Element && event.target.closest("a[href]")) {
      setIsOpen(false);
    }
  }

  return { isOpen, toggle, containerRef, triggerRef, closeWhenFocusLeaves, closeWhenLinkClicked };
}
