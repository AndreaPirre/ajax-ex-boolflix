// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o
// parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che
// ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// 1.Titolo
// 2.Titolo Originale
// 3.Lingua
// 4.Voto

// Milestone 2:Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5,
// così dapermetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,lasciando
// le restanti vuote (troviamo le icone in FontAwesome).Arrotondiamo sempre per eccesso all’unità successiva,
// non gestiamo icone mezzepiene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente,
// gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono
// alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi
// nel JSON di risposta diversi, simili ma non sempre identici)Qui un esempio di chiamata per le serie tv:

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

function getFlag(lang) {

    if (lang === 'it' || lang === 'en') {

        return `<img class="flag" src="img/${lang}.png"`;

    }
        return lang;

}

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

}

$(document).ready(init);
