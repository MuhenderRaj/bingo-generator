function createBingo(){
    var size = document.getElementById("bingo-size").value;
    var child = document.createElement("div");
    child.innerText = "I'm a child!";
    
    var grid = document.getElementById("bingo-grid");
    grid.querySelectorAll('*').forEach(n => n.remove());
    for( let i =0 ; i < size; i++){
        var row = document.createElement("div");
        child.setAttribute("class", "bingo-grid-row");
        for(let j = 0; j < size; j++){
            var child = document.createElement("div");
            child.innerText = "I'm a child!";    
            child.setAttribute("class", "bingo-grid-element");
            row.appendChild(child);
        }
        grid.appendChild(row);
    }
}