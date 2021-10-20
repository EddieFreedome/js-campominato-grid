/*
- avere una select che permette di scegliere fra 3 difficoltà
  - in base alla difficoltà scelta, dobbiamo disegnare PIU' o MENO celle / quadratini
- vicino al select, dobbiamo creare un pulsante.
  - al click: (event listener)
    - Leggiamo il livello scelto dall'utente
    - In base al livello scelto, andiamo a generare e stampare in html la nostra griglia
      - questa dovrà tenere conto della scelta dell'utente
        per stampare il numero corretto di celle.
    
- una volta creata la griglia con le singole celle, al click su ogni cella,
  dobbiamo cambiare il suo colore.
*/

//cliccando il pulsante play subentrano altre variabili: 
// un livello che verra' generato in base alla scelta della difficolta', il numero delle Celle, e le bombe


const difficolta = document.getElementById("difficulties")
const playButton = document.getElementById("play")
const squareContainer = document.querySelector(".square-container")

//dopo aver flaggato il livello scelto, con il click facciamo leggere il valore che assume il livello
//scelta livello
playButton.addEventListener("click", function(event){
  event.preventDefault();
  const level = difficolta.value; //value restituisce qualsiasi tipo sia di valore della variabile

  //una volta letta la difficolta' scelta dovra' essere creato il numero di celle corrispondenti alla difficolta'
  /*celle da creare*/ /*=*/ /*generatorecelletotali che sceglie in base alla difficolta'*/
  const celleTotali = generaNumeroCelle(level);
  console.log(level)
  console.log(celleTotali) //ho asssunto il valore sottoforma di variabile del numero delle celle
  //ho bisogno ora di generare la griglia corrispondente al numero di celle
  generaGriglia(celleTotali);
  console.log("l'utente ha scelto il livello", level);
  console.log(`dovranno essere create ${celleTotali} celle.`);
});

const square = document.createElement("div")

//Funzioni: 
function generaNumeroCelle (level){
  let result; //creo variabile casistiche da restituire

  switch (parseInt(level)) {
    case 1: //easy 100 celle
      result = 100;
      break;
    case 2: //medium 81 celle
      result = 81;
      break;
    case 3: //hard 49 celle
      result = 49;
      break;
    }  
    
  return result;
}

function generaGriglia(celleTotali) {
    // Resetto tutto il contenuto dello .square-container
    squareContainer.innerHTML = "";
    //calcolo la radice quadrata del numero di celle totali, visivamente si
    //traduce in un'area distribuita di 10 celle per riga x 10 celle per riga
    const perRowCells = Math.sqrt(celleTotali);
    console.log(celleTotali)
    //posto che ci son 10 celle per riga, quali dimensioni dovranno avere?
    //1 cella = 100% / numeroCelle per riga!
    const cellSize = 100 / perRowCells;
    console.log(perRowCells)
    //trovato il numero di celle per riga e la dimensione che devono occupare,
    // Creo un ciclo in base al numero di celle da creare
    for (let i = 0; i < celleTotali; i++) {
      // genero una singola cella per volta fino al numero indicato dalla variabile
      const cella = generaCellaSingola(i, cellSize); //**
  
      // Aggiungo la cella al squareContainer
      //squareContainer.innerHTML += cell;
      squareContainer.append(cella);
    }
//append.(cella) dopo aver creato tutte le celle div con create element
}

function generaCellaSingola(i, cellSize){ //**
    //anziche' creare una variabile Cella e scrivergli con il template `div class, style ecc..`
    //creo una cella "div" con createElement e la andro' 
    //ad appendere e stilizzare poi aggiungendo classi nel corso della funzione.
    const cella = document.createElement("div");
    //aggiungo lo stile css alla cella aggiungendole la classe corrispondente in css
    //senza dimensioni! la larghezza e l'altezza vanno generate con valori
    //non statici in base alla richiesta: ...style inline?
    cella.classList.add("square"); //aggiunto classe stile .square dal css
    //servono dimensioni ora con style inline che cambia in base alla cellSize stabilita prima
    //aggiungo il % come stringa per "falsare" la lettura del valore numerico e ingannarlo a leggerlo come percentuale
    cella.style.width = cellSize + "%";
    cella.style.height = cellSize + "%";
    

    //----- non ho capito ---// E' una variabile innestata?
    //E' una sostituzione di variabile/dichiarazione di una variabile/innesto?: cella con numeroCella/ numeroCella dentro cella
    // cell.numeroCella = i + 1;
    //come con numeroCella.innerHTML = ?

    //lego ogni cella generata ad un indice numerico, ad un numero che indica il n. di cella
    cella.numeroCella = [i + 1];
    //ad ogni click su cella viene attivata una classe di stile css per stilizzarla da cliccata
    cella.addEventListener("click", onSingleCellClick); //funzione adhoc richiamata
    
    //Arrow Function: 
    // cella.addEventListener("click", () => onSingleCellClick(i + 1, cell));

    //Funzione normale
    /*   cella.addEventListener("click", function () {
        this.classList.toggle("clicked");
    
        console.log("clickata cella #" + (i + 1));
      }); */
  
  
    cella.textContent = i + 1;
  return cella;
  }

function onSingleCellClick (){
  //quando clicco la cella, aggiungi classi active, se la ha gia' va tolta
  this.classList.toggle("clicked");
}