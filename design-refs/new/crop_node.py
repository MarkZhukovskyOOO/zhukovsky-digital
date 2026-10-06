#!/usr/bin/env python3
"""Вырезает узел из отрендеренного PNG фрейма по имени/ID узла из JSON макета.

Использование:
  python3 crop_node.py <frame-name> <node-name-or-id> <out.png> [pad]

  frame-name  — имя без расширения, напр. landing-1440 (ищет frames/<name>.json и <name>.png)
  node-name   — имя узла (первое совпадение, обход в глубину) или id вида 1:2345
  pad         — отступ в px вокруг узла (по умолчанию 0)

Список узлов фрейма: python3 crop_node.py <frame-name> --list [глубина]
"""
import json, sys, os
from PIL import Image
Image.MAX_IMAGE_PIXELS = None

os.chdir(os.path.dirname(os.path.abspath(__file__)))
frame = sys.argv[1]
f = json.load(open(f'frames/{frame}.json'))
fb = f['absoluteBoundingBox']

if sys.argv[2] == '--list':
    maxd = int(sys.argv[3]) if len(sys.argv) > 3 else 3
    def walk(n, d=0):
        if d <= maxd:
            bb = n.get('absoluteBoundingBox') or {}
            print('  '*d, n.get('id'), '|', n.get('type'), '|', n.get('name'),
                  '|', round(bb.get('x',0)-fb['x']), round(bb.get('y',0)-fb['y']),
                  round(bb.get('width',0)), 'x', round(bb.get('height',0)))
        for c in n.get('children', []): walk(c, d+1)
    walk(f)
    sys.exit(0)

target = sys.argv[2]; out = sys.argv[3]; pad = int(sys.argv[4]) if len(sys.argv) > 4 else 0
found = None
def walk(n):
    global found
    if found: return
    if n.get('name') == target or n.get('id') == target:
        found = n; return
    for c in n.get('children', []): walk(c)
walk(f)
if not found:
    sys.exit(f'узел не найден: {target}')
bb = found['absoluteBoundingBox']
x, y = bb['x']-fb['x'], bb['y']-fb['y']
im = Image.open(f'{frame}.png')
box = (max(0, int(x-pad)), max(0, int(y-pad)),
       min(im.size[0], int(x+bb['width']+pad)), min(im.size[1], int(y+bb['height']+pad)))
im.crop(box).save(out)
print('OK', out, f'{box[2]-box[0]}x{box[3]-box[1]}')
