const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
// const youtubeUrl = 'https://www.youtube.com/watch?v=';
function getDataFromApi(searchTerm, callback) {
    const apiKey = 'AIzaSyDLPEE_h1mE3Mb0XcTKpkoyw0yCRIOEPGg';
    const query = {
        part: 'snippet',
        type: 'video',
        key: apiKey,
        q: `${searchTerm} in:name`,
        maxResults: 5
    };
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);

}

function renderResult(result) {
    console.log(result);
    const video_url = `https://www.youtube.com/watch?v=${result.id.videoId}/`;
    return `<div>
        <h2>
            <article class="results">
    <a class="js-result-name" href="${video_url}" target="_blank"><span="description">${result.snippet.title}</span></a>
    <a href="${video_url}" target="_blank"><img class="thumbnail" src="
    ${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}"></a><span class="description">
    ${result.snippet.description}</span></article>
    </h2>
    </div>`;

}


function displaySearchData(data) {
    const results = data.items.map((item, index) => {
        return renderResult(item)
    });
    $('.js-search-results').html(results);
}

function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        // clear out the input
        queryTarget.val("");
        getDataFromApi(query, displaySearchData);
    });
}

$(watchSubmit);