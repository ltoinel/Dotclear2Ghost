/**
 * My Migration script to adapt Dotclear posts into Ghost format.
 * You can adapt this script regarding your needs.
 * All the configuration params are in the config.js file.
 * 
 * @author : ludovic@toinel.com
 */

var pool = require('./database')
const config = require('./config')
const fs = require('fs');

/**
 * Get the Dotclear posts.
 */
async function getPosts() {

    console.log("Get the Dotclear posts from Database !");

    // We retrieve all the published post in Wiki format.
    let sql = `SELECT 
    post_id , 
    cat_id,
    post_title,
    post_url, 
    post_excerpt,
    post_content,
    post_selected,
    (UNIX_TIMESTAMP(post_creadt)*1000) as published_at,
    (UNIX_TIMESTAMP(post_creadt)*1000) as created_at,
    (UNIX_TIMESTAMP(post_upddt)*1000) as updated_at
    FROM dc_post WHERE post_status=1 and post_format="wiki"`;

    // We get all the posts from database.
    var dotclearPosts = await pool.query(sql) ;

    // For each post we convert the data into Ghost format.
    var posts = [];
    for (var i = 0; i < dotclearPosts.length; i++) {
            posts.push(convertDotclearPostToGhostPost(dotclearPosts[i]));
    }
    return posts;
}

/**
 * Get the Dotclear tags.
 */
async function getTags() {

    console.log("Get the Dotclear tags !");

    // We retrieve all the categories.
    let sql = `SELECT * FROM dc_category`;

    var dotclearTags = await pool.query(sql) ;
    console.log("Result: " + dotclearTags.length);

    var tags = [];
    for (var i = 0; i < dotclearTags.length; i++) {
        let dotclearTag = dotclearTags[i];
        let tag = {
            id:           dotclearTag.cat_id,
            name:         dotclearTag.cat_title,
            description:  dotclearTag.cat_title,
            slug :        dotclearTag.cat_url
        }
        tags.push(tag);
    }
    return tags;
}

/**
 * Transform the Dotclear Posts
 * @param {Posts} dotclearPosts 
 */
function convertDotclearPostToGhostPost(dotclearPost){
    console.log("Converting Dotclear post to Ghost Format : " + dotclearPost.post_id);

    let post = {};

    let postTags= [];
    
    // Rewrite the URL from the exceprt and the content
    dotclearPost.post_excerpt = rewriteUrl(dotclearPost.post_excerpt);
    dotclearPost.post_content = rewriteUrl(dotclearPost.post_content);

    // Extract first image from the Excerpt and transform into feature_image in Ghost
    let firstImageRegex = /\(\(([^|\)]*)(.*)\)\)[\r\n]*/;
    let match = dotclearPost.post_excerpt.match(firstImageRegex);
    if (match !== null) {
        post.feature_image = match[1];
        dotclearPost.post_excerpt = dotclearPost.post_excerpt.replace(firstImageRegex, "");
        console.log("First image URL: " + match[1]);
    };

    // Transform the Dotclear Wiki content into Markdown
    let markdownContent = convertWikiToMarkdown(dotclearPost.post_excerpt+"\n"+dotclearPost.post_content);
    post.mobiledoc = getMobileDoc(markdownContent);

    // Push the article attributes
    post.id = dotclearPost.post_id;
    post.title = dotclearPost.post_title;
    post.slug = generateSlug(dotclearPost.post_url);
    post.featured = dotclearPost.post_selected;
    post.page = 0;
    post.status = "published";
    post.meta_title = null;
    post.meta_description = null;
    post.published_at = dotclearPost.published_at;
    post.created_at = dotclearPost.created_at;
    post.updated_at = dotclearPost.updated_at;
    post.published_by = 1;
    post.author_id = 1;
    post.created_by = 1;
    post.updated_by = 1;
    post.tag_id = dotclearPost.cat_id;
    
    return post;
}

/**
 * Get A mobile doc document with a Markdown Card.
 * @param {string} markdown 
 */
function getMobileDoc(markdownContent){
    let mobiledoc = {
        version: '0.3.1',
        markups: [],
        atoms: [],
        cards: [['markdown', {cardName: 'markdown', markdown: markdownContent}]],
        sections: [[10, 0]]
    };
    return JSON.stringify(mobiledoc);
}

/**
 * Get the meta information for the export file.
 */
function getMeta(){
    let meta =  {
        exported_on:  Date.now(),
        version:  config.version
    }
    return meta;
}

/**
 * Extract the tag id from the posts collection.
 * 
 * @param {Post} posts 
 */
function getPostsTags(posts){

    let postsTags = [];

    // For each post we extract the main tag
    for (var i = 0; i < posts.length; i++) {
        postsTags.push(  {"tag_id": posts[i].tag_id, "post_id": posts[i].id})
    }

    return postsTags;
}

/**
 * Generate the export.
 */
async function generateExport(){
    
    let meta = getMeta();
    let posts = await getPosts();
    let tags = await getTags();
    let postsTags = getPostsTags(posts);

    let blogData = {
        meta : meta,
        data : {
            posts : posts,
            tags : tags,
            posts_tags : postsTags
        } 
    };
  
   return blogData;
}

/**
 * Generate a slug compliant with Ghost constraints.
 * 
 * @param {String} postUrl 
 */
function generateSlug(postUrl){

    let pattern = /(.*).html/gim
    let slug = postUrl.replace(pattern, function(match, p1){
            return p1;
    });
    return slug;
}

/**
 * Rewrite the URL.
 * @param {string} wikiContent 
 */
function rewriteUrl(wikiContent){

    var replacements = new Map (config.urlRewriteRules);

    replacements.forEach(function(value, key){
        wikiContent = wikiContent.replace(key, value);
    });

    return wikiContent;
}

/**
 * Transform Wiki to Markdown format
 * @param {string} wikiContent 
 */
function convertWikiToMarkdown(wikiContent){

    // Protect the Code & HTML blocks from replacements.
    wikiContent = wikiContent.replace(/^\/\/\/[ ]?html([\s\S]*?)\/\/\//gim, function(match, p1){ return "@HTML@"+Buffer.from(p1).toString('base64')+"@HTML@"});
    wikiContent = wikiContent.replace(/^\/\/\/yash ([a-z]*)([\s\S]*?)\/\/\//gim, function(match, p1, p2){ return "@CODE:"+p1+"@"+Buffer.from(p2).toString('base64')+"@CODE@"});

    // Replace all the Wiki tags into markdown tags.
    var replacements = new Map (config.wikiToMdRewriteRules);
    replacements.forEach(function(value, key){
        wikiContent = wikiContent.replace(key, value);
    });

    // Unprotect the Code & HTML blocks after replacements.
    wikiContent = wikiContent.replace(/^@HTML@(.*)@HTML@/gim,  function(match, p1){ return Buffer.from(p1,'base64').toString('ascii')+"\n"});
    wikiContent = wikiContent.replace(/^@CODE:(.*)@(.*)@CODE@/gim,   function(match, p1,p2){ return "```"+p1+"\n"+Buffer.from(p2,'base64').toString('ascii')+"\n```"});

    return wikiContent;
}

/**
 * Start the main app
 */
async function app(){

    let exportData = await generateExport();
    let exportFilename = "dotclear-export-"+Date.now()+".json";

    fs.writeFile(exportFilename, JSON.stringify(exportData, null, 2), function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The dotclear export to ghost is finished !");
        process.exit(1);
    }); 
};

app();


module.exports = {  
    convertWikiToMarkdown: convertWikiToMarkdown
}
