import { useId, useState, type FC } from 'react';
import type { FaqItem } from '@/content/faq';

type Props = {
  items: FaqItem[];
  intro?: string;
};

export const FaqAccordion: FC<Props> = ({ items, intro }) => {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

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
      <style>{`
        .faq-accordion { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.5rem; }
        .faq-accordion__intro {
          margin: 0 0 1rem;
          color: #5c574f;
          line-height: 1.6;
          max-width: 40rem;
        }
        .faq-accordion__item {
          border: 1px solid #e8e4dc;
          border-radius: 12px;
          background: #fff;
          overflow: hidden;
        }
        .faq-accordion__heading { margin: 0; font-size: inherit; }
        .faq-accordion__trigger {
          width: 100%;
          text-align: left;
          min-height: 44px;
          padding: 1rem 1.25rem;
          font: inherit;
          font-family: var(--font-display, Georgia, serif);
          font-size: 1.125rem;
          font-weight: 600;
          color: #3d4f37;
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .faq-accordion__trigger:hover { background: #fafaf7; }
        .faq-accordion__trigger:focus-visible {
          outline: 2px solid #3d4f37;
          outline-offset: -2px;
        }
        .faq-accordion__panel {
          padding: 0 1.25rem 1rem;
          color: #5c574f;
          line-height: 1.65;
          max-width: 40rem;
        }
        .faq-accordion__panel a { color: #3d4f37; }
      `}</style>
    </div>
  );
};
