import fitz  # PyMuPDF
from pathlib import Path
import os

# Input and output directories
cert_dir = Path("certificates")
output_dir = cert_dir / "images"
output_dir.mkdir(exist_ok=True)

# Certificate PDFs to convert
pdf_files = [
    "Azure Fundamentals parthasarathy.pdf",
    "Coursera TJ3MQKG6CQDX.pdf",
    "Artificial Intelligence for Economics.pdf",
    "Introduction To Industry 4 (1) (1).0 And Industrial Internet Of Things.pdf",
    "The Joy of Computing using Python (1).pdf",
    "Parthasarathy G(Cisco Data Analytics Essential).pdf",
    "python_basic certificate.pdf",
    "sql_basic certificate.pdf"
]

print("Converting PDF certificates to PNG images...\n")

for pdf_file in pdf_files:
    pdf_path = cert_dir / pdf_file
    
    if not pdf_path.exists():
        print(f"❌ File not found: {pdf_file}")
        continue
    
    try:
        # Open PDF
        doc = fitz.open(pdf_path)
        
        # Get first page
        page = doc[0]
        
        # Render page to pixmap (image) at 2x resolution for quality
        mat = fitz.Matrix(2, 2)  # 2x zoom for better quality
        pix = page.get_pixmap(matrix=mat)
        
        # Create output filename
        output_name = pdf_file.replace('.pdf', '.png')
        output_path = output_dir / output_name
        
        # Save as PNG
        pix.save(output_path)
        
        print(f"✅ Converted: {pdf_file} → {output_name}")
        
        doc.close()
        
    except Exception as e:
        print(f"❌ Error converting {pdf_file}: {str(e)}")

# Also copy the oracle JPEG to the images folder
oracle_jpeg = cert_dir / "oracle partha.jpeg"
if oracle_jpeg.exists():
    import shutil
    shutil.copy(oracle_jpeg, output_dir / "oracle partha.jpeg")
    print(f"\n✅ Copied: oracle partha.jpeg")

print("\n✨ Conversion complete! Images saved in 'certificates/images/' folder.")
