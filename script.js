var yValues = [];
var myChart;
var labels = [];
var measure = 'Score';
var graphType = 'bar';
var anime = [];
var chart = document.getElementById('chart');
var ctx = chart.getContext('2d');
var ctx2 = document.getElementById('chart2').getContext('2d');
var container = document.getElementById('chart-container');
var label = 'Anime';
var states = ['date', 'score', 'bar', 'yes'];
class Anime{
    constructor(n, s, e, d, t){
        this.name = n;
        this.score = s;
        this.episodes = e;
        this.finishDate = d;
        this.type = t;
    }
}

window.onload=function(){
	scoreEpisodes(true);
}
 
//nameScore(true, true);
//monthEpisodesBar(false);
//typesPie('pie', false);
//episodeScore(true);
//typeScoreBar();
//scorePie('pie');
// monthEpisodeBar
// monthScoreBar




function reassign(n, to){
	states[n] = to;
}
function reset(){
	if(myChart) myChart.destroy();
	yValues = [];
	labels = [];
	anime = [];
	
}


function update(){
	reset();
	var call;
	// date as X:
	if(states[0] == 'date'){
		if(states[1] == 'score'){
			if(states[3] == 'yes'){
				call = nameScore(true, true);
			}
			else{
				call = nameScore(false, true);
			}
		}
		else if(states[1] == 'episodes'){
			if(states[3] == 'yes'){
				call = nameScore(true, false);
			}
			else{
				call = nameScore(false, false);
			}
		}
	}
	// episodes as X:
	else if(states[0] == 'episodes'){
		if(states[1] == 'score'){
			call = episodeScore(true);
		}
		else if(states[1] == 'episodes'){
			call = episodeScore(false);
		}
	}
	
	
	// score as X:
	else if(states[0] == 'individual'){
		if(states[1] == 'score'){
			call = scoreEpisodes(true);
		}
		else if(states[1] == 'episodes'){
			call = scoreEpisodes(false);
		}
		
	}
	
	// Month as X:
	else if(states[0] == 'month'){
		
		
			if(states[1] == 'score'){
				if(states[2] == 'bar'){
					call = monthScoreBar();
				}
			}
			else if(states[1] == 'episodes'){
				if(states[2] == 'bar'){
					call = monthEpisodesBar(false);
				}
				else if(states[2] == 'pie'){
					call = monthAnime('pie', false);
				}
				else if(states[2] == 'doughnut'){
					call = monthAnime('doughnut', false);
				}
			}
			else if(states[1] == 'anime'){
				if(states[2] == 'bar'){
					call = monthEpisodesBar(true);
				}
				else if(states[2] == 'pie'){
					call = monthAnime('pie', true);	
				}
				else if(states[2] == 'doughnut'){
					call = monthAnime('doughnut', true);	
				}
			}		
		
	}
	
	
	// Types as X
	else if(states[0] == 'types'){
		
		
			if(states[1] == 'score'){
				if(states[2] == 'bar'){
					call = typeScoreBar();
				}
			}
			else if(states[1] == 'episodes'){
				if(states[2] == 'bar'){
					call = typesAnimeBar(false);
				}
				else if(states[2] == 'pie'){
					call = scorePie('pie', false);
				}
				else if(states[2] == 'doughnut'){
					call = scorePie('doughnut', false);
				}
			}
			else if(states[1] == 'anime'){
				if(states[2] == 'bar'){
					call = typesAnimeBar(true);
				}
				else if(states[2] == 'pie'){
					call = scorePie('pie', true);	
				}
				else if(states[2] == 'doughnut'){
					call = scorePie('doughnut', true);	
				}
			}		
		
	}
	
	
	else if(states[0] == 'scores'){
		
		
			if(states[1] == 'score'){
					

			}
		
		
			else if(states[1] == 'episodes'){
				if(states[2] == 'bar'){
					call = scoreEpisodeBar(false);
				}
				else if(states[2] == 'pie'){
					call = scorePie('pie', false);
				}
				else if(states[2] == 'doughnut'){
					call = scorePie('doughnut', false);
				}
			}
		
		
			else if(states[1] == 'anime'){
				if(states[2] == 'bar'){
					call = scoreEpisodeBar(true);
				}
				else if(states[2] == 'pie'){
					call = scorePie('pie', true);	
				}
				else if(states[2] == 'doughnut'){
					call = scorePie('doughnut', true);	
				}
			}		
		
	}
	
	call;
}

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//false is episodes, true is score
function nameScore(show, scoreOrEp){
	 bar();
	 scoreOrEp == false ? label = 'Episodes' : label = 'Score'; 
    var averages = [];
    var count = 0;
    var total = 0;
    anime = [];
    const table = data.split('\n').slice(1);
table.forEach(row => {
    const columns = row.split(',');
    const name = columns[0];
    const score = columns[1];
    const episodes = columns[2];
    const finishDate = columns[3];
    const type = columns[4];
    anime.push(new Anime(name, score, episodes, finishDate, type));
    

});
anime.forEach(anime => {
    if(scoreOrEp){
    if(anime.score == 'N/A') return;
	 if(anime.finishDate == 'N/A') return;
    labels.push(anime.name);
    yValues.push(anime.score);
    count++;
    total += parseFloat(anime.score);
    averages.push(total/count);
	 }
	else{
		if(anime.score == 'N/A') return;
		if(anime.finishDate == 'N/A') return;
    labels.push(anime.name);
    yValues.push(anime.episodes);
    count++;
    total += parseFloat(anime.episodes);
    averages.push(total/count);
		
	}
});
	
    if(show){
    myChart = new Chart(ctx, {
        
        data: {
            labels: labels, 
            datasets: [{
                type: 'bar',
                label: label,
                data: yValues,
                borderWidth: 1,
                backgroundColor: ['rgba(99, 180, 200, 0.2)'],
                borderColor: ['rgba(99, 180, 200, 1)'],
            },
            {
                type: 'line',
                label: 'Average',
                data: averages,
                borderWidth: 1,
                backgroundColor: ['rgba(99, 180, 200, 0.2)'],
                borderColor: ['rgba(99, 180, 200, 1)'],
            }
        
        
        
             ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
            },
            responsive: true
        }
    });
}
    else{
        myChart = new Chart(ctx, {
        
            data: {
                labels: labels, 
                datasets: [{
                    type: 'bar',
                    label: measure,
                    data: yValues,
                    borderWidth: 1,
                    backgroundColor: ['rgba(99, 180, 200, 0.2)'],
                    borderColor: ['rgba(99, 180, 200, 1)'],
                }
            
            
            
                 ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    },
                },
                responsive: true
            }
        });
    }


}



