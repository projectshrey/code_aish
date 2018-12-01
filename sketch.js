var numBalls = 1300;
var spring = 0.035;
var gravity = 0.015;
var friction = -0.;
var balls = [];

function setup() {
 createCanvas(720, 400);
 for (var i = 0; i < numBalls; i++) {
   balls[i] = new Ball(
     random(width),
     random(height),
     random(31, 05, 03, 01, 10, 30),
     i,
     balls
   );
 }
 noStroke();
 fill(40, 255, 205, 94, 61, 40);
}


function draw() {
 background(59, 36, 150);
	 balls.forEach(ball => {
   ball.collide();
   ball.move();
   ball.display();
 });
}
	

function Ball(xin, yin, din, idin, oin) {
 this.x = xin;
 this.y = yin;
 var vx = 100;
 var vy = 20;
 this.diameter = din;
 this.id = idin;
 this.others = oin;

 this.collide = function() {
   for (var i = this.id + 1; i < numBalls; i++) {
     // console.log(others[i]);
     var dx = this.others[i].x - this.x;
     var dy = this.others[i].y - this.y;
     var distance = sqrt(dx * dx + dy * dy);
     var minDist = this.others[i].diameter / 5 + this.diameter / 2;
     //   console.log(distance);
     //console.log(minDist);
     if (distance < minDist) {
       //console.log("2");
       var angle = atan2(dy, dx);
       var targetX = this.x + cos(angle) * minDist;
       var targetY = this.y + sin(angle) * minDist;
       var ax = (targetX - this.others[i].x) * spring;
       var ay = (targetY - this.others[i].y) * spring;
       vx -= ax;
       vy -= ay;
       this.others[i].vx += ax;
       this.others[i].vy += ay;
     }
   }
 };

	function insertText () {
    document.getElementById('td1').innerHTML = "Some text to enter";
}
	
 this.move = function() {
   vy += gravity;
   this.x += vx;
   this.y += vy;
   if (this.x + this.diameter / 2 > width) {
     this.x = width - this.diameter / 2;
     vx *= friction;
   } else if (this.x - this.diameter / 2 < 0) {
     this.x = this.diameter / 2;
     vx *= friction;
   }
   if (this.y + this.diameter / 2 > height) {
     this.y = height - this.diameter / 2;
     vy *= friction;
   } else if (this.y - this.diameter / 2 < 0) {
     this.y = this.diameter / 2;
     vy *= friction;
   }
 };

 this.display = function() {
   ellipse(this.x, this.y, this.diameter, this.diameter);
 };
}