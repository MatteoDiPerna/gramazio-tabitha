import { useEffect, useId, useState, type FC } from 'react';
import type { FaqItem } from '@/content/faq';
import './faqAccordion.css';

type Props = {
  items: FaqItem[];
  intro?: string;
};

function hashToId(): string | null {
  if (typeof window === 'undefined') return null;
  const raw = window.location.hash.replace(/^#/, '');
  return raw || null;
}

export const FaqAccordion: FC<Props> = ({ items, intro }) => {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const fromHash = hashToId();
    if (fromHash && items.some((i) => i.id === fromHash)) {
      setOpenId(fromHash);
      requestAnimationFrame(() => {
        document.getElementById(fromHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [items]);

  useEffect(() => {
    const onHash = () => {
      const fromHash = hashToId();
      if (fromHash && items.some((i) => i.id === fromHash)) {
        setOpenId(fromHash);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [items]);

  return (
    <div className="faq-accordion">
      {intro && <p className="faq-accordion__intro">{intro}</p>}
      {items.map((item) => {
        const panelId = `${baseId}-${item.id}`;
        const isOpen = openId === item.id;
        return (
          <section key={item.id} className="faq-accordion__item" id={item.id}>
            <h2 className="faq-accordion__heading">
              <button
                type="button"
                className="faq-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                id={`${panelId}-trigger`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                {item.question}
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={`${panelId}-trigger`}
              hidden={!isOpen}
              className="faq-accordion__panel"
              dangerouslySetInnerHTML={{ __html: item.answerHtml }}
            />
          </section>
        );
      })}
    </div>
  );
};