//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------

// Type pie chart
function typesPie(type, animeOrEp){
	pie();
    var TV = 0;
    var Movie = 0;
    var OVA = 0;
    var ONA = 0;
    var Special = 0;
    const table = data.split('\n').slice(1);
table.forEach(row => {
    const columns = row.split(',');
    const type = columns[4];
	 const episodes = parseFloat(columns[2]);
	 if(animeOrEp == true){
    if(type == 'TV') TV++;
    if(type == 'Movie') Movie++;
    if(type == 'OVA') OVA++;
    if(type == 'ONA') ONA++;
    if(type == 'Special') Special++;
	 }
	if(animeOrEp == false){
    if(type == 'TV') TV += episodes;
    if(type == 'Movie') Movie+=episodes;
    if(type == 'OVA') OVA+=episodes;
    if(type == 'ONA') ONA+=episodes;
    if(type == 'Special') Special+=episodes;
	 }
});
	myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: [
                'TV',
                'Movie',
                'OVA',
                'ONA',
                'Special'
              ],
              datasets: [{
                label: 'My First Dataset',
                data: [TV, Movie, OVA, ONA, Special],
                backgroundColor: [
                  'red',
                  'blue',
                  'green',
                  'yellow',
                  'purple'
                ],
                hoverOffset: 4
              }]
        },
        options: {
            responsive: true
        }
    });
}
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//(sort by episodes, score)
function episodeScore(scoreOrEp){
	 bar();
	scoreOrEp == false ? label = 'Episodes' : label = 'Score'; 
    const table = data.split('\n').slice(1);
table.forEach(row => {
    const columns = row.split(',');
    const name = columns[0];
    const score = columns[1];
    const episodes = columns[2];
    const finishDate = columns[3];
    const type = columns[4];
    anime.push(new Anime(name, score, episodes, finishDate, type));
    
    

});
	anime.sort((a, b) => (parseFloat(a.episodes) >= parseFloat(b.episodes)) ? 1 : -1);
anime.forEach(anime => {
    if(anime.score == 'N/A') return;
	 if(scoreOrEp){
    labels.push(anime.name);
    yValues.push(anime.score);
	 }
	 else{
	 labels.push(anime.name);
    yValues.push(anime.episodes);
	 }
});
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: yValues,
                borderWidth: 1,
                backgroundColor: ['rgba(99, 180, 200, 0.2)'],
                borderColor: ['rgba(99, 180, 200, 1)'],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true
        }
    });
}
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------

