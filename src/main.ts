import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyCYMgsV8GEJZIaD5v5VthLHxdNddKHfsus",
  authDomain: "party-tetris.firebaseapp.com",
  projectId: "party-tetris",
  storageBucket: "party-tetris.appspot.com",
  messagingSenderId: "798712934141",
  appId: "1:798712934141:web:581245907525aebe3b5894"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {

  } else {

  }
});

signInAnonymously(auth).catch((error) => {
  console.error(error);
});

// // Write TypeScript code!
// const appDiv = <HTMLElement> document.getElementById('app');

// const canvas = document.createElement("canvas");
// const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

// let height = 20;
// let width = 10;
// const ts = 20;

// function resize() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   ctx.translate(Math.floor(canvas.width/2-width*ts/2), Math.floor(canvas.height/2-height*ts/2));
// }
// window.addEventListener("resize", resize);
// resize();

// appDiv.appendChild(canvas);

// let matrix: number[][] = [];

// for (let i = 0; i < width; i++) {
//   matrix[i] = [];
//   for (let j = 0; j < height+20; j++) {
//     matrix[i][j] = 0;
//   }
// }

// const offsets = [
//   [],
//   [[0,0],[1,0],[0,1],[-1,1]],
//   [[0,0],[-1,0],[1,0],[1,1]],
//   [[.5,.5],[-.5,.5],[-.5,-.5],[.5,-.5]],
//   [[0,0],[-1,0],[0,1],[1,1]],
//   [[-1.5,.5],[-.5,.5],[.5,.5],[1.5,.5]],
//   [[0,0],[-1,0],[1,0],[-1,1]],
//   [[0,0],[-1,0],[1,0],[0,1]],
// ];

// const kick: {[index: number]: number[][]} = {
//   0: [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],
//   3: [],
//   5: [[0,0],[-2,0],[1,0],[-2,-1],[1,2]],
// };

// class Tetromino {
//   x: number;
//   y: number;
//   type: number;
//   rotation: number = 0;
//   round = true;
//   timer = 0;
//   constructor(type: number, x: number, y: number, round?: boolean) {
//     this.x = x;
//     this.y = y;
//     this.type = type;
//     if (round != undefined) this.round = round;
//   }
//   getCoords(): {x: number, y: number}[] {
//     if (this.rotation < 0) {
//       this.rotation = 4-Math.abs(this.rotation%4);
//     }
//     const list = [];
//     const coords = offsets[this.type];
//     for (let i = 0; i < coords.length; i++) {
//       let x: number, y: number;
//       if (this.rotation%2 == 1) {
//         x = coords[i][1];
//         y = coords[i][0];
//       } else {
//         x = coords[i][0];
//         y = coords[i][1];
//       }
//       if (this.rotation%4 == 1 || this.rotation%4 == 2) y=-y;
//       if (this.rotation%4 == 2 || this.rotation%4 == 3) x=-x;
      
//       if (this.round) {
//         list.push({x: Math.ceil(x)+this.x, y: Math.ceil(y)+this.y});
//       } else {
//         list.push({x: x+this.x, y: y+this.y});
//       }
//     }

//     return list;
//   }
//   draw(color?: string) {
//     const coords = this.getCoords();
//     for (let i = 0; i < coords.length; i++) {
//       ctx.fillStyle = color || colors[this.type];
//       ctx.fillRect((coords[i].x)*ts, (height-coords[i].y-1)*ts, ts, ts);
//     }
//   }
//   colliding(): boolean {
//     const coords = this.getCoords();
//     // console.log(coords);
//     for (let i = 0; i < coords.length; i++) {
//       if (!matrix[coords[i].x] || matrix[coords[i].x][coords[i].y] != 0) {
//         return true;
//       }
//     }
//     return false;
//   }
//   move(x: number, y: number) {
//     for (let i = 0; i < Math.abs(x); i++) {
//       this.x += Math.sign(x);
//       if (this.colliding()) {
//         if (i!=0) this.timer = 0;
//         this.x -= Math.sign(x);
//         return;
//       };
//     }
//     for (let i = 0; i < Math.abs(y); i++) {
//       this.y += Math.sign(y);
//       if (this.colliding()) {
//         this.y -= Math.sign(y);
//         return;
//       }
//     }
//   }
//   place() {
//     this.move(0, -this.y-1);
//     const coords = this.getCoords();
//     for (let i = 0; i < coords.length; i++) {
//       matrix[coords[i].x][coords[i].y] = this.type;
//     }
//     this.type = queue.pop() as number;
//     queue.splice(0, 0, getBag());
//     this.x = 4;
//     this.y = 21;
//     this.rotation = 0;

//     for (let i = 0; i < height; i++) {
//       let check = true;
//       for (let j = 0; j < width; j++) {
//         if (matrix[j][i] == 0) {
//           check = false;
//           break;
//         }
//       }
//       if (check) {
//         for (let j = 0; j < width; j++) {
//           matrix[j].splice(i, 1);
//           matrix[j].push(0);
//         }
//         i--;
//       }
//     }
//   }
//   rotate(r: number) {
//     if (Math.abs(r) == 1) {
//       this.rotation += r;
//       let kicks: number[][];
//       if (kick[this.type]) {
//         kicks = kick[this.type];
//       } else {
//         kicks = kick[0];
//       }
//       for (let i = 0; i < kicks.length; i++) {
//         let state;
//         if (r < 0) state = this.rotation%4;
//         else state = (this.rotation-r)%4;
//         let x = kicks[i][0];
//         let y = kicks[i][1];
//         if (kick[this.type]) {
//           if (state%2 == 1) {
//             x = (3-Math.abs(x))*Math.sign(x);
//             y = (3-Math.abs(x))*Math.sign(x);
//           }
//         }
//         if (state == 1 || state == 2) x = -x;
//         if (state == 1 || state == 3) y = -y;
//         if (r<0) {
//           x = -x;
//           y = -y;
//         }
//         this.x += x;
//         this.y += y;
//         if (!this.colliding()) {
//           this.timer = 0;
//           return;
//         }
//         this.x -= x;
//         this.y -= y;
//       }
//       this.rotation -= r;
//     } else {
//       this.rotation += r;
//       if (this.colliding()) {
//         this.rotation -= r;
//       } else {
//         this.timer = 0;
//       }
//     }
//   }
// }

