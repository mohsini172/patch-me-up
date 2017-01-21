var imgArr = [];        //array to keep track of the images which image is present in which block
var emptyCell = [0,1];  //location of empty place
var moves=0;            //total moves calculator



//the class for one small block of image array it has current image it cuurent location and correct location 

function block()
{
    this.currentCell = [-1,-1];                     //variables for keeping track of on block element
    this.img = document.getElementById("02");
    this.correctCell = [-2,-2];
    this.isCorrect = function()                     //function for checking if image is at its correct position or not
    {
        if(this.currentCell[0]==this.correctCell[0] && this.currentCell[1]==this.correctCell[1])
            return true;
        else
            return false;
    }
}


//function for checking if it won or not
function isWon()
{
    for(var i=0;i<3;i++)
    {
        for(var j=0;j<3;j++)
        {
            if(imgArr[i][j].isCorrect()==false)
                return false;
        }
    }
    return true;
}


//key pressing event
$(document).on('keydown', function(e) 
{
    
    keyCode = e.keyCode;
    if(!keyCode)
        keyCode=e.which;
    var X = emptyCell[0];
    var Y = emptyCell[1];
    if(keyCode==37)                 //left key pressed
    {
        var leftX = X+1;            //getting x cordinate of image left to empty cell
        var leftY = Y;
        if(leftX<3)                 //error handling if image is at its extreme position
        {
            //in this section I'm exchanging the image and correct loction of empty cell and left image object(block object above)
            var tmp = imgArr[X][Y].img.src;
            var tmp2 = imgArr[X][Y].correctCell;
            
            //simply exchange process
            imgArr[X][Y].img.src = imgArr[leftX][leftY].img.src;
            imgArr[X][Y].correctCell = imgArr[leftX][leftY].correctCell;
            
            imgArr[leftX][leftY].img.src = tmp;
            imgArr[leftX][leftY].correctCell = tmp2;
            
            emptyCell = [leftX,leftY];
            //one move increased
            moves++;
        }
    }
    //same as above
    else if(keyCode==39)
    {
        var rightX = X-1;
        var rightY = Y;
        if(rightX>=0 && X<3)
        {
            var tmp = imgArr[X][Y].img.src;
            var tmp2 = imgArr[X][Y].correctCell;
            
            imgArr[X][Y].img.src = imgArr[rightX][rightY].img.src;
            imgArr[X][Y].correctCell = imgArr[rightX][rightY].correctCell;
            
            imgArr[rightX][rightY].img.src = tmp;
            imgArr[rightX][rightY].correctCell = tmp2;
            
            
            emptyCell = [rightX,rightY];
            moves++;
        }
    }
        //same as above
    else if(keyCode==38) //upPressed
    {
        
        var downX = X;
        var downY = Y+1;
        if(downY<3)
        {
            var tmp = imgArr[X][Y].img.src;
            var tmp2 = imgArr[X][Y].correctCell;
            
            imgArr[X][Y].img.src = imgArr[downX][downY].img.src;
            imgArr[X][Y].correctCell = imgArr[downX][downY].correctCell;
            
            imgArr[downX][downY].img.src = tmp;
            imgArr[downX][downY].correctCell = tmp2;
            
            emptyCell = [downX,downY];
            moves++;
        }
    }
    
    //same as above
    else if(keyCode==40) //down pressed
    {
        var upX = X;
        var upY = Y-1;
        if(upY>=0)
        {
            var tmp = imgArr[X][Y].img.src;
            var tmp2 = imgArr[X][Y].correctCell;
            
            imgArr[X][Y].img.src = imgArr[upX][upY].img.src;
            imgArr[X][Y].correctCell = imgArr[upX][upY].correctCell;
            
            imgArr[upX][upY].img.src = tmp;
            imgArr[upX][upY].correctCell = tmp2;
            
            emptyCell = [upX,upY];
            moves++;
            
        }
    }
    //changing score
    document.getElementById("score").innerHTML = "Moves: "+moves;
    //checking if someone wins
    if(isWon()==true)
    {
        $("#myModal").modal();
        $("#Moves").text("Total Moves: "+moves);
    }
});


//on first run
function oncreate()
{
    //calling play dialog modal function to show the menu
    $("#playDialog").modal();
    
    //initializing the array
    for(var i=0; i < 3; i++)
    {
        imgArr[i] = [];
        for(var j=0; j < 3; j++)
        {
            imgArr[i][j] = new block();
            imgArr[i][j].currentCell = [i,j];
        }
    }
    
    //arranging the blocks of image in array
    imgArr[0][0].correctCell = [0,0];
    imgArr[0][0].img = document.getElementById("00");
    
    imgArr[1][0].correctCell = [1,0];
    imgArr[1][0].img = document.getElementById("01");
    
    imgArr[2][0].correctCell = [2,1];
    imgArr[2][0].img = document.getElementById("12");
    
    imgArr[0][1].correctCell = [2,0];
    imgArr[0][1].img = document.getElementById("02");
    
    imgArr[1][1].correctCell = [0,1];
    imgArr[1][1].img = document.getElementById("10");
    
    imgArr[2][1].correctCell = [2,2];
    imgArr[2][1].img = document.getElementById("22");
    
    imgArr[0][2].correctCell = [0,2];
    imgArr[0][2].img = document.getElementById("20");
    
    imgArr[1][2].correctCell = [1,1];
    imgArr[1][2].img = document.getElementById("11");
    
    imgArr[2][2].correctCell = [1,2];
    imgArr[2][2].img = document.getElementById("21");
}
//calling on create
oncreate();



var e = new KeyboardEvent("keydown", {
    bubbles : true,
    cancelable : true,
    char : "4",
    key : "4",
    shiftKey : true,
    keyCode : 37
});


//this function shuffling the whole matrix
var shuffleNo=0;
function setDiffculty(difficulty)
{
    for(var i=0;i<difficulty;i++)
    {
        var rand = Math.floor((Math.random() * 4)+37);
        $(document).trigger(jQuery.Event('keydown', {which: rand}));  
        moves=-1;
    }
}









