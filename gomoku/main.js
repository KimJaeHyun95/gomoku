class Board {
    grid;
    reset() {
        this.grid = this.getEmptyBoard();
    }
    getEmptyBoard() {
        return Array.from(
        {length: ROWS}, () => Array(COLS).fill(0)
        );
    }
} 

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvas_turn = document.getElementById('circle');
const ctx_turn = canvas_turn.getContext('2d');
const COLS = 40;
const ROWS = 40;
const BLOCK_SIZE = 20;
let board = new Board();
let x = 20;
let y = 20;
let turn = true;
let count = 0;
let his_x= new Array();
let his_y= new Array();




$(drawBoard())


function play(){
    $('#play-btn').css('display','none');
    $('.button').css('display','inline');
    board.reset();
    x=20;
    y=20;
    turn=true;
    draw();
    bgm.play();
}

function before(){
    if(count==0){
        return;
    }
    if(turn){
        count--;
        turn=false;
        board.grid[his_x.pop()][his_y.pop()]=0;
        draw();
    }else{
        count--;
        turn=true;
        board.grid[his_x.pop()][his_y.pop()]=0;
        draw();
    }
}

function decideWinner(){
    if(turn){
        alert("whtie win");
    }else{
        alert("black win");
    }
    his_x=[];
    his_y=[];
    reset();
}

function reset(){
    turn=true;
    board.reset();
    draw();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPoint();
    drawSign();
    drawTurn();
}


function drawBoard(){
    ctx.beginPath();
    for(let i=1; i<40;i+=1){
        ctx.moveTo(i*BLOCK_SIZE,BLOCK_SIZE);
        ctx.lineTo(i*BLOCK_SIZE, 780);
        ctx.moveTo(BLOCK_SIZE,i*BLOCK_SIZE);
        ctx.lineTo(780, i*BLOCK_SIZE);
    }
    ctx.stroke();
}

function drawPoint(){
    for(let i=1; i<40;i+=1){
        for(let j=1; j<40;j+=1){
            if(board.grid[i][j]==1){
                ctx.beginPath();
                ctx.arc(i*BLOCK_SIZE, j*BLOCK_SIZE, 8, 0, 2.0 * Math.PI, false); 
                ctx.fillStyle = "black";
                ctx.fill();
            }else if(board.grid[i][j]==-1){
                ctx.beginPath();
                ctx.arc(i*BLOCK_SIZE, j*BLOCK_SIZE, 8, 0, 2.0 * Math.PI, false); 
                ctx.strokeStyle = "#000";
                ctx.stroke();
                ctx.fillStyle = "white";
                ctx.fill();
            }
        }
    }
}

function drawSign(){
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.moveTo(x*BLOCK_SIZE, y*BLOCK_SIZE-7);
    ctx.lineTo(x*BLOCK_SIZE+7, y*BLOCK_SIZE-15);
    ctx.lineTo(x*BLOCK_SIZE-7, y*BLOCK_SIZE-15);
    ctx.fill();
}

function drawTurn(){
    if(turn){
        ctx_turn.beginPath();
        ctx_turn.arc(50,50, 45, 0, 2.0 * Math.PI, false); 
        ctx_turn.fillStyle = "black";
        ctx_turn.fill();
    }else{
        ctx_turn.beginPath();
        ctx_turn.arc(50,50, 45, 0, 2.0 * Math.PI, false); 
        ctx_turn.strokeStyle = "#000";
        ctx_turn.stroke();
        ctx_turn.fillStyle = "white";
        ctx_turn.fill();
    }
}

function put(){
    if(turn){
        board.grid[x][y]=1;
        turn=false;
    }else{
        board.grid[x][y]=-1;
        turn=true;
    }
    audio.play();
    count++;
    his_x.push(x);
    his_y.push(y);
}

function cantdo(){
    for(let i=-1; i<2;i++){
        for(let j=-1; j<2;j++){
            if(i==0 && j==0){
                continue;
            }
            if(board.grid[x][y]==board.grid[x+1*i][y+1*j] && board.grid[x][y]==board.grid[x+2*i][y+2*j] && 0 == board.grid[x-i][y-j] && 0 ==board.grid[x+3*i][y+3*j]){
                for(let k=-1; k<2;k++){
                    for(let l=-1; l<2;l++){
                        if(i==0 && j==0){
                            continue;
                        }
                        if(i==k && j==l){
                            continue;
                        }
                        if(board.grid[x][y]==board.grid[x+1*k][y+1*l] && board.grid[x][y]==board.grid[x+2*k][y+2*l] && 0 == board.grid[x-k][y-l] && 0 ==board.grid[x+3*k][y+3*l]){
                            alert("그 자리에는 둘 수 없습니다.");
                            before();
                            return;
                        }
                    }
                }
            }
            if(board.grid[x][y]==board.grid[x+1*i][y+1*j]  && board.grid[x][y]==board.grid[x-i][y-j] && 0==board.grid[x-2*i][y-2*j] && 0 ==board.grid[x+2*i][y+2*j]){
                for(let k=-1; k<2;k++){
                    for(let l=-1; l<2;l++){
                        if(i==0 && j==0){
                            continue;
                        }
                        if(i==k && j==l){
                            continue;
                        }
                        if(board.grid[x][y]==board.grid[x+1*k][y+1*l] && board.grid[x][y]==board.grid[x+2*k][y+2*l] && 0 == board.grid[x-k][y-l] && 0 ==board.grid[x+3*k][y+3*l]){
                            alert("그 자리에는 둘 수 없습니다.");
                            before();
                            return;
                        }
                    }
                }
            }
        }
    }
}

