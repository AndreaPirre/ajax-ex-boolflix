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

$(document).ready(function(){

            var urlBase="https://api.themoviedb.org/3";

            $('#search_input').keydown(function(event){
            if (event.which==13) {
              var filmCercato=$('#search_input').val();
              cercaFilm(filmCercato,urlBase);

                }
            });

            function stampaFilm(elencofilm){

            for (var i = 0; i < elencofilm.length; i++) {
              var titoloFilm= elencofilm[i].title;
              var titoloOriginale= elencofilm[i].original_title;
              var linguaOriginale= elencofilm[i].original_language;
              var votoFilm= elencofilm[i].vote_average;

          }};


            function cercaFilm(ricercaUtente,urlBase){

                $.ajax({
                  url:urlBase+"/search/movie",
                  method:"GET",
                  data: {
                    'api_key':"603faf8c2a684dc57112e107f86af1ba",
                    'query': ricercaUtente,
                    'language': "it"
                  },
                  success:function(data){
                    var filmtrovati=data.results;
                    console.log(filmtrovati);
                    stampaFilm(filmtrovati);
                  },
                  error: function(){
                    alert("Ops, qualcosa è andato storto");
                }}

            )};



});




// function init() {
//
//
//
// console.log("hello world");
//
// }
//
// $(document).ready(init);
