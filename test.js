
function testConvertWikiToMarkdown(){

    var markdown = convertWikiToMarkdown(`

====== External URL
[http://www.geeek.org]
[nom|http://www.geeek.org]
[nom|http://www.geeek.org|langue]
[nom|http://www.geeek.org|langue|titre]

====== Internal URL
[/test-article.html]
[nom|/test-article.html]
[nom|/test-article.html|langue]
[nom|/test-article.html|langue|titre]

====== Images
((url|texte alternatif))
((url|texte alternatif|position))
((url|texte alternatif|position|description longue))

====== Images with URL
[((https://www.geeek.org/test.jpg|texte alternatif))|https://www.geeek.org/]

====== Titles
! Test 1
!! Test 1
!!! Test 2
!!!! Test 2
!!!!! Test 3

====== Ordered list 
# Test 1 
# Test 2 
# Test 3

====== Bold
Ceci est __en gras__ vraiment __en gras__ .
Ceci est__ en gras__ vraiment__ en gras__ .
Ceci est __en gras __vraiment __en gras __.

====== Blank line
%%%
 %%%

====== HTML bloc
///html
Ceci est du HTML
///

====== Citation
{{Ceci est un test}}
{{Ceci est un test}}

====== Line
----

====== Tags
[nom|tag:test]

====== Search Tags
[Litecoin|/?q=litecoin]

====== Yash code

///yash bash
# docker run -d -t -i \
-e PATH='/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin' \
-e NODE_VERSION='6.14.4' \
-e YARN_VERSION='1.6.0' \
-e FLOWS='flows.json' \
-e NODE_PATH='/usr/src/node-red/node_modules:/data/node_modules' \
-p 1880:1880 \
-v /volume1/docker/data:/data \
--device=/dev/ttyUSB0 \
--privileged \
--restart=always \
--name domogeek \
nodered/node-red-docker:latest
///
`);

    console.log(markdown);
}