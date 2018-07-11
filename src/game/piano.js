/* eslint-disable*/
var pianoSheets = ["QPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMNOPQLRQPKQPOJPONNJQQQQPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMORQQPPRTSRQPONMMLMNOPPQRMOPNOPQSPNOPQSPNQQQQQP", "JJKLLKJIHHIJJIIJJKLLKJIHHIJIHHIIJHIJKJHIJKJIHIEJJKLLKJIHHIJIHH", "QPOPQSSSSTSTUVVVVVVUTSTTSSSQPOQRQPPQPPQPPPOOOOPOOTUVVVVVVUTSSSQPOVVVVWWWVWXXWVVVVVWWSSXWVVVVVWWWWVUVTTUTUVVVWVWXXWXV", "LOQSONQSSTUVTSQPOOOQPOOOPQPOMPQPLOQSONQSSTUVTSPOOOQPOOOPQPMNOPOQSQPOSNMNMNMLQSQPOSNMNOOOPQPLOQSONQSSTUVTSQPOOOQPOOOPQPMNOPO", "OOJLOOJLJJLOOMMKPPLMLKJIJLMLKJIJHLMOJLQPOLMJLMOJLQPOLMOLJLMLOOLJLMLOOLMOOLMPPLMQQLMQPO",
    "EHJJJJIJIHEHJHJLKJILKJJIHIJLKFFEGHIJIHLHJJJIJIHEHJJJLKJILKJJIHIJLKKFFEGIJIH", "FHIJLLJHIFHIJLLMIJJLMLMONMLMJHIJLHFHIJMLJMMLKJIJLFHIHIJLLMONMLJM", "LJIHIGFENMNLMKJLIJLIJKJIHLGIFHEFHECEFHIFHELOMLJLIIJGFEFHICHFEFHEJLGIFHECECEFGIFEFHILJIJIHFECHFHFECEFHEJLIJIHGFE", "QPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMNOPQLRQPKQPOJPONNJQQQQPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMORQQPPRTSRQPONMMLMNOPPQRMOPNOPQSPNOPQSPNQQQQQP", "HHHHGHIHIIIIHIJIHJMLJJMLJJJJJJMLKJIJKHIIIIIILKJIHLNMLKJNPONMLJJJJMLKJIJKHIIIIIILKJIHFGHIIJHHHHGHIHIIIIHIJIHJMLJJMLJOOOONNNNMNJIHGFMLJMMLJMJIHGHHLJMMLJMJIHGFLM",
    "LLQOPONOMKKNMLLLQONOPQRMMNONMNOLLMLMLRQPQOMNNMNMNOPRQPOSQSRQPRQONOPLJLJMLMLOLOLRPRPSSOPQRQPSQOPPQLMNOOPQRSQSQSSQSQRQPSRPRPRRQPRQSOLOQONOPQRMNMLMNPONO", "KKKKKKKKOPQRSTUTXWUTSSSSTUVWXYXTZYXWXVTZYXYZWVZXWVUVWXUSTVUVWXSSOTSRQPQRSRTOQRUTOTSSRRQPOO", "MLKJKJIKJFGFMLKNMKLMLKLKJJKLMNOPQQQPQRSTQRSRQPQQQPQRSTSTUOTMLKJKJIJKFGFMLKNMKLMLKLKJJKLMNOPQQQPQRSTQRSRQPQQQPQRSTSTUOTQQQQSQQQQSQQQQSQSQSQSQOOOUOPOONOPOPOPOPOQQPOMNLMNNMLMNOOPOONMLKLMMMKLMNNNNOQQRSSTVUTUVTMLKJKJIJKFGFMLKKMKLMLKLKJKLMNOPQQQPQRSTQRSRQPQQQPQRSTRQSRQPQQQPQRSTOPQRP",
    "JIHKJIJIHGHIJIHKJIJIHGHIJKLMMMMMNNNNMMMMNNNNMNMNMNMNMNNNNOOOONNNNOOOONONONONONMNOPONMNOPQRQPQMNOPONMNOPQRQPQQRSTSRQPONMLKJIHGFGHIHGFGHIJKJIJMNOPONMNOPQRQPQTSRQPONMLKJIHGEFFFFF", "QPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMNOPQLRQPKQPOJPONNJQQQQPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMORQQPPRTSRQPONMMLMNOPPQRMOPNOPQSPNOPQSPNQQQQQP", "EIIJIHHJKMOMMLLMGGMLHHJJIJIJIJIEIIJIHHJKMOMMLLMGGMLHHJJIJIJIHQOMLLIJKJIHQOMLKLMNPOOQOMLLIJKJIHQOMLKLMNOLNLOLNLOLNLOLNLOOOOEOPRQPSSSTQRPPPRQPOHNMLKJIOOPRQPSSSTQRPPPRQPOSPQO", "HHHHHHJIHGFEFGHIECBCCBCCBCBACBCCBCCBCFEECDFEECDFEECBGBFEEEFEDCCBCCBCBACBCCBCCBCFEECDJICIHGFEDCBAHHHGHHGHHGHKFHGHHGHHGHJEEEDDFFEEHGGFEDFFEDCEDDFFEEHGGEFHEEEFHGGHGGHGGGGJCBCCBCCBCBACBCCBCCBCFEECDFEEBCFEECBGBFEEEFEDCCBCCBCBACBCCBCCBCFEECDJICIHGFEDCBAHHH",
    "ELELLKJIHGFIFIEFGHIJELELLKJIHGGJGJGIJKGHHKKJIIHCCIHCCIHDDKKJIIHCCCDEFGHIJKMKKKJIIHCCIHCCIHDDKKJIIHCEEFGHJEHHOHOOONMLJILILHIJKLMHOHOOOMMLJILILJHIJJK", "IHDKKIHDKKIHDKBKAJJIHAJJIHAJJIHAJBJDKKIHMKKIHMKKIHMHOHPJJIHPJJIHPJJIHPHMHKMKKLMOOKLMOOKLMOOOPOMLKIIMLKIIMLKIIHIK", "EHHJJHEEEEIHGFEEHHJJHEHGFGHFEEGGHGFGHEHGGGKIGHHFFFHHEEEEEEIGHHFFFHHEEEEEIGHEHEHJHJHGHEEEEEEIHGFGFEEHEHJHJHGHEEEGFGHFDEEFEEGGGHGHHGHEHGGGKIGHHHHHFFFFHHHGHEEEEEEIJGHHHHHFFFFHHHGHEEEEEEIGIHCFFHHFCCCIHGFGCCCFFHHFCCCGFGHFCCCCGGHGHFCHGGIGHFCCCCDCBDCCFFEBCDCCDCBDCCFFGFC",
    "MOMJMJHJHFCFIGHGHGGHIGHFMOMJMJHJHFHGHHGHMHHGJKJJKJOJJIFHFEFIFEFKJIJHGFHGHGF", "QPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMNOPQLRQPKQPOJPONNJQQQQPQPQNPOMHJMNJLNOJQPQPQNPOMHJMNJONMORQQPPRTSRQPONMMLMNOPPQRMOPNOPQSPNOPQSPNQQQQQP"
];
var pianoAlph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var pianoAudio = {};
var soundtype = localStorage["soundtype"] || 0;