function isGAMEOVER(){
    for(let i=-1; i<2;i++){
        for(let j=-1; j<2;j++){
            if(i==0 && j==0){
                continue;
            }
            if(board.grid[x][y]==board.grid[x+i][y+j] && board.grid[x][y]==board.grid[x+2*i][y+2*j] && board.grid[x][y]==board.grid[x+3*i][y+3*j] && board.grid[x][y]==board.grid[x+4*i][y+4*j]&& board.grid[x][y]==board.grid[x+5*i][y+5*j]){
                continue;
            }
            if(board.grid[x][y]==board.grid[x+i][y+j] && board.grid[x][y]==board.grid[x+2*i][y+2*j] && board.grid[x][y]==board.grid[x+3*i][y+3*j] && board.grid[x][y]==board.grid[x+4*i][y+4*j]&& board.grid[x][y]==board.grid[x-i][y+-j]){
                continue;
            }
            if(board.grid[x][y]==board.grid[x+i][y+j] && board.grid[x][y]==board.grid[x+2*i][y+2*j] && board.grid[x][y]==board.grid[x+3*i][y+3*j] && board.grid[x][y]==board.grid[x-i][y-j]&& board.grid[x][y]==board.grid[x-2*i][y-2*j]){
                continue;
            }
            if(board.grid[x][y]==board.grid[x-i][y-j] && board.grid[x][y]==board.grid[x-2*i][y-2*j] && board.grid[x][y]==board.grid[x-3*i][y-3*j] && board.grid[x][y]==board.grid[x-4*i][y-4*j]&& board.grid[x][y]==board.grid[x-5*i][y-5*j]){
                continue;
            }
            if(board.grid[x][y]==board.grid[x-i][y-j] && board.grid[x][y]==board.grid[x-2*i][y-2*j] && board.grid[x][y]==board.grid[x-3*i][y-3*j] && board.grid[x][y]==board.grid[x-4*i][y-4*j]&& board.grid[x][y]==board.grid[x+i][y+j]){
                continue;
            }
            if(board.grid[x][y]==board.grid[x-i][y-j] && board.grid[x][y]==board.grid[x-2*i][y-2*j] && board.grid[x][y]==board.grid[x-3*i][y-3*j] && board.grid[x][y]==board.grid[x+i][y+j]&& board.grid[x][y]==board.grid[x+2*i][y+2*j]){
                continue;
            }
            if(board.grid[x][y]==board.grid[x+1*i][y+1*j] && board.grid[x][y]==board.grid[x+2*i][y+2*j] && board.grid[x][y]==board.grid[x+3*i][y+3*j] && board.grid[x][y]==board.grid[x+4*i][y+4*j]){
                decideWinner();
                continue;
            }
            if(board.grid[x][y]==board.grid[x+1*i][y+1*j] && board.grid[x][y]==board.grid[x+2*i][y+2*j] && board.grid[x][y]==board.grid[x+3*i][y+3*j] && board.grid[x][y]==board.grid[x-i][y-j]){
                decideWinner();
                continue;
            }
            if(board.grid[x][y]==board.grid[x+1*i][y+1*j] && board.grid[x][y]==board.grid[x+2*i][y+2*j] && board.grid[x][y]==board.grid[x-i][y-j] && board.grid[x][y]==board.grid[x-2*i][y-2*j]){
                decideWinner();
                continue;
            }
        }
    }
}


window.addEventListener('keydown', event => {
    if (event.keyCode == '37') {
        if(x==1){
            return;
        }
        x-=1;
        draw();
    }
    else if (event.keyCode == '39') {
        if(x==39){
            return;
        }
        x+=1;
        draw();
    }else if (event.keyCode == '38') {
        if(y==1){
            return;
        }
        y-=1;
        draw();
    }
    else if (event.keyCode == '40') {
        if(y==39){
            return;
        }
        y+=1;
        draw();
    }
    else if (event.keyCode == '32') {
        if(board.grid[x][y]!=0){
            return;
        }
        put();
        draw();
        cantdo();
        isGAMEOVER();
    }
})