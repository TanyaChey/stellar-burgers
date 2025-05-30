export default function scrollToRef(ref: React.RefObject<HTMLElement> | null) {
  ref?.current?.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });
}
