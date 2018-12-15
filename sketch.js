var x = 700;
var y = 800;
var X = 375;
var Y = 600;
var speed = 50; 
var counter = 10;
var move = true; 
var sign = 1;
var Dist = 4; 
var song; 
var honk; 

function preload (){
car = loadImage('image.png');
streetsign = loadImage('5thAve.png');
streetpic = loadImage ('background.jpg');
song = loadSound ("Ambience_-_Busy_Street_Road.mp3");
honk = loadSound ("honk.mp3");
}
function setup() {
	createCanvas(1000,1000);
	background(streetpic);
	colorMode(RGB);
	streetsign.resize(300,0);
	myRed = new redlight();
	myYellow = new yellowlight();
	myGreen = new greenlight ();
	song.play();
}
function draw () {
	
	background(255,255, 255,45);
	building(375,600);
	building(100,600);
	building(650,600);
	building(500,600);
	building(250,600);
	//building(50,600);
	// traffic light 
	rect(0,200, 70, 160); 
	myRed.display(20);
	myYellow.display(20);
	myGreen.display (20);
	image(car,x-counter,y);
	image(streetsign, 300,200);
	if (move) { 
		counter = counter + sign*Dist; 
	}
	if (counter>900 || counter<0) {
		sign = sign*-1; 
	}
}
function building(X,Y) {
	noStroke ();
	fill(210,180,140)
	rect(X, Y, 100, 700,10); /// left 1 
	rect(X+25,Y-50, 100, 700,10); /// left 2 
	rect(X+50,Y-100, 100, 700,10); /// middle 
	rect(X+50,Y,100,100,10);
	rect(X+75,Y-50, 100, 700,10); ///right 2 
	rect(X+100,Y,100, 700,10); ///right 1 
	fill (105,105,105,40);
	rect (X+35,Y,50,50,10);
	rect (X+35,Y+150, 50,50,10);
	rect (X+35,Y+300, 50,50,10);
	rect (X+115,Y,50,50,10);
	rect (X+115,Y+150, 50,50,10);
	rect (X+115,Y+300, 50,50,10);
}
function redlight() {
	this.Time = 0;
	this.On = false;
	this.X = 35;
	this.Y = 230;
	this.size = 50;
	
	this.display = function(T) {
		this.Time = (this.Time+T)%400;
		if (this.On == true) {
			 if (this.Time <200) {
	         fill(255,0,0,100);
			 } else {
				 fill(255,0,0,40);
	 }
				 
		} else {
		   fill(128,0,0,40);
		}
	  ellipse(this.X,this.Y,this.size,this.size);
	}
	
	this.hitcheck = function(){
		if(dist(mouseX,mouseY,this.X,this.Y) <= 25){
			move = false;
			flag = 1
			this.On = true;
			honk.play();
		} else {
			this.On = false;
			honk.stop();
		}
			
	}
}
function yellowlight(){
	this.Time = 0;
	this.On = false;
	this.X = 35;
	this.Y = 280;
	this.size = 50;
	
	this.display = function(T) {
		this.Time = (this.Time+T)%400;
		if (this.On == true) {
			 if (this.Time <200) {
	         fill(255,253,0,100);
			 } else {
				 fill(255,253,0,40);
	 }
				 
		} else {
		   fill(255,253,0,40);
		}
	  ellipse(this.X,this.Y,this.size,this.size);
	}
	
	this.hitcheck = function(){
		if(dist(mouseX,mouseY,this.X,this.Y) <= 25){
			move = true;
			sign = sign/2;
			flag = 1
			this.On = true;
		} else {
			this.On = false;
		}	
	}
}	
function greenlight(){
	this.Time = 0;
	this.On = false;
	this.X = 35;
	this.Y= 330;
	this.size = 50;
	
	this.display = function(T) {
		this.Time = (this.Time+T)%400;
		if (this.On == true) {
			 if (this.Time <200) {
	         fill(0,253,0,100);
			 } else {
				 fill(0,253,0,40);
	 } 
		} else {
		   fill(0,253,0,40);
		}
	  ellipse(this.X,this.Y,this.size,this.size);
	}
	
	this.hitcheck = function(){
		if(dist(mouseX,mouseY,this.X,this.Y) <= 25){
			move = true;
			sign = 1; 
			this.On = true;
		} else {
			this.On = false;
		}
			
	}
}
/*function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    x = x - speed;
  } else if (keyCode === RIGHT_ARROW) {
    x = x + speed;
  }
}*/
function mousePressed (){
	myRed.hitcheck()
	myYellow.hitcheck()
	myGreen.hitcheck()
}
