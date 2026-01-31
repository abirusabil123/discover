# Copyright (c) 2025 Mohammad Sheraj
# Discover is licensed under India PSL v1. You can use this software according to the terms and conditions of the India PSL v1. You may obtain a copy of India PSL v1 at: https://github.com/abirusabil123/discover/blob/main/IndiaPSL1 THIS SOFTWARE IS PROVIDED ON AN “AS IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the India PSL v1 for more details.

#!/usr/bin/env python3
import os

def add_header():
    # Source file extensions with their comment formats
    comment_formats = {
        '.html': '<!-- {} -->\n',
        '.js': '/* {} */\n',
        '.css': '/* {} */\n',
        '.py': '# {}\n',
        '.java': '/* {} */\n',
        '.cpp': '/* {} */\n',
        '.c': '/* {} */\n',
        '.h': '/* {} */\n',
        '.hpp': '/* {} */\n',
        '.kt': '/* {} */\n',
        '.kts': '/* {} */\n',
        '.properties': '# {}\n',
        '.sql': '-- {}\n',
        '.toml': '# {}\n',
        '.yml': '# {}\n',
        '.yaml': '# {}\n',
        '.pro': '# {}\n',
        '.sh': '# {}\n',
        '.bash': '# {}\n',
        '.zsh': '# {}\n',
        '.rs': '// {}\n',
        '.go': '/* {} */\n',
        '.rb': '# {}\n',
        '.php': '/* {} */\n',
        '.swift': '// {}\n',
        '.scala': '/* {} */\n',
    }
    
    # Skip these non-source file extensions
    skip_extensions = {'.ico', '.png', '.webp', '.jar', '.jpg', '.jpeg', '.gif', 
                      '.svg', '.pdf', '.zip', '.tar', '.gz', '.exe', '.dll', 
                      '.so', '.dylib', '.class', '.o', '.a', '.idx', '.pack', 
                      '.rev', '.sample', '.name', '.md', '.xml'}
    
    # License text
    license_text_1 = """Copyright (c) 2025 Mohammad Sheraj"""
    license_text_2 = """Discover is licensed under India PSL v1. You can use this software according to the terms and conditions of the India PSL v1. You may obtain a copy of India PSL v1 at: https://github.com/abirusabil123/discover/blob/main/IndiaPSL1 THIS SOFTWARE IS PROVIDED ON AN “AS IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the India PSL v1 for more details."""
    
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
                    header += format.format(license_text_2)
                    
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