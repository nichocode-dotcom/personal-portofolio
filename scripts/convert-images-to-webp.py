from pathlib import Path
import argparse

from PIL import Image


PROJECT_ROOT = Path(__file__).resolve().parent.parent
IMAGE_FILES = (
    "src/assets/images/profile1.jpg",
    "src/assets/images/podomoro.png",
    "src/assets/images/alur.jpg",
    "src/assets/speaker/Speaker_YIT.jpg",
    "src/assets/licenses/Kaggle-Pandas-Sertifikat.png",
    "src/assets/images/zenmood.png",
    "src/assets/speaker/Speaker_DII.png",
    "src/assets/images/bpc.jpg",
    "src/assets/speaker/Moderator.jpeg",
    "src/assets/speaker/Speaker_IYEBA.jpeg",
    "src/assets/images/growpath.jpg",
    "src/assets/images/ambassador.jpg",
    "src/assets/images/hero_real.png",
    "src/assets/images/hero_stylized.png",
    "src/assets/speaker/Speaker_Komunitas Remaja Aktif.jpeg",
    "src/assets/licenses/data_visualization.png",
)


def main():
    parser = argparse.ArgumentParser(
        description="Convert the portfolio's selected large images to WebP."
    )
    parser.add_argument(
        "--quality", type=int, default=82, choices=range(1, 101),
        metavar="1-100", help="Lossy WebP quality for non-PNG images (default: 82)."
    )
    args = parser.parse_args()

    converted = 0
    for relative_path in IMAGE_FILES:
        source = PROJECT_ROOT / relative_path
        target = source.with_suffix(".webp")
        if target.exists():
            print(f"SKIP exists: {target.relative_to(PROJECT_ROOT)}")
            continue
        if not source.exists():
            print(f"SKIP missing: {relative_path}")
            continue

        with Image.open(source) as image:
            if image.mode in ("RGBA", "LA") or "transparency" in image.info:
                image = image.convert("RGBA")
            else:
                image = image.convert("RGB")

            options = {"format": "WEBP", "method": 6}
            if source.suffix.lower() == ".png":
                options["lossless"] = True
            else:
                options["quality"] = args.quality
            image.save(target, **options)

        source_size = source.stat().st_size
        target_size = target.stat().st_size
        change = (1 - target_size / source_size) * 100
        print(
            f"{relative_path} -> {target.relative_to(PROJECT_ROOT)}: "
            f"{source_size / 1024:.1f} KB -> {target_size / 1024:.1f} KB "
            f"({change:+.1f}%)"
        )
        converted += 1

    print(f"\nSelesai: {converted} gambar dikonversi. Skrip tidak menghapus file sumber.")


if __name__ == "__main__":
    main()
