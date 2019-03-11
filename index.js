let apiKey = "AIzaSyAR9qtEZGLZCNfmQSWqowE8Mqk1W6y89Ms";
//AIzaSyAR9qtEZGLZCNfmQSWqowE8Mqk1W6y89Ms


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


		let urlVideo = 'https://www.youtube.com/watch?v=${item.id.videoId}';
    let titleVideo = item.snippet.title;
    let imageVideo = item.snippet.thumbnails.medium.url;

		$('.display').append(`
							<a href=${urlVideo} target="_blank">
							<h3> ${titleVideo} </h3>
							<img src= ${imageVideo} alt="videoThumbnail" class="center">
							</a>

					`);
	});
	if(data.hasOwnProperty('prevPageToken')) {
		$('.display').append('<button id="prev" class="navig"> < </button>');

		$('#prev').on('click', (event) => {
			let url = 'https://www.googleapis.com/youtube/v3/search?key='+ apiKey + '&part=snippet&type=video&maxResults='+ maxVideos + '&pageToken=' + data.prevPageToken + '&q=' + $('#searchText').val();
			handleFetch(url, displayResult);
		});

	}
	if(data.hasOwnProperty('nextPageToken')) {
		$('.display').append('<button id="next" class="navig"> > </button>');

		$('#next').on('click', (event) => {
			let url = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&part=snippet&type=video&maxResults=' + maxVideos + '&pageToken=' + data.nextPageToken + '&q=' + $('#searchText').val();
			handleFetch(url, displayResult);
		});
	}
}

function watchForm() {
	$('.youtub').on('submit', (event) => {
		event.preventDefault();

		let videos = $('#searchText').val();
		let url = 'https://www.googleapis.com/youtube/v3/search?key='+apiKey+'&part=snippet&type=video&maxResults='+maxVideos+'&q=' + videos;
		handleFetch(url, displayResult);
	});
}
$(watchForm);
