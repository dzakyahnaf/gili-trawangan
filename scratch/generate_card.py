import os
import sys
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageFilter

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
    # Canvas Size: 1200x840 (matches the aspect ratio of the mockup)
    canvas_w = 1200
    canvas_h = 840
    
    # Create solid yellow base canvas
    canvas = Image.new("RGBA", (canvas_w, canvas_h), yellow_color)
    
    # 1. Main Background Photo with Rounded Corners
    main_margin = 30
    main_size = (canvas_w - 2 * main_margin, canvas_h - 2 * main_margin)
    
    bg = Image.open(bg_image_path).convert("RGBA")
    
    # Resize bg to fill the main_size (center crop)
    bg = ImageOps.fit(bg, main_size, Image.Resampling.LANCZOS)
    
    # Create rounded mask for main background
    bg_mask = create_rounded_mask(main_size, 35)
    
    # Paste background onto the canvas
    canvas.paste(bg, (main_margin, main_margin), bg_mask)
    
    # Create draw instance on the canvas
    draw = ImageDraw.Draw(canvas)
    
    # 2. Add Insets (Bottom) - Moved up to prevent badge overlap & made closer overlapping
    # Define sizes and positions
    inset_y = 390
    inset_h = 240
    inset_w = 260
    
    # Left Inset (Squeezed in to touch and overlap the middle card)
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
    
    # Right Inset (Squeezed in to touch and overlap the middle card)
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
    # Using Segoe Print or Ink Free from Windows Fonts
    font_script_path = "C:\\Windows\\Fonts\\segoeprb.ttf" # Segoe Print Bold (Handwritten style)
    if not os.path.exists(font_script_path):
        font_script_path = "C:\\Windows\\Fonts\\Inkfree.ttf" # Fallback
    if not os.path.exists(font_script_path):
        font_script_path = "C:\\Windows\\Fonts\\arialbd.ttf" # Final fallback
        
    font_sans_path = "C:\\Windows\\Fonts\\segoeuib.ttf" # Segoe UI Bold
    
    font_script = ImageFont.truetype(font_script_path, 80)
    font_duration = ImageFont.truetype(font_sans_path, 60)
    
    # Text positions
    text_x = 100
    text_y = 80
    
    # Draw dropshadow for title
    draw.text((text_x + 3, text_y + 3), title_text, font=font_script, fill=(0, 0, 0, 100))
    # Draw title
    draw.text((text_x, text_y), title_text, font=font_script, fill=yellow_color)
    
    # Draw duration text (italic/bold block)
    duration_y = text_y + 110
    draw.text((text_x + 3, duration_y + 3), duration_text, font=font_duration, fill=(0, 0, 0, 100))
    draw.text((text_x, duration_y), duration_text, font=font_duration, fill="#FFFFFF")
    
    # 4. Add Suitcase Logo and "Trip Ke Lombok" (Top-Right)
    # Draw a elegant white suitcase icon
    logo_x = 920
    logo_y = 80
    
    # Icon coordinates
    icon_w = 40
    icon_h = 35
    icon_rect = [(logo_x, logo_y + 10), (logo_x + icon_w, logo_y + 10 + icon_h)]
    
    # Draw rounded suitcase body
    draw.rounded_rectangle(icon_rect, radius=6, outline="#FFFFFF", width=4)
    # Draw handle
    draw.arc([(logo_x + 10, logo_y + 3), (logo_x + 30, logo_y + 13)], 180, 360, fill="#FFFFFF", width=4)
    # Draw inner lines/wheels representing suitcase
    draw.line([(logo_x + 12, logo_y + 20), (logo_x + 12, logo_y + 35)], fill="#FFFFFF", width=3)
    draw.line([(logo_x + 28, logo_y + 20), (logo_x + 28, logo_y + 35)], fill="#FFFFFF", width=3)
    
    # Draw suitcase pin / palm tree representation
    draw.ellipse([(logo_x + 17, logo_y + 22), (logo_x + 23, logo_y + 28)], fill="#FFFFFF")
    
    # Draw "Trip Ke Lombok" brand text
    font_brand = ImageFont.truetype(font_sans_path, 20)
    draw.text((logo_x - 30, logo_y + 10 + icon_h + 8), "Trip Ke Lombok", font=font_brand, fill="#FFFFFF")
    
    # Save the beautiful card
    canvas = canvas.convert("RGB")
    canvas.save(output_path, "PNG")
    print(f"Beautiful card generated successfully at: {output_path}")

if __name__ == "__main__":
    generate_package_card(
        output_path="c:\\Users\\Dzaky Ahnaf\\kerja\\joki-project\\gili-trawangan\\public\\images\\generate\\trip-lombok-3h2m.png",
        bg_image_path="c:\\Users\\Dzaky Ahnaf\\kerja\\joki-project\\gili-trawangan\\public\\images\\lombok1.jpg",
        left_image_path="c:\\Users\\Dzaky Ahnaf\\kerja\\joki-project\\gili-trawangan\\public\\images\\snorkeling2.jpg",
        mid_image_path="c:\\Users\\Dzaky Ahnaf\\kerja\\joki-project\\gili-trawangan\\public\\images\\lombok2.jpg",
        right_image_path="c:\\Users\\Dzaky Ahnaf\\kerja\\joki-project\\gili-trawangan\\public\\images\\lombok3.jpg",
        title_text="Trip Lombok",
        duration_text="3H 2M"
    )