function monthAnime(type, animeOrEp){
	 pie();
	 var memo = {};
	 var values = [];
	 var labels = [];
    const table = data.split('\n').slice(1);
table.forEach(row => {
    const columns = row.split(',');
    const finishDate = columns[3];
    if(finishDate == 'N/A') return;
	 const date = String(new Date(finishDate));
	 const month = date.substr(4, 3);
	 const year = date.substr(10, 5);
	 const monthYear = month + year;
	 const episodes = parseFloat(columns[2]);
	
	
	if(animeOrEp){
		if(monthYear in memo){
			memo[monthYear]++; 
		}
		else{
			memo[monthYear] = 1;	
		}
	}
	else{
	if(monthYear in memo){
			memo[monthYear] += episodes; 
		}
		else{
			memo[monthYear] = episodes;	
		}
	}
	
	

});

	
	labels = Object.keys(memo);
	values = Object.values(memo);
    myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
              datasets: [{
                label: 'Anime',
                data: values,
                backgroundColor: [
                  'red',
                  'blue',
                  'green',
                  'yellow',
                  'purple',
						'orange',
						'indigo',
						'maroon',
						'turquoise',
						'lime',
						'lightblue',
						'violet',
						'lightgreen'
                ],
                hoverOffset: 4
              }]
        },
        options: {
            responsive: true
        }
    });
	
}

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
function bar(){
	container.style.left = '0vw';
	container.style.position = 'absolute';
	container.style.height = '40vh';
	container.style.width = '80vw';
}
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------

function pie(){
	container.style.position = 'absolute';
	container.style.height = '45vh';
	container.style.width = '45vw';
	container.style.left = '20vw';
}

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
function monthEpisodesBar(animeOrEps){
	 bar();
	 animeOrEps == false ? label = 'Episodes' : label = 'Anime'; 
	 var memo = {};
    const table = data.split('\n').slice(1);
table.forEach(row => {
    const columns = row.split(',');
    const finishDate = columns[3];
    if(finishDate == 'N/A') return;
	 const date = String(new Date(finishDate));
	 const month = date.substr(4, 3);
	 const year = date.substr(10, 5);
	 const monthYear = month + year;
	const episodes = parseFloat(columns[2]);
	
	 
	if(animeOrEps){
		if(monthYear in memo){
			memo[monthYear]++; 
		}
		else{
			memo[monthYear] = 1;	
		}
	}
	else{
	if(monthYear in memo){
			memo[monthYear] += episodes; 
		}
		else{
			memo[monthYear] = episodes;	
		}
	}
	
	labels = Object.keys(memo);
	values = Object.values(memo);
	

});
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
              datasets: [{
                label: label,
                data: values,
                backgroundColor: [
                  'red',
                  'blue',
                  'green',
                  'yellow',
                  'purple',
						'orange',
						'indigo',
						'maroon',
						'turquoise',
						'lime',
						'lightblue',
						'violet',
						'lightgreen'
                ],
              }]
        },
        options: {
            responsive: true
        }
    });
}

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

function typesAnimeBar(animeOrEp){
	bar();
	animeOrEp == false ? label = 'Episodes' : label = 'Anime'; 
    var TV = 0;
    var Movie = 0;
    var OVA = 0;
    var ONA = 0;
    var Special = 0;
    const table = data.split('\n').slice(1);
table.forEach(row => {
    const columns = row.split(',');
    const type = columns[4];
	 const episodes = parseFloat(columns[2]);
	 if(animeOrEp == true){
    if(type == 'TV') TV++;
    if(type == 'Movie') Movie++;
    if(type == 'OVA') OVA++;
    if(type == 'ONA') ONA++;
    if(type == 'Special') Special++;
	 }
	if(animeOrEp == false){
    if(type == 'TV') TV += episodes;
    if(type == 'Movie') Movie+=episodes;
    if(type == 'OVA') OVA+=episodes;
    if(type == 'ONA') ONA+=episodes;
    if(type == 'Special') Special+=episodes;
	 }
});
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'TV',
                'Movie',
                'OVA',
                'ONA',
                'Special'
              ],
              datasets: [{
                label: label,
                data: [TV, Movie, OVA, ONA, Special],
                backgroundColor: [
                  'red',
                  'blue',
                  'green',
                  'yellow',
                  'purple'
                ],
                hoverOffset: 4
              }]
        },
        options: {
            responsive: true
        }
    });
}




