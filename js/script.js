

function addSearchClickListener() {
    var target = $('#search_btn');
    target.click(avviaRicerca);
}

function avviaRicerca() {

    var target = $('#query');
    var query = target.val();
    target.val('');

    var targetResult = $('#results ul');
    targetResult.text('');

    mostraFilm(query);
    mostraSerieTv(query);
}


// film
function mostraFilm(query){


    $.ajax({

        url:'https://api.themoviedb.org/3/search/movie',
        method:'GET',
        data: {
            'api_key': '603faf8c2a684dc57112e107f86af1ba',
            'query': query
        },

        success: function(data) {
            var films = data["results"];

            var target = $('#results ul');
            var template = $('#film-template').html();
            var compiled = Handlebars.compile(template);

            // ciclo for
            for (var i = 0; i < films.length; i++) {

                var film = films[i];

                var vote = film['vote_average'];
                film.stars = getStars(vote);

                var lang = film['original_language'];
                film.flag = getFlag(lang);


                var filmHTML = compiled(film);
                target.append(filmHTML);

            }
        },
        error: function(err) {
            console.log(err);
        }
    });

}

// stelle
function getStars(vote) {
    vote = Math.ceil(vote / 2);
    var voteHTML = '';
    for (var i=0; i<5; i++) {

        if (i<vote) {

            voteHTML += '<i class="fas fa-star" />'
        } else {

            voteHTML += '<i class="far fa-star" />'
        }
    }
    return voteHTML;
}

// bandiere
function getFlag(lang) {

    if (lang === 'it' || lang === 'en') {

        return `<img class="flag" src="img/${lang}.png"`;

    }
        return lang;

}
// serie tv
    function mostraSerieTv(query){

        $.ajax({

            url:'https://api.themoviedb.org/3/search/tv',
            method:'GET',
            data: {
                'api_key': '603faf8c2a684dc57112e107f86af1ba',
                'query': query
            },

            success: function(data) {
                var series = data["results"];

                var target = $('#results ul');
                var template = $('#serie-template').html();
                var compiled = Handlebars.compile(template);

                // ciclo for
                for (var i = 0; i < series.length; i++) {

                    var serie = series[i];

                    var vote = serie['vote_average'];
                    serie.stars = getStars(vote);

                    var lang = serie['original_language'];
                    serie.flag = getFlag(lang);

                    var serieHTML = compiled(serie);
                    target.append(serieHTML);

                }
            },
            error: function(err) {
                console.log(err);
            }
        });
}




function init() {

    addSearchClickListener();

    avviaRicerca();

// debug
    mostraFilm();

}

$(document).ready(init);
