/*var data = fetch('http://jsonplaceholder.typicode.com/photos')
	.then(response => response.json())
	.then(json => console.log(json));

var output = document.getElementById("test");
output.innerHtml = data.thumbnailUrl;

/*data.images.forEach( function(obj) {
	var img = new Image();
	img.src = obj.thumbnailUrl;
	img.setAttribute("class", "banner-img");
	img.setAttribute("alt", "effy");
	document.getElementById("test").appendChild(img);
});*/


/*fetch('https://jsonplaceholder.typicode.com/photos')
	.then(response => {
		return response.json();
	})
	.then(data => {
		console.log(data);
	}).catch(err => {
		console.log("Ошибка подключения");
});*/


var apiUrl = 'https://jsonplaceholder.typicode.com/albums/1/photos'
var output = document.getElementById("test");

fetch(apiUrl).then(response => {
	return response.json();
}).then(data => {
// Work with JSON data
	var photos = data;
// Display each person details
	photos.forEach(function(photo) {
		output.innerHTML = '<div class="albumItem"><a data-fancybox="gallery" href="' + photo.url + '"><img src="' + photo.thumbnailUrl + '" alt="' + photo.title + '"></a></div>';
	})
}).catch(err => {
// Print error, if any
	console.log(err);
});