function monthScoreBar(){
	 bar();
	 var inBetween = [];
    var memo = {};
	 var values = [];
	 var labels = [];
    const table = data.split('\n').slice(1);
table.forEach(row => {
    const columns = row.split(',');
    const finishDate = columns[3];
	 var score = columns[1];
    if(finishDate === 'N/A') return;
	 if(score != 'N/A') {
	 score = parseFloat(columns[1]);
	 const date = String(new Date(finishDate));
	 const month = date.substr(4, 3);
	 const year = date.substr(10, 5);
	 const monthYear = month + year;
		 


	if(monthYear in memo){
			memo[monthYear][0] += score; 
			memo[monthYear][1] += 1; 
		}
		else{
			memo[monthYear] = [score, 1];	
		}
		 
	 }
	

});

	labels = Object.keys(memo);
	inBetween = Object.values(memo);
	inBetween.forEach(el =>{
		values.push(el[0]/el[1]);
	});
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
              datasets: [{
                label: 'Average Score',
                data: values,
                backgroundColor: [
                  'red',
                  'blue',
                  'green',
                  'yellow',
                  'purple',
						'orange',
						'indigo',
						'maroon',
						'turquoise',
						'lime',
						'lightblue',
						'violet',
						'lightgreen'
                ],
              }]
        },
        options: {
            responsive: true
        }
    });
	
}


//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
function typeScoreBar(){
	 bar();
	 var TV = [0, 0];
    var Movie = [0, 0];
    var OVA = [0, 0];
    var ONA = [0, 0];
    var Special = [0, 0];
    const table = data.split('\n').slice(1);
table.forEach(row => {
    const columns = row.split(',');
    const type = columns[4];
	 var score = columns[1];
	 if(score != 'N/A') {
	 score = parseFloat(columns[1]);
	if(type == 'TV') TV[0] += score, TV[1] += 1;
   if(type == 'Movie') Movie[0] += score, Movie[1] += 1;
   if(type == 'OVA') OVA[0] += score, OVA[1] += 1;
	if(type == 'ONA') ONA[0] += score, ONA[1] += 1;
	if(type == 'Special') Special[0] += score, Special[1] += 1;
	 }
	

});
	 let TVf = TV[0]/TV[1];
    let Movief = Movie[0]/Movie[1];
    let OVAf = OVA[0]/OVA[1];
    let ONAf = ONA[0]/ONA[1];
    let Specialf = Special[0]/Special[1];
	
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
				'TV',
            'Movie',
    			'OVA',
				'ONA',
				'Special',
				
              ],
              datasets: [{
                label: 'Average Score',
                data: [TVf, Movief, OVAf, ONAf, Specialf],
                backgroundColor: [
                  'red',
                  'blue',
                  'green',
                  'yellow',
                  'purple',
                ],
              }]
        },
        options: {
            responsive: true
        }
    });
	
}





function scoreEpisodes(scoreOrEp){
	 bar();
	scoreOrEp == false ? label = 'Episodes' : label = 'Score'; 
    const table = data.split('\n').slice(1);
table.forEach(row => {
    const columns = row.split(',');
    const name = columns[0];
    const score = columns[1];
    const episodes = columns[2];
    const finishDate = columns[3];
    const type = columns[4];
    anime.push(new Anime(name, score, episodes, finishDate, type));
    
    

});
	anime.sort((a, b) => (parseFloat(a.score) >= parseFloat(b.score)) ? 1 : -1);
anime.forEach(anime => {
    if(anime.score == 'N/A') return;
	 if(scoreOrEp){
    labels.push(anime.name);
    yValues.push(anime.score);
	 }
	 else{
	 labels.push(anime.name);
    yValues.push(anime.episodes);
	 }
});
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: yValues,
                borderWidth: 1,
                backgroundColor: ['rgba(99, 180, 200, 0.2)'],
                borderColor: ['rgba(99, 180, 200, 1)'],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true
        }
    });
}

