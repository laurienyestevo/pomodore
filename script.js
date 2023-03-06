const circularProgressBar = document.querySelector("#circularProgressBar");
const circularProgressBarNumber = document.querySelector("#circularProgressBar .progress-value");
const buttonTypePomodoro = document.querySelector("#buttonTypePomodoro");
const buttonTypeShortBreak = document.querySelector("#buttonTypeShortBreak");

const audio = new Audio('/pomodoro-app_alarm.mp3');

const pomodoroTimeInSeconds = 1500;
const shortBreakTimerInSeconds = 300;
const TIMER_TYPE_POMODORO = 'POMODORO';
const TIMER_TYPE_SHORT_BREAK = 'SHORTBREAK';


let progressInterval; //variavel que guarda o setinterval, o metodo setinverval chama a função em intervalos especificados(milissegundos), ou seja, ela é usada para definir um atraso para funções que são executadas repetidas vezes
let pomodoroType = TIMER_TYPE_POMODORO;
let timerValue = pomodoroTimeInSeconds;
let multiplierFactor = 360 / timerValue;



//Função para transformar segundos no formato MM:SS

function formatNumberInStringMinute(number){

    const minutes = Math.trunc(number / 60) //Math.trunc retorna a parte inteira do numero removendo digitos depois da virgula ex: Math.trunc(15.6544) retorna: 15;
                    .toString()
                        .padStart(2, '0'); //o metodo padStart preenche a string atual com outra string, ate que a string atinja o comprimento especifico
    const seconds =Math.trunc(number % 60)
                    .toString()
                        .padStart(2, '0');
    
    return `${minutes}:${seconds}`;
}
const startTimer = () => {
    progressInterval= setInterval(() =>{
        timerValue --;
        setInfoCircularProgressBar();
    },1000);
}

const stopTimer = () => clearInterval(progressInterval);

const resetTimer = () =>{
    clearInterval(progressInterval);

    timerValue = (pomodoroType === TIMER_TYPE_POMODORO)
                    ? pomodoroTimeInSeconds
                        :shortBreakTimerInSeconds;
    
    multiplierFactor = 360 / timerValue
    
    setInfoCircularProgressBar();
    //audio.stop();
}

function setInfoCircularProgressBar(){
    if(timerValue === 0){
        stopTimer();
        audio.play();
    }

    circularProgressBarNumber.textContent = `${formatNumberInStringMinute(timerValue)}`;

    circularProgressBar.style.background = `conic-gradient( var(--time) ${timerValue * multiplierFactor}deg, var(--button-pomo) 0deg)`;
    
}



//Short Break

const setPomodoroType = (type) =>{
    pomodoroType = type;

    if(type === TIMER_TYPE_POMODORO){
        buttonTypeShortBreak.classList.remove("active");
        buttonTypePomodoro.classList.add("active");

    }else{
        buttonTypePomodoro.classList.remove("active");
        buttonTypeShortBreak.classList.add("active");
    }

    resetTimer();
}
