# Dotclear2Ghost

My migration script to adapt (Dotclear Wiki posts)[https://fr.dotclear.org/documentation/2.0/usage/syntaxes] into Ghost Markdown posts.
This script generates a JSON file that can be imported directly on the Ghost admin portal.

__Some behaviours for the script :__
- All the Dotclear categories are transformed into Ghost tags
- The fisrt image in the excerpt is transformed into a feature image in Ghost.
- Only published article in Wiki format are migrated !
- The excerpt is concat with the content to feed the Ghost post content.
- HTML snippet with ///html is also supported.
- Yash content is also migrated.

__The things to do manually :__
- Move all your Dotclear Public content into the Ghost image directory : /content/images/
- The main user has to be created manualy with the id = 1 to allow the import.
- The config.js file can be adapt to add transformation rules and / or URL rewriting rules.
