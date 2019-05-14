/**
 * Main configuration variables for the migration script.
 * 
 * @author : ludovic@toinel.com
 */

 var config = {

    // DB Configuration
    database: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'xxxx',
        database: 'dotclear'
    },

    urlRewriteRules: [
            // Replace resized images URL by the orginal image URL
            [/https:\/\/static.geeek.org\/public\/([^\.]*)\/\.([a-z0-9\-_. ]*)_[smtq]{1,2}\.([a-z]{3,4})/gim, 
            function(match, p1,p2,p3){ return '/content/images/'+p1+"/"+p2+"."+p3 }],

            // Replace resized images URL by the orginal image URL
            [/https:\/\/static.geeek.org\/public\/([^.]*)\/([a-z0-9\-_. ]*)\.([a-z]{3,4})/gim, 
            function(match, p1,p2,p3){ return '/content/images/'+p1+"/"+p2+"."+p3 }]
    ],
    
    wikiToMdRewriteRules : 
    [
        // Ordered list
        [/^#(.*)$/gim, '1.$1'],

        // Titles
        [/^!!!!!(.*)$/gim, "#$1"],
        [/^!!!!(.*)$/gim, "##$1"],
        [/^!!!(.*)$/gim, "###$1"],
        [/^!!(.*)$/gim, "####$1"],
        [/^!(.*)$/gim, "#####$1"],

        // New line
        [/%%%/gim, ""],

        // Citations
        [/\{\{(.*)\}\}/gim, "> $1"],

        // Bold with bad bank chars
        [/(__)([^\s][^__]*[^\s])(__)/gim, "**$2**"],
        [/(__ )([^\s][^__]*[^\s])(__)/gim, " **$2**"],
        [/(__)([^\s][^__]*[^\s])( __)/gim, "**$2** "],
        [/(\*\*)([^\s][^\*\*]*[^\s])(\*\*)/gim, "__$2__"],

        // Tags
        [/\[([^|\]]*)\|tag:([^|\]]*)\]/gim, "$1"],
        [/\[([^|\]]*)\|\/\?q=([^|\]]*)\]/gim, "$1"],

        // Images
        [/\(\(([^|\)]*)\)\)/gim, "![image]($1)"],
        [/\(\(([^|\)]*)\|([^|\)]*)\|([^|\)]*)?\|([^|\)]*)\)\)/gim, "![$2]($1 \"$4\")"],
        [/\(\(([^|\)]*)\|([^|\)]*)\|([^|\)]*)\)\)/gim, "![$2]($1)"],
        [/\(\(([^|\)]*)\|([^|\)]*)\)\)/gim, "![$2]($1)"],

        // External Links
        [/\[(http[^|\]]*)\]/gim, "<$1>"],
        [/\[([^|]*)\|(http[^|\]]*)\|([^|\]]*)?\|([^|\]]*)\]/gim, "[$1]($2)"],
        [/\[([^|]*)\|(http[^|\]]*)\|([^|\]]*)\]/gim, "[$1]($2)"],
        [/\[([^|]*)\|(http[^|\]]*)\]/gim, "[$1]($2)"],

        // Internal Links (we remove .html)
        [/\[(\/[^|\]]*)\]/gim, "<$1>"],
        [/\[([^|]*)\|(\/[^|\]]*)\|([^|\]]*)\|([^|\]]*)\]/gim, "[$1]($2)"],
        [/\[([^|]*)\|(\/[^|\]]*)\|([^|\]]*)\]/gim, "[$1]($2)"],
        [/\[([^|]*)\|(\/[^|\]]*)\]/gim, "[$1]($2)"],
    ],

    // Ghost version
    version : "2.14.0",
 }

 module.exports = config