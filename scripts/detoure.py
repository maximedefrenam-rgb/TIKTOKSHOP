"""Détourage d'un packshot sans fond transparent (l'original est conservé).
   pip install "rembg[cpu]"
   python3 scripts/detoure.py produits/<nom>/photo.jpg  → produits/<nom>/photo-detoure.png
"""
import sys
from pathlib import Path
from rembg import remove

src = Path(sys.argv[1])
out = src.with_name(src.stem + "-detoure.png")
out.write_bytes(remove(src.read_bytes()))
print("->", out)
