

import subprocess
import glob
from pathlib import Path

IMG_EXT = [".webp",".png",".jpg"]
TRASH_FOLDER = Path("img/to_delete/")

tracked_files = subprocess.run(["git","ls-tree","-r","dev","--name-only"],stdout=subprocess.PIPE,encoding='utf-8',).stdout.split("\n")
tracked_imgs = list(filter(lambda x:Path(x).suffix.replace('"','') in IMG_EXT,tracked_files))

files_in_img_folder = glob.glob("img/crops/*.*")

imgs = list(filter(lambda x:Path(x).suffix in IMG_EXT,files_in_img_folder))
imgs = list(map(lambda x:x.replace("\\","/"),imgs))

not_imgs = set(files_in_img_folder) - set(imgs)

#print(len(tracked_imgs),len(imgs))

img_to_delete = set(imgs)-set(tracked_imgs)

#print("TRACKED FILES")
#for img in sorted(tracked_files):
#    print("\t",img)

#print("TRACKED IMGS")
#for img in sorted(tracked_imgs):
#    print("\t",img)

#print("IMGS")
#for img in sorted(imgs):
#    print("\t",img)

print("IMG TO DELETE:",img_to_delete)

TRASH_FOLDER.mkdir(exist_ok=True)

for img in img_to_delete:

    img = Path(img)

    img.rename(TRASH_FOLDER / img.name)

#print(imgs)
