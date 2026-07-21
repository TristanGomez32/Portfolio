

import subprocess
import glob
from pathlib import Path

import re 

IMG_EXT = [".webp",".png",".jpg"]
CODE_EXT = [".css",".js",".html"]
TRASH_FOLDER = Path("img/to_delete/")

REGEX_PATTERN = r'[^\s"\'<>]+\.(?:jpg|jpeg|png|gif|bmp|webp|svg|tiff?|ico)(?=\s|["\'>]|$)'

tracked_files = subprocess.run(["git","ls-tree","-r","dev","--name-only"],stdout=subprocess.PIPE,encoding='utf-8',).stdout.split("\n")
tracked_imgs = list(filter(lambda x:Path(x).suffix.replace('"','') in IMG_EXT,tracked_files))
tracked_imgs = list(filter(lambda x:Path(x).exists(),tracked_imgs))

tracked_img_names = set(map(lambda x:Path(x).name,tracked_imgs))

used_img_paths = set()
code_files = Path(".").glob("*.*")
for file in code_files:
    if file.suffix in CODE_EXT:
        with open(file,"r",encoding="utf-8") as f:
            string = f.read()

        result = re.findall(REGEX_PATTERN, string, re.IGNORECASE)    
        used_img_paths.update(set(result))

used_img_names = set(map(lambda x:Path(x).name,used_img_paths))

tracked_but_not_used = tracked_img_names-used_img_names

for img in sorted(tracked_but_not_used):
    print(img)

exit(0)