function scorePie(type, animeOrEps){
	pie();
    var one = 0;
    var two = 0;
    var three = 0;
    var four = 0;
    var five = 0;
	var six = 0;
	var seven = 0;
	var eight = 0;
	var nine = 0;
	var ten = 0;
    const table = data.split('\n').slice(1);
table.forEach(row => {
    const columns = row.split(',');
    const score = parseFloat(columns[1]);
	 const episodes = parseFloat(columns[2]);
	if(animeOrEps){
    if(score == 1) one++;
    if(score == 2) two++;
    if(score == 3) three++;
    if(score == 4) four++;
    if(score == 5) five++;
	 if(score == 6) six++;
	 if(score == 7) seven++;
	 if(score == 8) eight++;
	 if(score == 9) nine++;
	 if(score == 10) ten++;
	}
	
	else{
	if(score == 1) one+=episodes;
    if(score == 2) two+=episodes;
    if(score == 3) three+=episodes;
    if(score == 4) four+=episodes;
    if(score == 5) five+=episodes;
	 if(score == 6) six+=episodes;
	 if(score == 7) seven+=episodes;
	 if(score == 8) eight+=episodes;
	 if(score == 9) nine+=episodes;
	 if(score == 10) ten+=episodes;
	
	}
	 
});
    myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: [
                'Score 1',
                'Score 2',
                'Score 3',
                'Score 4',
                'Score 5',
					'Score 6',
					'Score 7',
					'Score 8',
					'Score 9',
					'Score 10'
              ],
              datasets: [{
                label: 'My First Dataset',
                data: [one, two, three, four, five, six, seven, eight, nine, ten],
                backgroundColor: [
                  'red',
                  'blue',
                  'green',
                  'yellow',
                  'purple',
						'orange',
						'indigo',
						'maroon',
						'turquoise',
						'lime',
                ],
                hoverOffset: 4
              }]
        },
        options: {
            responsive: true
        }
    });
}

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------


function scoreEpisodeBar(animeOrEps){
	 bar();
	 animeOrEps == false ? label = 'Episodes' : label = 'Anime'; 
	 var one = 0;
    var two = 0;
    var three = 0;
    var four = 0;
    var five = 0;
	var six = 0;
	var seven = 0;
	var eight = 0;
	var nine = 0;
	var ten = 0;
    const table = data.split('\n').slice(1);
table.forEach(row => {
    const columns = row.split(',');
    const finishDate = columns[3];
	const episodes = parseFloat(columns[2]);
	const score = parseFloat(columns[1]);
    if(finishDate == 'N/A') return;
	 if(score == 'N/A') return;
	
	
	 
	if(animeOrEps){
		if(score == 1) one++;
    if(score == 2) two++;
    if(score == 3) three++;
    if(score == 4) four++;
    if(score == 5) five++;
	 if(score == 6) six++;
	 if(score == 7) seven++;
	 if(score == 8) eight++;
	 if(score == 9) nine++;
	 if(score == 10) ten++;
	
	}
	else{
	if(score == 1) one+=episodes;
    if(score == 2) two+=episodes;
    if(score == 3) three+=episodes;
    if(score == 4) four+=episodes;
    if(score == 5) five+=episodes;
	 if(score == 6) six+=episodes;
	 if(score == 7) seven+=episodes;
	 if(score == 8) eight+=episodes;
	 if(score == 9) nine+=episodes;
	 if(score == 10) ten+=episodes;
	
	}
	

});
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
				'Score 1',
                'Score 2',
                'Score 3',
                'Score 4',
                'Score 5',
					'Score 6',
					'Score 7',
					'Score 8',
					'Score 9',
					'Score 10'
              ],
              datasets: [{
                label: label,
                data: [one, two, three, four, five, six, seven, eight, nine, ten],
                backgroundColor: [
                  'red',
                  'blue',
                  'green',
                  'yellow',
                  'purple',
						'orange',
						'indigo',
						'maroon',
						'turquoise',
						'lime',
						'lightblue',
						'violet',
						'lightgreen'
                ],
              }]
        },
        options: {
            responsive: true
        }
    });
}