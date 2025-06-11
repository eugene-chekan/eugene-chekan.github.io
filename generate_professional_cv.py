"""Generate a professional PDF CV from content.json using WeasyPrint."""

import json
from pathlib import Path

from jinja2 import Template
from weasyprint import HTML


def generate_cv() -> Path:
    """Generate a professional PDF CV from content.json using WeasyPrint."""
    try:
        # Load content
        content_path = Path("static/content.json")
        print(f"Loading content from: {content_path}")

        with content_path.open("r", encoding="utf-8") as f:
            content = json.load(f)

        print("✅ Content loaded successfully")

        # Load template
        template_path = Path("templates/cv-professional.html")
        print(f"Loading template from: {template_path}")

        template_content = template_path.read_text(encoding="utf-8")
        print("✅ Template loaded successfully")

        # Render HTML
        template = Template(template_content)
        print("🔄 Rendering template...")

        html_content = template.render(content=content)
        print("✅ Template rendered successfully")

        # Generate PDF
        output_pdf = Path("static/eugene_chekan_software_engineer_in_test_cv.pdf")
        output_pdf.parent.mkdir(exist_ok=True)

        print("🔄 Generating PDF...")
        HTML(string=html_content).write_pdf(output_pdf)

        print(f"✅ Professional CV generated: {output_pdf}")

        # Save HTML for preview
        preview_html = Path("cv_preview.html")
        preview_html.write_text(html_content, encoding="utf-8")
        print(f"📄 HTML preview saved: {preview_html}")

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
    else:
        return output_pdf

if __name__ == "__main__":
    generate_cv()
