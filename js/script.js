function createGalleryElement(element) {
	return document.createElement(element);
}

function append(parent, element) {
	return parent.appendChild(element);
}


fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
	.then((response) => response.json())
	.then(function (data) {
		let photos = data;
		return photos.forEach(function (photo) {
			let div = createGalleryElement('div'),
				a = createGalleryElement('a'),
				img = createGalleryElement('img');
			div.className = 'albumItem';
			a.href = photo.url;
			a.dataset.fancybox = 'gallery';
			img.src = photo.thumbnailUrl;
			img.alt = photo.title;
			
			append(document.getElementById('test'), div);
			append(div, a);
			append(a, img);

		})
	})

	.catch (function (error) {
		console.log(error);
	});