function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function() {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
            request.response,
            function(buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount == loader.urlList.length)
                    loader.onload(loader.bufferList);
            },
            function(error) {
                console.error('decodeAudioData error', error);
            }
        );
    }

    request.onerror = function() {

    }

    request.send();
};

BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
};


function Piano(context) {
    this.ctx = context;
    var aPianoSounds = [];
    for (var i = 0; i < pianoAlph.length; i++) {
      aPianoSounds.push("./piano/sound" + pianoAlph[i] + ".mp3");
    }

    var ctx = this;
    var chordLoader = new BufferLoader(context, aPianoSounds, onChordLoaded);

    function onChordLoaded(buffers) {
        ctx.chordBuffers = buffers;
        start(1);
    };

    chordLoader.load();
}
Piano.prototype.play = function(chord) {
    var context = this.ctx;
    var source = context.createBufferSource(); // creates a sound source
    source.buffer = this.chordBuffers[pianoAlph.indexOf(chord)];                    // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    if (source.start) {
				source.start(0);
			} else if (source.play) {
				source.play(0);
			} else if (source.noteOn) {
				source.noteOn(0);
			}
}

window.AudioContext = window.AudioContext ||
window.webkitAudioContext;
var context;
var oPinao;
if (AudioContext) {
  context = new AudioContext();
  oPinao = new Piano(context);
}else {
  start(1);
}

function randomPlay() {
  if (oPinao) {
    oPinao.play(pianoAlph[parseInt(Math.random() * 26)]);
  }
}

function pianoPlay(a, e) {
  if (oPinao) {
    if (soundtype == 0) {
          oPinao.play(a);
    } else if (soundtype == 1) {
        // var nowAudio = new Audio;
        // if (e == 1) nowAudio.src = "error.mp3";
        // else nowAudio.src = "touch.mp3";
        // nowAudio.play()
    }
    // if (soundtype != 2) nowAudio.onpause = function() {
    //     nowAudio = null
    // }
  }
}

function cheerPlay() {
    // if (soundtype != 2) {
    //     var nowAudio = new Audio;
    //     nowAudio.src = "cheer.mp3";
    //     nowAudio.play()
    // }
}


function changeSoundType(t) {
    if (soundtype == 0) soundtype = 1;
    else if (soundtype == 1) soundtype = 2;
    else if (soundtype == 2) soundtype = 0;
    localStorage["soundtype"] = soundtype;
    randomPlay();
    t.innerHTML = "声音: " + ["钢琴", "默认", "关"][soundtype]
};
