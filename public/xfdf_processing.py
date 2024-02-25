# xfdf_processor.py

import xml.etree.ElementTree as ET

def process_xfdf(xfdf_data):
    """
    Process XFDF data and extract relevant information.

    Args:
        xfdf_data (str): The XFDF data received from the form submission.

    Returns:
        dict: A dictionary containing extracted form field data.
    """
    try:
        root = ET.fromstring(xfdf_data)
        form_fields = {}
        for field in root.findall(".//field"):
            field_name = field.get("name")
            field_value = field.find(".//value").text
            form_fields[field_name] = field_value
        return form_fields
    except ET.ParseError:
        print("Error parsing XFDF data.")
        return {}

if _name_ == "_main_":
    # Example XFDF data (replace with actual data received from the form submission)
    sample_xfdf = """
    <?xml version="1.0" encoding="UTF-8"?>
    <xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve">
        <fields>
            <field name="name">John Doe</field>
            <field name="email">john@example.com</field>
            <!-- Add more form fields here -->
        </fields>
    </xfdf>
    """

    extracted_data = process_xfdf(sample_xfdf)
    print("Extracted form field data:")
    for field_name, field_value in extracted_data.items():
        print(f"{field_name}: {field_value}")