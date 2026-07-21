from pathlib import Path 
from PIL import Image

CHOSEN_SIZE = 200
ROOT = "./albums"

EPS = ["classical_work","weird_signal","rome_will_burn"]

cover_imgs =list(Path(ROOT).glob("./*/cover_orig.jpg"))

for img_path in cover_imgs:
    img = Image.open(img_path)

    #img.save(img_path.parent / (img_path.stem+"_orig"+img_path.suffix))
    
    print(str(img_path.parent).split("\\")[-1])

    if str(img_path.parent).split("\\")[-1] not in EPS:

        img_ratio = img.size[1]/img.size[0]
        img = img.resize((CHOSEN_SIZE, int(round(CHOSEN_SIZE*img_ratio,0))))

        img.save(img_path.parent / ("cover"+img_path.suffix))

    else:
        print("not doing anything for ",img_path.parent)