# Copyright (c) [2026] [Mohammad Sheraj]
# [Discover] is licensed under India PubL v1.
# You can use this software according to the terms and conditions of the India PubL v1.
# You may obtain a copy of India PubL v1 at:
#          https://github.com/abirusabil123/discover/blob/main/IndiaPubL1
# THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
# EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
# MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
# See the India PubL v1 for more details.

#!/usr/bin/env python3
import os

def add_header():
    # Source file extensions with their comment formats
    comment_formats = {
        '.html': '<!-- {} -->',
        '.js': '/* {} */',
        '.css': '/* {} */',
        '.py': '# {}',
        '.java': '/* {} */',
        '.cpp': '/* {} */',
        '.c': '/* {} */',
        '.h': '/* {} */',
        '.hpp': '/* {} */',
        '.kt': '/* {} */',
        '.kts': '/* {} */',
        '.properties': '# {}',
        '.sql': '-- {}',
        '.toml': '# {}',
        '.yml': '# {}',
        '.yaml': '# {}',
        '.pro': '# {}',
        '.sh': '# {}',
        '.bash': '# {}',
        '.zsh': '# {}',
        '.rs': '// {}',
        '.go': '/* {} */',
        '.rb': '# {}',
        '.php': '/* {} */',
        '.swift': '// {}',
        '.scala': '/* {} */',
    }
    
    # Skip these non-source file extensions
    skip_extensions = {'.ico', '.png', '.webp', '.jar', '.jpg', '.jpeg', '.gif', 
                      '.svg', '.pdf', '.zip', '.tar', '.gz', '.exe', '.dll', 
                      '.so', '.dylib', '.class', '.o', '.a', '.idx', '.pack', 
                      '.rev', '.sample', '.name', '.md', '.xml', '.sh', '.properties'}
    
    # License text
    license_text_1 = """Copyright (c) [2026] [Mohammad Sheraj]"""
    license_text_2 = """[Discover] is licensed under India PubL v1."""
    license_text_3 = """You can use this software according to the terms and conditions of the India PubL v1."""
    license_text_4 = """You may obtain a copy of India PubL v1 at:"""
    license_text_5 = """         https://github.com/abirusabil123/discover/blob/main/IndiaPubL1"""
    license_text_6 = """THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,"""
    license_text_7 = """EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,"""
    license_text_8 = """MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE."""
    license_text_9 = """See the India PubL v1 for more details."""
    
    for root, dirs, files in os.walk('.'):
        for f in files:
            # Skip if extension should be skipped
            skip = False
            for skip_ext in skip_extensions:
                if f.endswith(skip_ext):
                    skip = True
                    break
            if skip:
                continue
                
            for ext, format in comment_formats.items():
                if f.endswith(ext):
                    path = os.path.join(root, f)
                    header = format.format(license_text_1)
                    if ext == '.kt' or ext == '.kts':
                        header += format.format(license_text_2)
                        header += format.format(license_text_3)
                        header += format.format(license_text_4)
                        header += format.format(license_text_5)
                        header += format.format(license_text_6)
                        header += format.format(license_text_7)
                        header += format.format(license_text_8)
                        header += format.format(license_text_9)
                        header += "\n"
                    else:
                        header += "\n"
                        header += format.format(license_text_2)
                        header += "\n"
                        header += format.format(license_text_3)
                        header += "\n"
                        header += format.format(license_text_4)
                        header += "\n"
                        header += format.format(license_text_5)
                        header += "\n"
                        header += format.format(license_text_6)
                        header += "\n"
                        header += format.format(license_text_7)
                        header += "\n"
                        header += format.format(license_text_8)
                        header += "\n"
                        header += format.format(license_text_9)
                        header += "\n"
                    header += "\n"
                    
                    try:
                        with open(path, 'r+', encoding='utf-8') as file:
                            content = file.read()
                            # # Split content into lines
                            # lines = content.splitlines(keepends=True)
                            # # Remove the first line if there are lines
                            # if lines:
                            #     content = ''.join(lines[1:])
                            
                            if content.startswith(header.strip()):
                                print(f"✓ Already has header: {path}")
                                continue
                            file.seek(0)
                            file.write(header + content)
                        print(f"✓ Added to: {path}")
                    except UnicodeDecodeError:
                        print(f"✗ Skipped binary file: {path}")
                    except Exception as e:
                        print(f"✗ {path}: {e}")
                    break

if __name__ == "__main__":
    add_header()