
const migrate = require('./migrate')

var markdown = migrate.convertWikiToMarkdown(`

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

Ce blogroll est constitué de tous__ les blogs High-Tech__ que je consulte quotidiennement sur Feedly au travers des flux RSS qu'ils exposent.
N'hésitez pas à aller visiter leurs blog et souscrire à leurs flux RSS de qualité !

* [Spawnrider|https://www.spawnrider.net/]
* [Missgeekette|http://www.missgeekette.net/]
* [BlogduWebdesign|http://www.blogduwebdesign.com/|||true]
* [Geeks and Com|http://www.geeksandcom.com/|||true]
* [Services Mobiles|http://www.servicesmobiles.fr/|||true]
* [Captain Web|http://www.captainweb.net/|||true]
* [Tapahont|http://www.tapahont.info/|||true]
* [JCFrogBlogII|http://jcfrog.com/blog/|||true]
* [Korben|http://korben.info/|||true]
* [Gizmodo|http://www.gizmodo.fr/|||true]
* [Univers Freebox|http://www.universfreebox.com/|||true]
* [Iphon.fr|http://www.iphon.fr/|||true]
* [Daily Geek Show|http://dailygeekshow.com/|||true]
* [AbriCoCotier.fr|http://www.abricocotier.fr/|||true]
* [Descary.com|http://descary.com/|||true]
* [Framablog|http://www.framablog.org|||true]
* [2803|http://www.vingthuitzerotrois.fr/|||true]
* [Le Journal du Geek|http://www.journaldugeek.com/|||true]
* [Fredzone|http://www.fredzone.org/|||true]
* [Ubergizmo|http://fr.ubergizmo.com/|||true]
* [FrAndroid|http://www.frandroid.com/|||true]
* [Blog Marketing Web 2.0 et Techno|http://www.vincentabry.com/|||true]
* [pix-geeks.com|http://pix-geeks.com/|||true]
* [Alsacréations|http://www.alsacreations.com/|||true]
* [Le blog du modérateur|http://www.blogdumoderateur.com/|||true]
* [Blog de Geek|http://bloguedegeek.net/|||true]
* [w3sh|http://www.w3sh.com/|||true]
* [Le blog des nouvelles technologies|http://www.blog-nouvelles-technologies.fr/|||true]
* [iPhoneAddict.fr|http://iphoneaddict.fr/|||true]
* [Fubiz|http://www.fubiz.net/|||true]
* [eMxPi's Blog|http://emxpi.fr/|||true]
* [Le blog d'Abondance|http://www.abondance.com/|||true]
* [Geeks Are Sexy|http://www.geeksaresexy.net/|||true]
* [Presse-citron|http://www.presse-citron.net/|||true]
* [FrenchWeb.fr|http://frenchweb.fr/|||true]
* [FredCavazza.net|http://www.fredcavazza.net/|||true]
* [Standblog|http://standblog.org/blog/|||true]
* [Be Geek|http://www.begeek.fr/|||true]
* [WebLife|http://www.weblife.fr/|||true]
* [Capitaine Commerce|http://www.capitaine-commerce.com/|||true]
* [Keeg|http://www.keeg.fr/|||true]
* [Ballajack|http://www.ballajack.com/|||true]
* [Gonzague Dambricourt|http://gonzague.me/|||true]
`);

console.log(markdown);