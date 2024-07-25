
/*global phase*/
//configuracion del juego
const config ={

    //donde vamos a renderizar el videojuego webgl, canvas
    type : Phaser.AUTO,   
    
    //tamano videojuego
    width : 256,
    height : 244, 
    backgroundColor: '#049cd8',

    //donde se va a renderizar en el identificador game del index
    parent: 'game',
    scene: {
        //cuando se ejecutan
        preload, //funcion para precargar recursos del juego
        create,  //funcion para cuando comienza el juego
        update, //funcion en cada frame
    }
  

}

//Inicializamos nuestro juego

new Phaser.Game(config)

function preload(){
    //1. Cargar los recursos
    //cargamos la imgen
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )

    //cargamos la imgen
    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )

    //hemos cargado el spritesheet que es el personaje con todas las direcciones
    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        {frameWidth:14} //es lo que ocupa cada uno de los marios //tambien tenemos frameHeight
    )

} //1. en ejecutar
function create (){
    //2.Pintamos la imagen en la posicion que queremos
    //el centro de la imagen esta en el punto 0,0 que es arriba a la izda
    //image(x,y,id-asset)
    this.add.image(100,50,'cloud1')
    .setOrigin(0,0)
    .setScale(0.15) //scale escalamos la imagen

    //add texturas suelo es como la imagen pero para texturas
    this.add.tileSprite(0,config.height -32, config.width,32,'floorbricks')
    .setOrigin(0,0)
    
    //pintamos al personaje como spritesheet
    //lo guardamos en un objeto para moverlo en el update
   this.mario = this.add.sprite(50,210,'mario')
    .setOrigin(0,1)

    //cargamos las animaciones
    this.anims.create({
        //le damos una key unica 
        key: 'mario-walk',
        frames: this.anims.generateFrameNumbers(
            //spritesheets que queremos usar, en este caso mario
            'mario',
            {start: 1, end: 3 }
        ),
        frameRate: 12,
        //cuantas veces se ejecuta la animacion asi es infinito, pero si pones 1,2,3 es las veces que se repetira
        repeat: -1
    })
    //movimiento del personaje
    //creamos las teclas
    //metodo para poder visualizar las teclas en el update
    this.keys = this.input.keyboard.createCursorKeys()
    
    
} //2. en ejecutar
function update (){

    //vamos a decirle con un if si la tecla de la izda/drcha presionada
    if(this.keys.left.isDown){

         // si se mueve la animacion a ejectutar es:
        // el true sirve para que si ya se esta ejecutando la ignora
        this.mario.anims.play('mario-walk',true)
        //movemos mario en el eje x-2
        this.mario.x -= 2

    } else if(this.keys.right.isDown){
        this.mario.anims.play('mario-walk',true)
        //movemos mario en el eje x+2
        this.mario.x += 2
       
    }
   
} //3.continuamente