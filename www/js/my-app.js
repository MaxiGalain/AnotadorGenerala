// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {path: '/juego/', url: 'juego.html',},
      {path: '/index/', url: 'index.html',},
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var nombre1 = "";
var nombre2 = "";
var casilla = "";
var valorElegido = "";
var datoElegido = "";

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="juego"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log("vista juego");

//Llamado a funciones    
    $$('#n1').html('<p>'+nombre1+'</p>');
    $$('#n2').html('<p>'+nombre2+'</p>');
    $$('.popup-close').on('click', fnMostrarTotal);
    $$('.popup-open').on('click', fnCasilla);
    $$('.game').on('click', fnPonerValorBase);
    $$('.dedal').on('click', fnPonerValorDedal);
    $$('#btnLimpiar').on('click', fnLimpiar);
    $$('#btnTerminar').on('click', fnMuestraGanador);
     
    //Esto sucede cuando el popup1 se abre
        $$('.my-popup').on('popup:opened', function(){
          console.log('Vista PopUp1');
          $$('.dado').on('click', function fnValor(){
            datoElegido = this.value;
              if (isNaN(datoElegido)){
                $$('#dt'+casilla).val(datoElegido);
                  }else { 
                    $$('#dt'+casilla).val(parseInt(datoElegido) * parseInt(valorDedal));
                  }
            console.log('Estoy seleccionando el dato' + datoElegido);                  
          });
        });   
          //Cuando se abre el pop up, el id en donde hacemos clic se guarda en casilla
          function fnCasilla (){
            casilla = this.id;
            console.log('Entre en esta casilla'+casilla);
          }

          function fnPonerValorDedal(){
            valorDedal = $$(this).attr('valorDedal');
          }
    //--------------------Esto pasa cuando se abre el popup2---

      $$('.my-popup2').on('popup:opened', function(){
        console.log('Vista PopUp2');
       
        $$('.jugada').on('click', function fnValor(){
              valorElegido = this.value;
                if (isNaN(valorElegido)){
                  $$('#dt'+casilla).val(valorElegido);
                  }else {
                    $$('#dt'+casilla).val(parseInt(valorElegido) + parseInt(valorBase));
                  }
             });
        });
      });

    function fnPonerValorBase(){
      valorBase = $$(this).attr('valorBase');
    }
   
    function fnMostrarTotal(){
      var total1 = 0;
      
        for (i=1; i<=11; i++) {
          var valor = parseInt($$('#dtJ1_'+i).val());
          if (!isNaN(valor)){
            total1 += valor;  
          }
        }
      $$('#totalj1').val(total1);

      var total2 = 0;
      
        for (i=1; i<=11; i++) {
          var valor = parseInt($$('#dtJ2_'+i).val());
          if (!isNaN(valor)){
            total2 += valor; 
            
          }
        }
      $$('#totalj2').val(total2);
    }

    function fnMuestraGanador() {
      console.log("terminar")
      jugador1 = parseInt($$('#totalj1').val()); 
      jugador2 = parseInt($$('#totalj2').val());
      if (jugador1 < jugador2){
        app.dialog.alert("Equipo ganador:" + nombre2);
      } else{
        app.dialog.alert("Equipo ganador:" + nombre1);
      }
      
    }

    function fnLimpiar (){
      $$('.numptos').val('-');
      $$('#nombre1').val();
      $$('#nombre2').val();
      mainView.router.navigate('/index/');
      console.log('funcionlimpiar')
    }

    
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log("vista index")
  $$('#btnJugar').on('click', fnTomarNombres);
});

function fnTomarNombres() {
  nombre1 = $$('#nombre1').val();
  nombre2 = $$('#nombre2').val();
  mainView.router.navigate('/juego/');
}