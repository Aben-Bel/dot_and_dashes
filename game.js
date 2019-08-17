(()=>{
    const gameArea = document.querySelector(".gameArea");
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
                spanElem = document.querySelector(`#i${i}${k}`);
                if(!spanElem.textContent){
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
        if(event.target.getAttribute('clickable') == "true"){
            let row = event.target.getAttribute('row');
            let col = event.target.getAttribute("col");

            row = row.split('-');
            col = col.split('-');

            let intialScores = player1Score + player2Score;
            
            if(row.length == 2){
                box[row[0]][col[0]] += 1;
                box[row[1]][col[0]] += 1;
            }else if(col.length == 2){
                box[row[0]][col[0]] += 1;
                box[row[0]][col[1]] += 1;
            }else{
                box[row[0]][col[0]] += 1;
            }
            grader();

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


            if(player == '1'){
                document.querySelector('#curPlayer').textContent = player1Initial;
            }else{
                document.querySelector('#curPlayer').textContent = player2Initial;
            }
            document.querySelector("#scorePlayer1").textContent = player1Initial + ' : ' + player1Score;
            document.querySelector("#scorePlayer2").textContent = player2Initial + ' : ' + player2Score;
            
            event.target.setAttribute('clickable', false);
        }
        
        if(player1Score + player2Score >= Number(gridSize)*(parseInt(gridSize/2) - 1) ){
            gameArea.textContent  = '';
            if(player1Score>player2Score){
                gameArea.textContent  =`Player 1, ${player1Initial} wins. `  ;
            }else{
                gameArea.textContent  =`Player 2, ${player2Initial} wins. `  ;
            }
        }
        
    };

    const startButton = ()=>{
        clear();
        player1Initial = document.querySelector("#player1").value[0] || 'A';
        player2Initial = document.querySelector("#player2").value[0] || 'B';
        player2Initial = (player1Initial == player2Initial ? player2Initial + '2': player2Initial);
        let size = document.querySelector("#gridSize").value || 16;
        gridSize =  (size <= 32 ? size :  32);

        document.querySelector('#gridSize').textContent=gridSize;
        gameArea.style = "background:lightblue";
        document.querySelector('#curPlayer').textContent = player1Initial;
        document.querySelector("#scorePlayer1").textContent = player1Initial + ' : ' + player1Score;
        document.querySelector("#scorePlayer2").textContent = player2Initial + ' : ' + player2Score;

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
                    copyDash.setAttribute("row", ( rowCount!=0 && rowCount+1 != parseInt(gridSize/2)? (rowCount-1) + '-' + (rowCount) : (rowCount-1 < 0 ? rowCount:rowCount-1) ));
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
                    copyVerline.setAttribute("col", ( k!=0? (k-1) + '-' + (k) : k ) );
                    copyVerline.setAttribute("clickable", true);
                    copyVerline.addEventListener("click", (event)=>(incrementer(event)));
                    newRow.appendChild(copyVerline);

                    copySpace = space.cloneNode(true );
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

    clear = ()=>{
        gameArea.textContent  ='';
        document.querySelector('#scorePlayer1').textContent='';
        document.querySelector('#scorePlayer2').textContent='';
        box = [];
        player = '1';
        player1Score = 0;
        player2Score = 0;

    }

    document.querySelector("#start").addEventListener("click",startButton);
    document.querySelector("#clear").addEventListener("click",clear);
    document.querySelector("#gridSize").addEventListener("input",startButton);


})();


