let apiKey = 'AIzaSyCp3oY15ejWcUjY7JGxoaUrR-CTlY3_SK0';
let maxVideos = 10;

function handleFetch(link, callback) {
	$.ajax({
		url: link,
		method: "GET",
		success: responseJson => callback(responseJson),
		error: err => console.log(err)
	});

}

function displayResult(data) {
	$('.display').html('');
	var items = data.items;
	items.forEach(function (item) {

    let titleVideo = item.snippet.title;
    let imageVideo = item.snippet.thumbnails.medium.url;

		$('.display').append(`
							<a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
							<h3> ${titleVideo} </h3>
							<img src= ${imageVideo} alt="videoThumbnail" class="center">
							</a>

					`);
	});

	if(data.hasOwnProperty('nextPageToken')) {
		$('.display').append('<button id="next"> > </button>');

		$('#next').on('click', (event) => {
			let link = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&part=snippet&type=video&maxResults=' + maxVideos + '&pageToken=' + data.nextPageToken + '&q=' + $('#searchText').val();
			handleFetch(link, displayResult);
		});
	}

	if(data.hasOwnProperty('prevPageToken')) {
		$('.display').append('<button id="prev"> < </button>');

		$('#prev').on('click', (event) => {
			let link = 'https://www.googleapis.com/youtube/v3/search?key='+ apiKey + '&part=snippet&type=video&maxResults='+ maxVideos + '&pageToken=' + data.prevPageToken + '&q=' + $('#searchText').val();
			handleFetch(link, displayResult);
		});

	}

}

function watchForm() {
	$('.youtub').on('submit', (event) => {
		event.preventDefault();
		let nombre = $('#searchText').val();
		let url = 'https://www.googleapis.com/youtube/v3/search?key='+apiKey+'&part=snippet&type=video&maxResults='+maxVideos+'&q=' + nombre;
		handleFetch(url, displayResult);
	});
}
$(watchForm);
