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

function generateURL(bingoitems) {
    var bingotext = "?" + bingoitems.reduce((acc, val, index) => {
        val = encodeURI(val).replaceAll('&','%26');
        return acc + "name-" + index + "=" + val + "&";
    }, "");
    return "bingo.html"+bingotext.slice(0, -1);
}

function generateBingo() {
    var bingoitems = [];
    for(let i = 0; i < window.size*window.size; i++){
        var item = document.getElementById("element-" + i).value;
        bingoitems.push(item);
    }
    bingoitems = shuffle(bingoitems);
    return generateURL(bingoitems);
}

function goToBingo(){
    newURL = generateBingo()
    window.location.replace(newURL)
}

function shareBingo(){
    locationURL =  window.location.href.replace(/[^/]*$/, '')
    shareURL = locationURL+generateBingo()
    console.log(shareURL) 
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

/////////////////////////////////////////////////

function parseUrl(){
    var url = window.location.href;
    var texts = [];
    texts = url.split('?',2)[1].split("&").map(x=>decodeURI(x).split(/=(.+)/)[1].replaceAll('%26', '&'));
    if(! ("hasSeen" in localStorage)){
        texts = shuffle(texts);
        localStorage.hasSeen = true;
        for(let i = 0; i < texts.length; i++){
            localStorage.setItem(`item-${i}`, texts[i]);
        }
    }
    return texts.length
}

function showBingo(){
    var bingoSize = parseUrl();
    var bingoElements = [];

    for(let i=0; i<bingoSize; i++){
        bingoElements.push(localStorage.getItem(`item-${i}`));
    }

    var id = 0;

    var grid = document.getElementById("bingo-grid");
    grid.querySelectorAll('*').forEach(n => n.remove());
    
    var size = Math.sqrt(bingoElements.length);

    window.isMarked = new Array(bingoElements.length).fill(0);

    for(let i = 0; i < size; i++) {
        var row = document.createElement("div");
        row.setAttribute("class", "bingo-grid-row");
        for(let j = 0; j < size; j++) {
            var child = document.createElement("div");
            var text = document.createElement("p");
            text.setAttribute("id", "element-" + id);
            text.innerText = bingoElements[id];
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
