(()=>{

    const gameArea = document.querySelector(".gameArea");
    const startButton = document.querySelector("#start");
    const clearButton = document.querySelector("#clear");
    const gridSizeInput = document.querySelector("#gridSize");
    const playerInput1 = document.querySelector("#player1");
    const playerInput2 = document.querySelector("#player2");
    const scorePlayer1 = document.querySelector("#scorePlayer1");
    const scorePlayer2 = document.querySelector("#scorePlayer2");
    const currentPlayer = document.querySelector('#curPlayer');

    let player1Initial;
    let player2Initial;
    let player = '1';
    let player1Score = 0;
    let player2Score = 0;
    let gridSize;
    let box = [];

    const grader = ()=>{
        for (let i = 0; i<parseInt(gridSize/2)-1; i++){
            for(let k=0;k<gridSize; k++){
                // selecting dashes
                spanElem = document.querySelector(`#i${i}${k}`); 
                // a box with no names
                if(!spanElem.textContent){
                    // empty colored box that needs naming
                    if(box[i][k] == 4){
                        if(player == '1'){
                            spanElem.textContent = player1Initial;
                            player1Score+=1;
                        }else{
                            spanElem.textContent = player2Initial;
                            player2Score+=1;
                        }
                    }
                }
            }
        }
        

    };

    const incrementer= (event)=>{
        // a dash is clicked

        
        if(event.target.getAttribute('clickable') == "true"){
            // provided it wasn't clicked before

            let row = event.target.getAttribute('row'); // getting the row of the clicked dash
            let col = event.target.getAttribute("col"); // getting the col of the clicked dash

            // getting the numbers into array
            row = row.split('-'); 
            col = col.split('-');

            let intialScores = player1Score + player2Score;
            
            // adding the contribution to corresponding box
            if(row.length == 2){
                box[row[0]][col[0]] += 1;
                box[row[1]][col[0]] += 1;
            }else if(col.length == 2){
                box[row[0]][col[0]] += 1;
                box[row[0]][col[1]] += 1;
            }else{
                box[row[0]][col[0]] += 1;
            }
            grader(); // calling grader to create a box and 

            if(intialScores == (player1Score + player2Score)){
                if(player == '2'){
                    player = '1';
                    gameArea.style="background:lightblue";
                }else{
                    player = '2';  
                    gameArea.style="background:lightgreen";                
                }
            }

            event.target.classList.add('red');

            // displaying current player
            if(player == '1'){
                currentPlayer.textContent = player1Initial;
            }else{
                currentPlayer.textContent = player2Initial;
            }
            
            // displaying score of players
            scorePlayer1.textContent = player1Initial + ' : ' + player1Score;
            scorePlayer2.textContent = player2Initial + ' : ' + player2Score;
            
            event.target.setAttribute('clickable', false);
            event.target.classList.add("noHover");
        }
        
        // game ending rendering
        if(player1Score + player2Score >= Number(gridSize)*(parseInt(gridSize/2) - 1) ){
            gameArea.textContent  = '';
            if(player1Score>player2Score){
                gameArea.textContent  =`Player 1, ${player1Initial} wins. `  ;
            }else{
                gameArea.textContent  =`Player 2, ${player2Initial} wins. `  ;
            }
        }
        
    };

    const start = ()=>{
        clear();
        player1Initial = playerInput1.value[0] || 'A';
        player2Initial = playerInput2.value[0] || 'B';
        player2Initial = (player1Initial == player2Initial ? player2Initial + '2': player2Initial);
        gridSize =  gridSizeInput.value;
        
        gameArea.style = "background:lightblue";
        currentPlayer.textContent = player1Initial;
        scorePlayer1.textContent = player1Initial + ' : ' + player1Score;
        scorePlayer2.textContent = player2Initial + ' : ' + player2Score;

        for (let i = 0; i<parseInt(gridSize/2); i++){
            box.push([]);
            for(let k=0;k<gridSize; k++){
                box[i][k] = 0;
            }
        }
        
        renderGameBoard();
    };

    const renderGameBoard = ()=>{
        let j = 0;
        let row = document.createElement("DIV");
        row.className = "row";

        let dot = document.createElement("SPAN");
        dot.className = "dot";

        let dash = document.createElement("SPAN");
        dash.className = "horizontal-line";

        let verline = document.createElement("SPAN");
        verline.className = "vertical-line";

        let space = document.createElement("SPAN");
        space.className = "white-space";

        let boxIndex = [0,0];
        let rowCount = 0;
        for (let i =0; i<gridSize; i++){
            let newRow = row.cloneNode(true);
            if(j%2==0){
                newRow.style="height:15px;";
                for(let k = 0; k < gridSize; k++){
                    newRow.appendChild(dot.cloneNode(true));
                    copyDash = dash.cloneNode(true);
                    copyDash.setAttribute("col", k);

                    // indexing dashes according to the box they contribute to
                    // for example, Horizontal line contributes to two boxes if in middle or 
                    // one if in the corner. so, row = a, col = b,c. meaning box in row a, and b, and
                    // column c. (a,c) and (b, c);
                    if( rowCount!=0 && rowCount+1 != parseInt(gridSize/2) ){
                        copyDash.setAttribute("row", (rowCount-1) + '-' + (rowCount) );
                    }else{
                        if( rowCount-1 < 0 ){
                            copyDash.setAttribute("row",rowCount );
                        }else{
                            copyDash.setAttribute("row", rowCount-1 );
                        }
                        copyDash.setAttribute("row", (rowCount-1 < 0 ? rowCount:rowCount-1) );
                    }

                    copyDash.setAttribute("clickable", true);
                    copyDash.addEventListener("click", (event)=>(incrementer(event)));
                    newRow.appendChild(copyDash);
                }
                newRow.appendChild(dot.cloneNode(true));
                gameArea.appendChild(newRow);
            }else if(i != gridSize-1){
                boxIndex[1] = 0;
                for(let k = 0; k < gridSize; k++){
                    copyVerline = verline.cloneNode(true);
                    copyVerline.setAttribute("row", rowCount);

                    // indexing dashes according to the box they contribute to
                    // for example, vertical line contributes to two boxes if in middle or 
                    // one if in the corner. so, row = a, col = b,c. meaning box in row a, and
                    // column b, and c. (a,b) and (a, c);
                    if(k!=0){
                        copyVerline.setAttribute("col", (k-1) + '-' + (k) );
                    }else{
                        copyVerline.setAttribute("col", k);
                    }
                    copyVerline.setAttribute("clickable", true);
                    copyVerline.addEventListener("click", (event)=>(incrementer(event)));
                    newRow.appendChild(copyVerline);

                    
                    copySpace = space.cloneNode(true );
                    // indexing empty boxes for later access
                    copySpace.id = `i${boxIndex[0]}${boxIndex[1]}`;
                    newRow.appendChild(copySpace);
                    boxIndex[1]+=1;
                }
                copyVerline = verline.cloneNode(true);
                copyVerline.setAttribute("row", rowCount);
                copyVerline.setAttribute("col", gridSize-1);
                copyVerline.setAttribute("clickable", true);
                copyVerline.addEventListener("click", (event)=>(incrementer(event)));
                newRow.appendChild(copyVerline);
                gameArea.appendChild(newRow);
                rowCount ++;
                boxIndex[0]+=1;
            }
            
            j++;
        }
    };

    
    const clear = ()=>{
        gameArea.textContent  ='';
        gameArea.style = "background:white";
        scorePlayer1.textContent='';
        scorePlayer2.textContent='';
        box = [];
        player = '1';
        player1Score = 0;
        player2Score = 0;

    }

    startButton.addEventListener("click",start);
    clearButton.addEventListener("click",clear);
    gridSizeInput.addEventListener("input",start);

    gridSizeInput.max = parseInt(innerWidth/60); // browser-width / 60
    gridSizeInput.min = 8;



})();


