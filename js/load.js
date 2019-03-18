$(document).ready(function(){


function wrapWords(str, tmpl) {
  return str.replace(/\S+/g, tmpl || "<a class=\"tag\" href=\"https://www.flickr.com/photos/tags/$&\" target=\"_blank\">$&</a>");
}

function load_posts(){
  $.getJSON('data.json', function(data) {

  var items = [];

    $.each( data.items, function( key, val ) {
      $.each(val.items, function(){
      	//console.log(this)
      		var dsc = this.description.replace(/<img[^>]*>/g,"");

      		const manual_post = ({title, image, author, description, link, tags, profile}) => `
	            <div class="post item">
					<div class="image">
						<a href="${link}" target="_blank"><img src="${image}" alt=""></a>
					</div>
					<div class="image_title_bar">
						<span class="title"><a href="${link}" target="_blank">${title}</a></span> by <span class="author"><a href="https://www.flickr.com/photos/${profile}" target="_blank">${author}</a></span>
						</div>
					<div class="image_description">
						${description}
					</div>
					<div class="image_tags">
						<span class="tags">${tags}</span>
					</div>
				</div>
            `;

            $('.masonry').append([
              { 
                title: this.title,
                image: this.media.m,
                tags: wrapWords(this.tags),
                author: this.author.match(/"([^"]+)"/)[1],
                description: dsc,
                link: this.link,
                profile: this.author_id,
                // img:,
                // img:,
                // img:,
              },
            ].map(manual_post).join(''));
      });
    });

  });
}

//https://jsonlint.com/

load_posts();


});

