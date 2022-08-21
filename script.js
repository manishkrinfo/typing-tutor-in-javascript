const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainBtn  = document.querySelector("button");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTypin = 0;

function randomParagraph() {
    //geting random number less than paragraph length
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    //getting random item from the paragraphs array, splitting all charaters add each charcter inside span then adding inside p tag

    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTypin) {
            timer = setInterval(initTimer, 1000);
            isTypin = true;
        }
        // if user hasn't entered any character or pressed backsapce
        if(typedChar == null) {
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct","incorrect");
        } else {
            if(characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
            // if wpm value is 0, empty, or infinity then setting, it's value to 0
            let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm ;
    
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes; // cpm will not count mistakes
        
    } else {
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    // if timeLeft is greater than 0 then decrement the timeLeft else clear the timer
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    randomParagraph(); 
    inpField.value = "";
    clearInterval(timer);   
    timeLeft = maxTime,
    charIndex = mistakes = isTypin = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);