// let hold: number | undefined = undefined;
// const queue: number[] = [];
// let bag = [1,2,3,4,5,6,7];

// function getBag(): number {
//   let type = bag.splice(Math.floor(Math.random()*bag.length), 1)[0];
//   if (bag.length == 0) {
//     bag = [1,2,3,4,5,6,7];
//   }
//   return type;
// }

// const player = new Tetromino(getBag(), 4, 21);
// const ghost = new Tetromino(player.type, player.x, player.y);

// const colors: string[] = ["#000","#e55","#e95","#ec5","#5e5","#5ce","#55e","#c5e"];

// for (let i = 0; i < 5; i++) {
//   queue.splice(0, 0, getBag());
// }

// let md = {
//   direction: 0,
//   time: document.timeline.currentTime as number,
//   acc: 0,
// };
// let keys: {[index: string]: boolean} = {};
// window.addEventListener("keydown", (e)=>{
//   const key = e.key.toLowerCase();
//   keys[key] = true;
//   if (e.repeat) return;
//   switch (key) {
//     case "arrowup":
//       player.rotate(1);
//       break;
//     case "z":
//       player.rotate(-1);
//       break;
//     case "a":
//       player.rotate(2);
//       break;
//     case " ":
//       player.place();
//       break;
//     case "arrowright":
//       md.time = document.timeline.currentTime;
//       md.direction = 1;
//       player.move(1, 0);
//       break;
//     case "arrowleft":
//       md.time = document.timeline.currentTime;
//       md.direction = -1;
//       player.move(-1, 0);
//       break;
//     case "c":
//       if (hold) {
//         let save = player.type;
//         player.type = hold;
//         hold = save;
//       } else {
//         hold = player.type;
//         player.type = queue.pop() as number;
//         queue.splice(0, 0, getBag());
//       }
//       player.x = 4;
//       player.y = 21;
//       player.rotation = 0;
//       break;
//     case "r":
//       for (let i = 0; i < width; i++) {
//         for (let j = 0; j < height+20; j++) {
//           matrix[i][j] = 0;
//         }
//       }
//       hold = undefined;
//       bag = [1,2,3,4,5,6,7];
//       player.type = getBag();
//       player.x = 4;
//       player.y = 21;
//       player.rotation = 0;
//       for (let i = 0; i < queue.length; i++) {
//         queue[i] = getBag();
//       }
//   }
// });
// window.addEventListener("keyup", (e)=>{
//   const key = e.key.toLowerCase();
//   keys[key] = false;
//   if (key=="arrowright" && md.direction == 1 || key=="arrowleft" && md.direction == -1) {
//     md.direction = 0;
//   }
// });

// let threshold = 0.7;

// let gravity = 0;
// let gacc = 0;

// let oldTime: number;
// function loop(time: number) {
//   requestAnimationFrame(loop);

//   let dt: number;
//   if (oldTime) {
//     dt = (time-oldTime)/1000;
//   } else {
//     dt = 1/60;
//   }
//   oldTime = time;

//   if (gravity != 0) {
//     gacc += dt;
//     while (gacc > 1/gravity) {
//       player.move(0, -1);
//       gacc -= 1/gravity;
//     }
//   }

//   ctx.save();
//   ctx.resetTransform();
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.restore();

//   if (keys.arrowdown) {
//     player.move(0, -player.y-1);
//   }
  
//   ctx.fillStyle = "#0008";
//   ctx.fillRect(0, 0, width*ts, height*ts);
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[i].length; j++) {
//       if (matrix[i][j] != 0) {
//         ctx.fillStyle = colors[matrix[i][j]];
//         ctx.fillRect(ts*i, ts*(height-j-1), ts, ts);
//       }
//     }
//   }

//   for (let i = 0; i < queue.length; i++) {
//     let tetromino = new Tetromino(queue[i], 12, i*3, false);
//     tetromino.draw();
//   }
//   if (hold) {
//     let tetromino = new Tetromino(hold, -3, height-2, false);
//     tetromino.draw();
//   }

//   if (md.direction != 0 && time - md.time > 100) {
//     md.acc += dt;
//     while (md.acc > 1/60) {
//       md.acc -= 1/60;
//       player.move(md.direction, 0);
//     } 
//   } else {
//     md.acc = 0;
//   }

//   ghost.type = player.type;
//   ghost.rotation = player.rotation;
//   ghost.x = player.x;
//   ghost.y = player.y;
//   ghost.move(0, -ghost.y-1);
//   ghost.draw("#fff8");
//   player.draw();

//   player.y--;
//   if (player.colliding()) {
//     player.timer += dt;
//     ghost.y = player.y+1;
//     ghost.draw(`rgba(255,255,255,${player.timer/threshold})`);
//     if (player.timer > threshold) {
//       player.y++;
//       player.place();
//     }
//   } else {
//     player.timer = 0;
//   }
//   player.y++;
//   // player.move(0, -1);
// }

// requestAnimationFrame(loop);