# Design tokens — Direction B (+ accenti caldi) (F02.05)

Riferimento implementazione: `src/styles/tokens.css` (F04).

## Colori

| Token | Valore | Uso |
|-------|--------|-----|
| `--color-bg` | `#FAFAF7` | Sfondo pagina |
| `--color-surface` | `#FFFFFF` | Card, header |
| `--color-text` | `#2C2A26` | Testo principale |
| `--color-text-muted` | `#4A4640` | Secondario (contrasto AA) |
| `--color-surface-sunken` | `#F3F0E8` | Notice, riepiloghi |
| `--color-border-strong` | `#D8D2C6` | Hover card |
| `--color-primary` | `#3D4F37` | Nav, titoli, CTA secondari |
| `--color-accent` | `#B8A066` | Accenti, badge premium |
| `--color-accent-warm` | `#9C6B4E` | Territorio / citazioni (accento A) |
| `--color-border` | `#E8E4DC` | Bordi |
| `--color-whatsapp` | `#25D366` | Solo pulsante WhatsApp |

## Tipografia

| Ruolo | Font stack | Note |
|-------|------------|------|
| Display / H1 | `"Cormorant Garamond", Georgia, serif` | Logo area, hero |
| UI / body | `"DM Sans", system-ui, sans-serif` | 16px base, 1.5 line-height |

Caricamento font: subset latin, `font-display: swap`.

## Spaziatura

| Token | Valore |
|-------|--------|
| `--space-xs` | 0.25rem |
| `--space-sm` | 0.5rem |
| `--space-md` | 1rem |
| `--space-lg` | 1.5rem |
| `--space-xl` | 2.5rem |
| `--space-2xl` | 4rem |

## Raggi e ombre

- `--radius-sm`: 4px  
- `--radius-md`: 8px  
- `--radius-lg`: 12px  
- `--radius-xl`: 16px  
- `--shadow-sm` / `--shadow-md` / `--shadow-lg`: elevazione leggera (card, toolbar sticky)  
- `--content-max`: 72rem (~1152px)  
- `--z-sticky`, `--z-fab`, `--z-header`, `--z-overlay`  
- `--duration-fast`, `--duration-normal`, `--ease-out`  
- `--text-xs` … `--text-xl`  

## Breakpoint

| Nome | min-width |
|------|-----------|
| sm | 480px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

## Touch target

Minimo **44×44px** per pulsanti qty e CTA mobile.
