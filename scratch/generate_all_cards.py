import os
import sys
from PIL import Image, ImageDraw, ImageFont, ImageOps

def create_rounded_mask(size, radius):
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), size], radius, fill=255)
    return mask

def generate_package_card(
    output_path,
    bg_image_path,
    left_image_path,
    mid_image_path,
    right_image_path,
    title_text,
    duration_text,
    yellow_color="#F4D45E"
):
    # Canvas Size: 1200x840
    canvas_w = 1200
    canvas_h = 840
    
    # Create solid yellow base canvas
    canvas = Image.new("RGBA", (canvas_w, canvas_h), yellow_color)
    
    # 1. Main Background Photo with Rounded Corners
    main_margin = 30
    main_size = (canvas_w - 2 * main_margin, canvas_h - 2 * main_margin)
    
    bg = Image.open(bg_image_path).convert("RGBA")
    bg = ImageOps.fit(bg, main_size, Image.Resampling.LANCZOS)
    bg_mask = create_rounded_mask(main_size, 35)
    canvas.paste(bg, (main_margin, main_margin), bg_mask)
    
    draw = ImageDraw.Draw(canvas)
    
    # 2. Add Insets (Bottom) - Raised to prevent badge overlap
    inset_y = 390
    inset_h = 240
    inset_w = 260
    
    # Left Inset
    left_x = 220
    left_img = Image.open(left_image_path).convert("RGBA")
    left_img = ImageOps.fit(left_img, (inset_w, inset_h), Image.Resampling.LANCZOS)
    left_mask = create_rounded_mask((inset_w, inset_h), 25)
    canvas.paste(left_img, (left_x, inset_y), left_mask)
    draw.rounded_rectangle(
        [(left_x, inset_y), (left_x + inset_w, inset_y + inset_h)],
        25,
        outline=yellow_color,
        width=8
    )
    
    # Right Inset
    right_x = 720
    right_img = Image.open(right_image_path).convert("RGBA")
    right_img = ImageOps.fit(right_img, (inset_w, inset_h), Image.Resampling.LANCZOS)
    right_mask = create_rounded_mask((inset_w, inset_h), 25)
    canvas.paste(right_img, (right_x, inset_y), right_mask)
    draw.rounded_rectangle(
        [(right_x, inset_y), (right_x + inset_w, inset_y + inset_h)],
        25,
        outline=yellow_color,
        width=8
    )
    
    # Middle Inset (Larger, Overlapping, Raised)
    mid_w = 340
    mid_h = 340
    mid_x = (canvas_w - mid_w) // 2
    mid_y = inset_y - (mid_h - inset_h) // 2 - 20
    
    mid_img = Image.open(mid_image_path).convert("RGBA")
    mid_img = ImageOps.fit(mid_img, (mid_w, mid_h), Image.Resampling.LANCZOS)
    mid_mask = create_rounded_mask((mid_w, mid_h), 35)
    canvas.paste(mid_img, (mid_x, mid_y), mid_mask)
    draw.rounded_rectangle(
        [(mid_x, mid_y), (mid_x + mid_w, mid_y + mid_h)],
        35,
        outline=yellow_color,
        width=8
    )
    
    # 3. Add Custom Script Typography (Top-Left)
    font_script_path = "C:\\Windows\\Fonts\\segoeprb.ttf"
    if not os.path.exists(font_script_path):
        font_script_path = "C:\\Windows\\Fonts\\Inkfree.ttf"
    if not os.path.exists(font_script_path):
        font_script_path = "C:\\Windows\\Fonts\\arialbd.ttf"
        
    font_sans_path = "C:\\Windows\\Fonts\\segoeuib.ttf"
    
    font_script = ImageFont.truetype(font_script_path, 80)
    font_duration = ImageFont.truetype(font_sans_path, 60)
    
    text_x = 100
    text_y = 80
    
    # Drop-shadow & Script Title
    draw.text((text_x + 3, text_y + 3), title_text, font=font_script, fill=(0, 0, 0, 100))
    draw.text((text_x, text_y), title_text, font=font_script, fill=yellow_color)
    
    # Drop-shadow & Duration Text
    duration_y = text_y + 110
    draw.text((text_x + 3, duration_y + 3), duration_text, font=font_duration, fill=(0, 0, 0, 100))
    draw.text((text_x, duration_y), duration_text, font=font_duration, fill="#FFFFFF")
    
    # 4. Add Suitcase Logo (Top-Right)
    logo_x = 920
    logo_y = 80
    icon_w = 40
    icon_h = 35
    icon_rect = [(logo_x, logo_y + 10), (logo_x + icon_w, logo_y + 10 + icon_h)]
    
    draw.rounded_rectangle(icon_rect, radius=6, outline="#FFFFFF", width=4)
    draw.arc([(logo_x + 10, logo_y + 3), (logo_x + 30, logo_y + 13)], 180, 360, fill="#FFFFFF", width=4)
    draw.line([(logo_x + 12, logo_y + 20), (logo_x + 12, logo_y + 35)], fill="#FFFFFF", width=3)
    draw.line([(logo_x + 28, logo_y + 20), (logo_x + 28, logo_y + 35)], fill="#FFFFFF", width=3)
    draw.ellipse([(logo_x + 17, logo_y + 22), (logo_x + 23, logo_y + 28)], fill="#FFFFFF")
    
    font_brand = ImageFont.truetype(font_sans_path, 20)
    draw.text((logo_x - 30, logo_y + 10 + icon_h + 8), "Trip Ke Lombok", font=font_brand, fill="#FFFFFF")
    
    # Convert and Save
    canvas = canvas.convert("RGB")
    canvas.save(output_path, "PNG")
    print(f"Generated card: {os.path.basename(output_path)}")

