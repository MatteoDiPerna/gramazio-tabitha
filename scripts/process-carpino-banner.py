"""Upscale, crop to banner ratio, enhance and export home banner assets."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
HOME = ROOT / "public" / "images" / "home"
BANNER_SIZE = (1920, 640)
WEBP_QUALITY = 88
PNG_COMPRESS = 6

BANNER_NAMES = (
    "carpino-banner",
    "hero-banner",
    "strip-chi-siamo",
    "strip-territorio",
)


def center_crop_to_ratio(im: Image.Image, target_w: int, target_h: int) -> Image.Image:
    target_ratio = target_w / target_h
    w, h = im.size
    src_ratio = w / h
    if src_ratio > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        box = (left, 0, left + new_w, h)
    else:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        box = (0, top, w, top + new_h)
    cropped = im.crop(box)
    return cropped.resize(BANNER_SIZE, Image.Resampling.LANCZOS)


def enhance(im: Image.Image) -> Image.Image:
    rgb = im.convert("RGB")
    rgb = ImageEnhance.Contrast(rgb).enhance(1.06)
    rgb = ImageEnhance.Color(rgb).enhance(1.08)
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.12)
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.2, percent=90, threshold=2))
    return rgb


def save_variants(base: Image.Image, stem: str, out_dir: Path) -> None:
    webp_path = out_dir / f"{stem}.webp"
    png_path = out_dir / f"{stem}.png"
    base.save(webp_path, format="WEBP", quality=WEBP_QUALITY, method=6)
    base.save(png_path, format="PNG", optimize=True, compress_level=PNG_COMPRESS)


def main() -> None:
    import sys

    if len(sys.argv) < 2:
        raise SystemExit("Usage: process-carpino-banner.py <source-image>")

    src = Path(sys.argv[1]).resolve()
    if not src.is_file():
        raise SystemExit(f"File not found: {src}")

    HOME.mkdir(parents=True, exist_ok=True)
    im = Image.open(src)
    banner = enhance(center_crop_to_ratio(im, *BANNER_SIZE))

    for name in BANNER_NAMES:
        save_variants(banner, name, HOME)
        print(f"OK {name}.webp + {name}.png ({BANNER_SIZE[0]}x{BANNER_SIZE[1]})")


if __name__ == "__main__":
    main()
