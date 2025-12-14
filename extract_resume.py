import PyPDF2
import sys

# Extract text from PDF
try:
    with open('partha resume.pdf', 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        full_text = ""
        
        print(f"Total pages: {len(reader.pages)}\n")
        print("="*80)
        
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            full_text += text + "\n\n"
            print(f"\n--- PAGE {i+1} ---\n")
            print(text)
            print("\n" + "="*80)
        
        # Save to file
        with open('resume_extracted.txt', 'w', encoding='utf-8') as output:
            output.write(full_text)
        
        print("\nText saved to resume_extracted.txt")
        
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
