let apiKey = "AIzaSyDqFJ123EQFVBlEZazabvRJfTK8rUSxKEU";
//AIzaSyDqFJ123EQFVBlEZazabvRJfTK8rUSxKEU
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
	//console.log(data);
	items.forEach(function (item) {
    let urlVideo = 'https://www.youtube.com/watch?v=${item.id.videoId}';
    let titleVideo = item.snippet.title;
    let imageVideo = item.snippet.thumbnails.medium.url;



		$('.display').append(`
							<a href= ${urlVideo} target="_blank">
							<h3 class="center"> ${titleVideo} </h3>
							<img src= ${imageVideo} alt="videoThumbnail" class="center">
							</a>
					`);
	});

  if(data.hasOwnProperty('nextPageToken')) {
		$('.display').append('<button id="next" class="display"> > </button>');

		$('#nextBtn').on('click', (event) => {
			let url = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&part=snippet&type=video&maxResults=' + maxVideos + '&pageToken=' + data.nextPageToken + '&q=' + $('#videoSearchBox').val();
			handleFetch(url, displayResult);
		});
	}

  if(data.hasOwnProperty('prevPageToken')) {
		$('.display').append('<button id="prev" class="display"> < </button>');

		$('#previousBtn').on('click', (event) => {
			let url = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&part=snippet&type=video&maxResults=' + maxVideos + '&pageToken=' + data.prevPageToken + '&q=' + $('#videoSearchBox').val();
			handleFetch(url, displayResult);
		});

	}

}

function watchForm() {
	$('.videoForm').on('submit', (event) => {
		event.preventDefault();
		let url = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&part=snippet&type=video&maxResults=' + maxVideos + '&q=' + $('#searchText').val();
		handleFetch(url, displayResult);
	});
}
$(watchForm);
