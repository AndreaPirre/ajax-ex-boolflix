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

function addSearchClickListener() {
    var target = $('#search_btn');
    target.click(mostraFilm)
}

function mostraFilm(){

    var target = $('#query');
    var query = target.val();
    $.ajax({

        url:'https://api.themoviedb.org/3/search/movie/',
        method:'GET',
        data: {
            'api_key': '603faf8c2a684dc57112e107f86af1ba',
            'query': query
        },

        success: function(data) {
            var film = data['results'];

            var target = $('#results ul');
            var template = $('#film-template').html();
            var compiled = Handlebars.compile(template);
            // ciclo for
            for (var i = 0; i < film.length; i++) {

                var film = film[i];
                
                var filmHTML = compiled({
                    titolo: film['title']
                });
                target.append(filmHTML);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}


function init() {

    addSearchClickListener();

}

$(document).ready(init);
