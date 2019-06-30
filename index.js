import reddit from './redditapi.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//Form Event Listener
searchForm.addEventListener('submit', e => {
  //Get SearchTerm
  const searchTerm = searchInput.value;
  //GET sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  //Get limit
  const searchLimit = document.getElementById('limit').value;
  //Get after
  // const after = document.getElementById('after');


  //Check Input
  if(searchTerm === '') {
    //Show message
    showMessage('Please add a searchTerm','alert-danger' );
  }
    //Clear input
    searchInput.value = '';

    //Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
      console.log(results);
     let output = '<div class="card-columns">';
    //Loop through posts
      results.forEach(post => {

        //Check for image
        const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
        output += `
        <div class="card">
          <img src="${image}" class="card-img-top" alt="Card image cap">
          <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <h5 class="card-title">Author: ${post.author}</h5>
          <h5 class="card-title">Created: ${post.created}</h5>
          <h5 class="card-title">Comments: ${post.num_comments}</h5>
          <h5 class="card-title"><a href="${post.permalink.url}"  target="_blank">Permalink</a></h5>
          <p class="card-text">${post.selftext}</p>
          <a href="${post.url}" target="_blank" class="btn btn-primary">Read more</a>
          <hr>
           <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
           <span class="badge badge-dark">Score: ${post.score}</span>
          </div>
        </div>
        `;
      })
      output += '<div>';
      document.getElementById('results').innerHTML = output;
    });

  e.preventDefault();
});


//Show Message
function showMessage(message, className) {
  //Create div
      const div = document.createElement('div');
  //Add classes
      div.className = `alert ${className}`;
  // Add text
      div.appendChild(document.createTextNode(message));
  //Get parent
      const searchContainer = document.getElementById('search-container');
  //Get search
      const search = document.getElementById('search');

  // Insert message
      searchContainer.insertBefore(div, search);

  //Timeout alert
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
}
