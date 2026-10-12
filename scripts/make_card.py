"""Print-ready QR for the Vishwear visiting card.

Usage:
  PYTHONPATH=.pytools python3 scripts/make_card.py https://vishwear-fashion.netlify.app
"""

import sys
from pathlib import Path

import qrcode
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "brand"
URL = sys.argv[1] if len(sys.argv) > 1 else "https://vishwear-fashion.netlify.app"

WINE = (74, 17, 28, 255)
BURGUNDY = (107, 30, 43, 255)
IVORY = (255, 251, 247, 255)
GOLD = (217, 180, 143, 255)


def font(size, italic=False):
    candidates = [
        "/System/Library/Fonts/Supplemental/Didot.ttc",
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/Library/Fonts/Georgia.ttf",
    ]
    if italic:
        candidates.insert(0, "/System/Library/Fonts/Supplemental/Georgia Italic.ttf")
    for path in candidates:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, size=size)
            except OSError:
                continue
    return ImageFont.load_default()


def make_qr(url):
    qr = qrcode.QRCode(
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=18,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#4A111C", back_color="#FFFBF7").convert("RGBA")
    return img


def main():
    try:
        import qrcode  # noqa: F401
    except ImportError:
        raise SystemExit("Install qrcode into .pytools first: python3 -m pip install --target .pytools qrcode pillow")

    OUT.mkdir(exist_ok=True)
    qr = make_qr(URL)
    qr_path = OUT / "vishwear-qr.png"
    qr.save(qr_path)

    # Landscape card panel, ~300dpi of a wide visiting-card insert.
    width, height = 1800, 1050
    card = Image.new("RGBA", (width, height), IVORY)
    draw = ImageDraw.Draw(card)
    draw.rectangle((0, 0, 760, height), fill=WINE)
    draw.rectangle((760, 0, 768, height), fill=GOLD)

    logo = Image.open(ROOT / "public/images/logo/logo.png").convert("RGBA")
    logo.thumbnail((560, 620), Image.Resampling.LANCZOS)
    # Place the lockup on an ivory plate so the edges stay clean on wine.
    plate = Image.new("RGBA", (logo.width + 70, logo.height + 70), IVORY)
    plate.paste(logo, (35, 35), logo)
    card.paste(plate, (80, 90), plate)

    tag = font(28)
    draw.text((100, 900), "VISHWEAR", font=font(42), fill=GOLD)
    draw.text((100, 960), "Silhouette tera signature hamara", font=tag, fill=(235, 213, 188, 255))

    qr_side = 500
    qr_fit = qr.resize((qr_side, qr_side), Image.Resampling.NEAREST)
    right_x, right_w = 768, width - 768
    qx = right_x + (right_w - qr_side) // 2
    qy = 90
    card.paste(qr_fit, (qx, qy), qr_fit)

    label = font(36)
    small = font(26)
    lines = [
        (label, "Scan to view & order", BURGUNDY),
        (small, "Collection juo  ·  WhatsApp par order", WINE),
        (small, URL.replace("https://", ""), (43, 43, 43, 255)),
    ]
    text_y = qy + qr_side + 48
    for face, text, color in lines:
        box = draw.textbbox((0, 0), text, font=face)
        text_w = box[2] - box[0]
        draw.text((right_x + (right_w - text_w) // 2, text_y), text, font=face, fill=color)
        text_y += (box[3] - box[1]) + 16

    card_path = OUT / "vishwear-visiting-card.png"
    card.convert("RGB").save(card_path, quality=95)
    print(qr_path)
    print(card_path)


if __name__ == "__main__":
    main()
