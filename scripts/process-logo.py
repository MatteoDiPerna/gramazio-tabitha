"""Ricostruisce il cerchio tagliato, upscale e genera favicon da public/logo.jpg."""
from __future__ import annotations

import base64
import io
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "logo.jpg"
OUT_PNG = ROOT / "public" / "logo.png"
OUT_ICO = ROOT / "public" / "favicon.ico"
OUT_FAVICON_PNG = ROOT / "public" / "favicon.png"
OUT_APPLE = ROOT / "public" / "apple-touch-icon.png"
OUT_SVG = ROOT / "public" / "favicon.svg"

SCALE = 2
WHITE_THRESHOLD = 235
CIRCLE_MARGIN = 28
EDGE_INLIER = 6


def is_white_rgb(r: int, g: int, b: int) -> bool:
    return r >= WHITE_THRESHOLD and g >= WHITE_THRESHOLD and b >= WHITE_THRESHOLD


def fit_circle(rgb: np.ndarray) -> tuple[float, float, float]:
    h, w, _ = rgb.shape
    white = (
        (rgb[:, :, 0] >= WHITE_THRESHOLD)
        & (rgb[:, :, 1] >= WHITE_THRESHOLD)
        & (rgb[:, :, 2] >= WHITE_THRESHOLD)
    )
    fg = ~white
    edge_pts: list[tuple[int, int]] = []
    for y in range(1, h - 1):
        for x in range(1, w - 1):
            if not fg[y, x]:
                continue
            if (
                white[y, x - 1]
                or white[y, x + 1]
                or white[y - 1, x]
                or white[y + 1, x]
            ):
                edge_pts.append((x, y))

    pts = np.array(edge_pts, dtype=float)
    cx, cy, r = 267.5, 268.5, 262.5
    for _ in range(10):
        d = np.sqrt((pts[:, 0] - cx) ** 2 + (pts[:, 1] - cy) ** 2)
        mask = np.abs(d - r) < EDGE_INLIER
        p = pts[mask]
        if len(p) < 80:
            break
        design = np.column_stack([2 * p[:, 0], 2 * p[:, 1], np.ones(len(p))])
        target = p[:, 0] ** 2 + p[:, 1] ** 2
        coeff, _, _, _ = np.linalg.lstsq(design, target, rcond=None)
        cx, cy, c0 = coeff
        r = float(np.sqrt(c0 + cx * cx + cy * cy))

    return float(cx), float(cy), float(r)


def reconstruct_full_circle(rgb: np.ndarray) -> Image.Image:
    h, w, _ = rgb.shape
    white = (
        (rgb[:, :, 0] >= WHITE_THRESHOLD)
        & (rgb[:, :, 1] >= WHITE_THRESHOLD)
        & (rgb[:, :, 2] >= WHITE_THRESHOLD)
    )
    fg = ~white
    teal = np.median(rgb[fg], axis=0).astype(np.uint8)

    cx, cy, r = fit_circle(rgb)
    size = int(np.ceil(2 * (r + CIRCLE_MARGIN)))
    center = (size - 1) / 2.0
    ox = int(round(center - cx))
    oy = int(round(center - cy))

    yy, xx = np.mgrid[0:size, 0:size]
    dx = xx + 0.5 - center
    dy = yy + 0.5 - center
    inside = (dx * dx + dy * dy) <= r * r

    out = np.zeros((size, size, 4), dtype=np.uint8)
    r_int, g_int, b_int = int(teal[0]), int(teal[1]), int(teal[2])

    for y in range(size):
        for x in range(size):
            if not inside[y, x]:
                continue
            sx, sy = x - ox, y - oy
            if 0 <= sx < w and 0 <= sy < h:
                pr, pg, pb = (int(rgb[sy, sx, 0]), int(rgb[sy, sx, 1]), int(rgb[sy, sx, 2]))
                src_dist = np.hypot(sx - cx, sy - cy)
                if is_white_rgb(pr, pg, pb):
                    if src_dist <= r - 0.5:
                        out[y, x] = (pr, pg, pb, 255)
                    else:
                        out[y, x] = (r_int, g_int, b_int, 255)
                else:
                    out[y, x] = (pr, pg, pb, 255)
            else:
                out[y, x] = (r_int, g_int, b_int, 255)

    return Image.fromarray(out, mode="RGBA")


def main() -> None:
    if not SRC.is_file():
        raise SystemExit(f"Manca sorgente: {SRC}")

    base_rgb = np.array(Image.open(SRC).convert("RGB"))
    cx, cy, r = fit_circle(base_rgb)
    print(f"Cerchio stimato: centro=({cx:.1f}, {cy:.1f}) r={r:.1f}px")

    logo = reconstruct_full_circle(base_rgb)
    w, h = logo.size
    logo = logo.resize((w * SCALE, h * SCALE), Image.Resampling.LANCZOS)
    logo = logo.filter(ImageFilter.UnsharpMask(radius=1.0, percent=85, threshold=2))
    logo.save(OUT_PNG, format="PNG", optimize=True)

    square = logo
    sizes_ico = [(16, 16), (32, 32), (48, 48)]
    icons = [square.resize(s, Image.Resampling.LANCZOS) for s in sizes_ico]
    icons[0].save(
        OUT_ICO,
        format="ICO",
        sizes=[(i.width, i.height) for i in icons],
        append_images=icons[1:],
    )

    fav32 = square.resize((32, 32), Image.Resampling.LANCZOS)
    fav32.save(OUT_FAVICON_PNG, format="PNG", optimize=True)
    square.resize((180, 180), Image.Resampling.LANCZOS).save(
        OUT_APPLE, format="PNG", optimize=True
    )

    buf = io.BytesIO()
    fav32.save(buf, format="PNG")
    b64 = base64.standard_b64encode(buf.getvalue()).decode("ascii")
    OUT_SVG.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
        f'<image href="data:image/png;base64,{b64}" width="32" height="32"/>'
        f"</svg>\n",
        encoding="utf-8",
    )

    print(f"OK: {OUT_PNG.relative_to(ROOT)} ({logo.width}x{logo.height})")


if __name__ == "__main__":
    main()
