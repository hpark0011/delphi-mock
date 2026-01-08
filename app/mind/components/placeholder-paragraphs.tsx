const PLACEHOLDER_TEXTS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.",
];

interface PlaceholderParagraphsProps {
  repeat?: number;
}

export function PlaceholderParagraphs({
  repeat = 2,
}: PlaceholderParagraphsProps) {
  return (
    <>
      {Array.from({ length: repeat }).flatMap((_, repeatIndex) =>
        PLACEHOLDER_TEXTS.map((text, textIndex) => (
          <p
            key={`${repeatIndex}-${textIndex}`}
            className='mb-4 text-sand-12/80 text-[18px] tracking-tight'
          >
            {text}
          </p>
        ))
      )}
    </>
  );
}
