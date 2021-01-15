const audio = new Audio('put.wav');
audio.volume = 0.05;
const bgm = new Audio('bgm.mp3');
bgm.volume = 0.1;

let sound_on=true;
let bgm_on=true;

function sound_e(){
    if(sound_on){
        $('#sound_e_on').css('display', 'none');
        $('#sound_e_off').css('display', 'inline');
        sound_on=false;
        audio = new Audio();
    }else{
        $('#sound_e_on').css('display', 'inline');
        $('#sound_e_off').css('display', 'none');
        sound_on=true;
        audio = new Audio('put.wav');
        audio.volume = 0.05;
    }
}

function sound_b(){
    if(bgm_on){
        $('#sound_b_on').css('display', 'none');
        $('#sound_b_off').css('display', 'inline');
        bgm_on=false;
        bgm.pause();
    }else{
        $('#sound_b_on').css('display', 'inline');
        $('#sound_b_off').css('display', 'none');
        bgm_on=true;
        bgm.play();
    }
}