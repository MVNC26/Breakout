import { Actor, CollisionType, Color, Engine, vec, Text, Font } from "excalibur"

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
	color: Color.Chartreuse,
	name: "barrajogador"
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
	x: Math.random () * (580 - 20) + 20,
	y: 300,
	radius:10,
	color: Color.Red
})

bolinha.body.collisionType = CollisionType.Passive

// 5- criar movimentação da bolinha 
const velocidadeBolinha = vec(300, 300)

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

const corBloco = [Color.Red, Color.Orange, Color.Yellow]

const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas) // = 136
const alturadoBloco = 30

const listaBlocos: Actor[] = []

//redenrização do bloquinhos

for(let j = 0; j<linhas; j++){
	for( let i = 0; i<colunas; i++){
		listaBlocos.push(
			new Actor({
				x: xoffset + i * (larguraBloco + padding) + padding,
				y: yoffset + j * (alturadoBloco + padding) + padding,
				width:larguraBloco,
				height: alturadoBloco,
				color: corBloco[j]
			})
		)
	}
}

listaBlocos.forEach( bloco => {
	bloco.body.collisionType = CollisionType.Active
	game.add(bloco)
} )

//adicionar pontos 

let pontos = 0
const textoPontos = new Text({
	text: "hello word",
	font: new Font({ size: 20 })
})

const objetoTexto = new Actor({
	x: game.drawWidth - 80, 
	y: game.drawHeight -15
})

objetoTexto.graphics.use(textoPontos)
game.add (objetoTexto)




let colidindo: boolean = false

bolinha.on("collisionstart", (event) => {
	if ( listaBlocos.includes(event.other) ) {
		event.other.kill()
	}

	//Rebater a Bolinha - inverter as direções X e Y 
	let interseccao = event.contact.mtv.normalize()

	if (!colidindo) {
		colidindo = true

		if ( Math.abs (interseccao.x) > Math.abs (interseccao.y)) {
			bolinha.vel.x = bolinha.vel.x * -1
		} else {
			bolinha.vel.y = bolinha.vel.y * -1
		}
	}
})	

bolinha.on("collisionend", () => {
	colidindo = false
} )

bolinha.on("exitviewport", () => {
	alert("e Morreu")
	window.location.reload()
})



//inicia o game
game.start()