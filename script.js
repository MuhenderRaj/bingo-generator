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
    
    generateURL(bingoitems);
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
        return acc + "name-" + index + "=" + encodeURI(val) + "&";
    }, "");
    console.log(bingotext);
    return bingotext;
}