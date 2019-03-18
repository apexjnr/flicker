$(document).ready(function(){


function t1(str, tmpl) {
  return str.replace(/\S+/g, tmpl || "<a class=\"tag\" href=\"https://www.flickr.com/photos/tags/$&\" target=\"_blank\">$&</a>");
}
function t2(str, tmpl) {
  return str.replace(/\S+/g, tmpl || "<a class=\"nav-link\" href=\"https://www.flickr.com/photos/tags/$&\" target=\"_blank\">$&</a>");
}

function load_posts(){
  $.getJSON('data.json', function(data) {

  var tags_array = [];

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
                tags: t1(this.tags),
                author: this.author.match(/"([^"]+)"/)[1],
                description: dsc,
                link: this.link,
                profile: this.author_id,
                // img:,
                // img:,
                // img:,
              },
            ].map(manual_post).join(''));

            add_tag = t2(this.tags);

            tags_array.indexOf(add_tag) === -1 ? tags_array.push(add_tag) : console.log("This item already exists");
      	});
    });	

	$.each( tags_array, function( key, val ) {
		$('#list').append(val);
	});	

  });
}

//https://jsonlint.com/

load_posts();


});

