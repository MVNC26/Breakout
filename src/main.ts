import { Actor, CollisionType, Color, Engine, vec } from "excalibur"

// 1 - Criar uma instancia de Engine, que representa o jogo
const game = new Engine({
	width: 800,
	height: 600
})

// Criar barra do player
const barra = new Actor({
	x: 150,
	y: game.drawHeight -40,  //game.height = altura do game 
	width: 200,
	height: 20,
	color: Color.Chartreuse
})

//Define o tipo de colisão da barra 
//CollisionType.Fixed significa que massa tem massa infinita, ou seja nçao vai se mexer
barra.body.collisionType = CollisionType.Fixed

//insere o actor barra no game
game.add(barra)

// 3- Movimenta barra de acorodo com a posição do mouse
game.input.pointers.primary.on("move", (event) => {
	barra.pos.x = event.worldPos.x
})


// 4- criar acotor bolinha 
const bolinha = new Actor({
	x:100,
	y: 300,
	radius:10,
	color: Color.Red
})

bolinha.body.collisionType = CollisionType.Passive


// 5- criar movimentação da bolinha 
const velocidadeBolinha = vec(100, 100)

setTimeout(() => {
	bolinha.vel = velocidadeBolinha
}, 1000 )

// 6 - Fazer bolinha rebater na parede 
bolinha.on("postupdate", () =>{
	if(bolinha.pos.x < bolinha.width /2){
		bolinha.vel.x = velocidadeBolinha.x
	}

	if (bolinha.pos.x + bolinha.width /2 > game.drawWidth) {
		bolinha.vel.x = velocidadeBolinha.x * -1
	}
	if(bolinha.pos.y < bolinha.width /2){
		bolinha.vel.y = velocidadeBolinha.y
	}

})


//insere bolinha no gme
game.add(bolinha)

// 7 - criar os blocos
const padding = 20

const xoffset = 65
const yoffset = 20

const colunas = 5 
const linhas  = 3

const corBloco = [Color.Violet, Color.Orange, Color.Yellow]

const larguraBloco = (game.halfDrawWidth / colunas) - padding - (padding / colunas) // = 136
const alturadoBloco = 30

const listaBlocos: Actor[] = []





//inicia o game
game.start()