def main():
    base_dir = "c:\\Users\\Dzaky Ahnaf\\kerja\\joki-project\\gili-trawangan"
    img_dir = os.path.join(base_dir, "public", "images")
    gen_dir = os.path.join(img_dir, "generate")
    os.makedirs(gen_dir, exist_ok=True)
    
    # Define the 9 cards to generate
    cards = [
        {
            "filename": "open-trip-lombok.png",
            "bg": "lombok3.jpg",
            "left": "snorkeling2.jpg",
            "mid": "lombok1.jpg",
            "right": "snorkeling5.jpg",
            "title": "Open Trip",
            "duration": "3H 2M"
        },
        {
            "filename": "one-day-trip-lombok.png",
            "bg": "snorkeling3.jpg",
            "left": "lombok2.jpg",
            "mid": "lombok1.jpg",
            "right": "snorkeling1.jpg",
            "title": "One Day Trip",
            "duration": "1 Hari"
        },
        {
            "filename": "menginap-di-gili-trawangan.png",
            "bg": "snorkeling3.jpg",
            "left": "snorkeling1.jpg",
            "mid": "snorkeling5.jpg",
            "right": "snorkeling2.jpg",
            "title": "Gili Overnight",
            "duration": "3H 2M"
        },
        {
            "filename": "paket-honeymoon-lombok.png",
            "bg": "lombok3.jpg",
            "left": "snorkeling3.jpg",
            "mid": "lombok1.jpg",
            "right": "snorkeling2.jpg",
            "title": "Honeymoon",
            "duration": "3H 2M"
        },
        {
            "filename": "paket-tour-lombok-2-hari-1-malam.png",
            "bg": "air-terjun.jpg",
            "left": "lombok2.jpg",
            "mid": "lombok1.jpg",
            "right": "air-terjun2.jpg",
            "title": "Trip Lombok",
            "duration": "2H 1M"
        },
        {
            "filename": "trip-lombok-3-hari-2-malam.png",
            "bg": "lombok1.jpg",
            "left": "snorkeling2.jpg",
            "mid": "lombok2.jpg",
            "right": "lombok3.jpg",
            "title": "Trip Lombok",
            "duration": "3H 2M"
        },
        {
            "filename": "liburan-lombok-4-hari-3-malam.png",
            "bg": "lombok2.jpg",
            "left": "air-terjun.jpg",
            "mid": "snorkeling3.jpg",
            "right": "lombok1.jpg",
            "title": "Trip Lombok",
            "duration": "4H 3M"
        },
        {
            "filename": "wisata-lombok-5-hari-4-malam.png",
            "bg": "lombok1.jpg",
            "left": "air-terjun.jpg",
            "mid": "snorkeling1.jpg",
            "right": "lombok2.jpg",
            "title": "Trip Lombok",
            "duration": "5H 4M"
        },
        {
            "filename": "honeymoon-lombok-2-hari-1-malam.png",
            "bg": "lombok3.jpg",
            "left": "snorkeling2.jpg",
            "mid": "lombok1.jpg",
            "right": "snorkeling3.jpg",
            "title": "Honeymoon",
            "duration": "2H 1M"
        }
    ]
    
    for c in cards:
        output_path = os.path.join(gen_dir, c["filename"])
        bg_path = os.path.join(img_dir, c["bg"])
        left_path = os.path.join(img_dir, c["left"])
        mid_path = os.path.join(img_dir, c["mid"])
        right_path = os.path.join(img_dir, c["right"])
        
        generate_package_card(
            output_path=output_path,
            bg_image_path=bg_path,
            left_image_path=left_path,
            mid_image_path=mid_path,
            right_image_path=right_path,
            title_text=c["title"],
            duration_text=c["duration"]
        )

if __name__ == "__main__":
    main()
