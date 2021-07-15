var firebaseConfig = {
    apiKey: "AIzaSyCpDBE4pHGMuMWIc9m3lMCHsxPpxCDUbOs",
    authDomain: "bingo-generator.firebaseapp.com",
    projectId: "bingo-generator",
    storageBucket: "bingo-generator.appspot.com",
    messagingSenderId: "491227835346",
    appId: "1:491227835346:web:885107eca39ca6b861360b",
    measurementId: "G-3P47X02M58"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function createBingo() {
    window.size = document.getElementById("bingo-size").value;
    
    var grid = document.getElementById("bingo-grid");
    grid.querySelectorAll('*').forEach(n => n.remove());
    
    var id = 0;

    for(let i = 0; i < size; i++) {
        var row = document.createElement("div");
        row.setAttribute("class", "bingo-grid-row");
        for(let j = 0; j < size; j++) {
            var child = document.createElement("div");
            var text = document.createElement("textarea");
            text.setAttribute("id", "element-" + id);
            // child.innerText = "I'm a child!";
            child.setAttribute("class", "bingo-grid-element");
            child.appendChild(text);
            row.appendChild(child);
            id++;
        }
        grid.appendChild(row);
    }
}

function generateBingo() {
    
    var bingoitems = [];

    for(let i = 0; i < window.size*window.size; i++){
        var item = document.getElementById("element-" + i).value;
        bingoitems.push(item);
    }

    shuffle(bingoitems);
    
    var newURL = generateURL(bingoitems);

    window.location.replace("bingo.html" + newURL)
    // console.log(bingoitems);
}

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

function generateURL(bingoitems) {
    var bingotext = "?" + bingoitems.reduce((acc, val, index) => {
        val = encodeURI(val).replaceAll('&','%26');
        return acc + "name-" + index + "=" + val + "&";
    }, "");
    return bingotext.slice(0, -1);
}

/////////////////////////////////////////////////

function parseUrl(){
    var url = window.location.href;
    var texts = [];
    texts = url.split('?',2)[1].split("&").map(x=>decodeURI(x).split(/=(.+)/)[1].replaceAll('%26', '&'));
    return texts;
}

function showBingo(){
    bingoelements = parseUrl();
    var id = 0;


    var grid = document.getElementById("bingo-grid");
    grid.querySelectorAll('*').forEach(n => n.remove());
    
    var size = Math.sqrt(bingoelements.length);

    window.isMarked = new Array(bingoelements.length).fill(0);

    for(let i = 0; i < size; i++) {
        var row = document.createElement("div");
        row.setAttribute("class", "bingo-grid-row");
        for(let j = 0; j < size; j++) {
            var child = document.createElement("div");
            var text = document.createElement("p");
            text.setAttribute("id", "element-" + id);
            text.innerText = bingoelements[id];
            child.setAttribute("class", "bingo-grid-element");
            child.setAttribute("onclick", `elementToggle(${id})`);
            child.appendChild(text);
            row.appendChild(child);
            id++;
        }
        grid.appendChild(row);
    }

}

function elementToggle(id){
    window.isMarked[id] = !window.isMarked[id];
    var bgcolor = window.isMarked[id] ? "blue" : "white" ;
    document.getElementById(`element-${id}`).parentElement.style.backgroundColor = bgcolor;  
}
