
function authorize(){
    window.location.replace('https://anilist.co/api/v2/oauth/authorize?client_id=8560&response_type=token');
}



function getData(){
  // const urlparams = new URLSearchParams(window.location.search);
  // const token = urlparams.get('access_token');
  let thisURL = window.location.href;
  
  var token = window.location.href.substring(
    thisURL.lastIndexOf("access_token") + 13, 
    thisURL.lastIndexOf("&")-18
);
// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
    genres
  }
}
`;

let userList = `
query($userId: Int){
  MediaListCollection(userId:$userId, type: ANIME){
		lists{
			name
      entries{
        media{
          title{
						romaji
          }
          format
          episodes
        }
        completedAt{
          year
          month
          day
        }
        score
      }
    }
  }
}
`

// Define our query variables and values that will be used in the query request
var variables = {
    userId: 5256205
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: userList,
            variables: variables
        })
    };

// Make the HTTP Api request
fetch(url, options).then(handleResponse)
                   .then(handleData)
                   .catch(handleError);
  }

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(rawData) {
    let fixedData = [];
    for(let obj of rawData.data.MediaListCollection.lists){
      if(obj.name === "Completed") {
          fixedData = HandleArrayOfEntries(obj.entries);
      }
    }
    addDataToString(fixedData);
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}

function HandleArrayOfEntries(arr){
    let newArr = [];
    for(let entry of arr){
        newArr.push({'completedAt': entry.completedAt, 'episodes': entry.media.episodes, 'title': entry.media.title.romaji, 'score': entry.score, 'format': entry.media.format});
    }
    return(newArr);
}

function addDataToString(arr){
    animeData = `Name|Score|Episodes|Finish Date|Type`;
    reset();
    arr?.forEach(entry =>{
        if(arr.indexOf(entry) === 0){
            animeData += '\n';
        }
        animeData += entry.title;
        animeData += '|'
        animeData += entry.score;
        animeData += '|'
        animeData += entry.episodes;
        animeData += '|'
        if(entry.completedAt){
            animeData += entry.completedAt.year;
            animeData += '-';
            animeData += entry.completedAt.month;
            animeData += '-';
            animeData += entry.completedAt.day;
            animeData += '|'
        }
        else{
            animeData += 'N/A'
            animeData += '|'
        }
        animeData += entry.format;
        animeData += '\n'
    });
    scoreEpisodes(true);
}
