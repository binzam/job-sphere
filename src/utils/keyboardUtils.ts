export const handleDropdownKeyDown = <T>(
  event: React.KeyboardEvent<HTMLUListElement>,
  listing: T[],
  focusedIndex: number,
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>,
  onSelect?: (item: T) => void,
  onClose?: () => void
) => {
  if (!listing.length) return;

  switch (event.key) {
    case 'ArrowDown': {
      event.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % listing.length);
      break;
    }
    case 'ArrowUp': {
      event.preventDefault();
      setFocusedIndex((prev) => (prev === 0 ? listing.length - 1 : prev - 1));
      break;
    }
    case 'Enter':
    case ' ': {
      event.preventDefault();
      onSelect?.(listing[focusedIndex]);
      onClose?.();
      break;
    }
    case 'Escape': {
      onClose?.();
      break;
    }
    default:
      break;
  }
};
export const handleSearchSuggestionsKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement | HTMLUListElement>,
  suggestions: { key: string; label: string }[],
  focusedIndex: number,
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>,
  handleSuggestionClick: (value: string, key: string) => void
) => {
  if (suggestions.length === 0) return;

  switch (e.key) {
    case 'ArrowDown': {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % suggestions.length);
      break;
    }
    case 'ArrowUp': {
      e.preventDefault();
      setFocusedIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
      break;
    }
    case 'Enter':
    case ' ': {
      e.preventDefault();
      if (focusedIndex >= 0 && suggestions[focusedIndex]) {
        handleSuggestionClick(
          suggestions[focusedIndex].label,
          suggestions[focusedIndex].key
        );
      }
      break;
    }
    case 'Escape': {
      e.preventDefault();
      setFocusedIndex(-1);
      break;
    }
    default:
      break;
  }
};
