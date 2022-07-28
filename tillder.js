const DATA = {
      // tillder
      "tillder": {
        "amountOfQuestions": 2, // how many questions will actualy appear
        "questions":  [
            {
                "type": "binary",
                "src": "./assets/images/dog.jpg",
                "question": "שאלת נכון או לא נכון שהתשובה אליה היא נכון",
                "correctAns": true,
                "selectedAns": "",
            },
            {
                "type": "binary",
                "src": "./assets/images/exemple6.jpg",
                "question": "שאלת נכון או לא נכון שהתשובה אליה היא לא נכון",
                "correctAns": false,
                "selectedAns": "",
            },
        ],
    }
}


// question
let nTillderCurrentQuestion = 0;
let nTillderCorrectAnswers = 0;
let arrTillderQuestions = [];
// const
const AMOUNT_OF_TILLDER_QUESTION = DATA.tillder.amountOfQuestions; // how many questions we want out of the array
const DELAY_AFTER_QUESTION = 300;
const PASSING_RATE = 0.5;

/* loading function
--------------------------------------------------------------
Description: */
window.addEventListener("load", () => { 
    document.querySelector(`.loader`).classList.add(`fade`);
    document.querySelector(`.tillder`).classList.remove(`hidden`);
    arrTillderQuestions = shuffle(DATA.tillder.questions);
    addContentToQuestion();
    document.querySelector(`.odotButton`).addEventListener("click", handelAboutPage);
});

/* createShower
--------------------------------------------------------------
Description: */
const handelAboutPage = () => {
    document.querySelector(".tillder").classList.add("hidden");
    document.querySelector(".aboutInfo").classList.remove("hidden");
    document.querySelector(".aboutInfo .xIcon").addEventListener("click", () => {
      document.querySelector(".tillder").classList.remove("hidden");
      document.querySelector(".aboutInfo").classList.add("hidden");
    })
}

/* addContentToQuestion
--------------------------------------------------------------
Description: */
const addContentToQuestion = () => {
    document.querySelector(`.tillderContentHeadContainer`).innerHTML = "";
    document.querySelector(`.tillderTitle`).classList.remove(`hidden`);
    document.querySelector(`.odotButton`).classList.remove(`hidden`);

    let container = El("div", {cls: `tillderContentContainer`});
    document.querySelector(`.tillderContentHeadContainer`).append(container);
    // add question
    let question = El("div", {classes: [`tillderQuestionContainer`, `flexCenter`]}, 
        // El("img", {cls: `tillderPic`, attributes: {src: arrTillderQuestions[nTillderCurrentQuestion].src}},),
        El("div", {cls: `tillderQuestion`}, arrTillderQuestions[nTillderCurrentQuestion].question),
    );
    document.querySelector(`.tillderContentContainer`).append(question);
    document.querySelector(`.tillderContentContainer`).style.backgroundImage = `url(${arrTillderQuestions[nTillderCurrentQuestion].src})`;
    let gradient = El("div", {classes: [`tillderGradientContainer`, `flexCenter`]}, );
    document.querySelector(`.tillderContentContainer`).append(gradient);
    // add answeres
    let ansContainer = El("div", {classes: [`ansContainer`,]},
        El("div", {classes: [`binaryAns`, `true`, `ans`] , listeners: {click : onClickTillderAnswer}},
        El("img", {classes: [`ansPic`], attributes: { src: `./assets/images/heart_icon.svg`}},),
    ),
        El("div", {classes: [`binaryAns`, `false`, `ans`] , listeners: {click : onClickTillderAnswer}},
        El("img", {classes: [`ansPic`], attributes: {src: `./assets/images/wrong_icon.svg`}},),
    ),
    );
    document.querySelector(`.tillderContentContainer`).append(ansContainer);
    handlePan();
    document.querySelector(`.tillderContentContainer`).addEventListener('swiped', onClickTillderAnswer);

}

/* onClickTillderAnswer    
--------------------------------------------------------------
Description: */
const onClickTillderAnswer = (event) => {
    // remove listeners
    document.querySelector(`.tillderContentContainer`).removeEventListener('swiped', onClickTillderAnswer);
    document.querySelector(`.tillderContentContainer .true`).removeEventListener('click', onClickTillderAnswer);
    document.querySelector(`.tillderContentContainer .false`).removeEventListener('click', onClickTillderAnswer);
    // save selected answer
    if(event.currentTarget.classList[0] === "tillderContentContainer") {
        // if swipe
        if(event.detail.dir === "left") {
            arrTillderQuestions[nTillderCurrentQuestion].selectedAns = false;
        } else if (event.detail.dir === "right") {
            arrTillderQuestions[nTillderCurrentQuestion].selectedAns = true;
        }
    } else {
        arrTillderQuestions[nTillderCurrentQuestion].selectedAns = event.currentTarget.classList[1];
    }
    // add swipe animation
    if (String(arrTillderQuestions[nTillderCurrentQuestion].selectedAns) === `true`){
        document.querySelector(`.tillderContentContainer`).classList.add(`slideRight`);
    } else {
        document.querySelector(`.tillderContentContainer`).classList.add(`slideLeft`);
    }

    document.querySelector(`.tillderTitle`).classList.add(`hidden`);
    document.querySelector(`.odotButton`).classList.add(`hidden`);
    let container = El("div", {cls: `tillderFeedBackContainer`},
        El("div", {classes: [`tillderGradientContainer`, `flexCenter`]}, ),
        El("img", {attributes: {class: "tillderFeedBackIcon", src: "./assets/images/heart_icon.svg"}}),
        El("img", {attributes: {class: "tillderFeedBackText", src: "./assets/images/right_answer.svg"}}),
        El("div", {attributes: {class: "tillderFeedBackNextButton"}, listeners: {click: afterQuestionFeedback}}, "המשך לשאלה הבאה"),
    );
    document.querySelector(`.tillderContentHeadContainer`).append(container);
    document.querySelector(`.tillderFeedBackContainer`).style.backgroundImage = `url(${arrTillderQuestions[nTillderCurrentQuestion].src})`;

    // check if answer is correct
    if (String(arrTillderQuestions[nTillderCurrentQuestion].selectedAns) === String(arrTillderQuestions[nTillderCurrentQuestion].correctAns)){
        nTillderCorrectAnswers++;
    } else {
        document.querySelector(`.tillderFeedBackIcon`).setAttribute("src", "./assets/images/wrong_icon.svg")
        document.querySelector(`.tillderFeedBackText`).setAttribute("src", "./assets/images/wrong_answer.svg")
    }

    if (nTillderCurrentQuestion + 1 === AMOUNT_OF_TILLDER_QUESTION) {
        document.querySelector(`.tillderFeedBackNextButton    `).innerHTML = "לסיום התרגול"
    }
}

/* endTillderExer
--------------------------------------------------------------
Description: */
const afterQuestionFeedback = () => {
    // send to next question.
    nTillderCurrentQuestion++;
    if(nTillderCurrentQuestion < AMOUNT_OF_TILLDER_QUESTION) {
        setTimeout(addContentToQuestion, DELAY_AFTER_QUESTION)
    } else {
        endTillderExer();
    }
}

/* endTillderExer
--------------------------------------------------------------
Description: */
const endTillderExer = () => {
    document.querySelector(`.tillderFeedBackContainer`).innerHTML = "";
    let gradient = El("div", {classes: [`tillderGradientContainer`]}, );
    document.querySelector(`.tillderFeedBackContainer`).append(gradient);
    document.querySelector(`.tillderFeedBackContainer`).classList.add("end");
    let feedback;
    // add feedback accordingly
    if(nTillderCorrectAnswers/AMOUNT_OF_TILLDER_QUESTION >= PASSING_RATE){ // win - add precentegt
        feedback = El("div", {classes: ["tillderFeedbackTitle"]}, 
        El("img", {attributes: {class: "tillderFeedBackIcon", src: "./assets/images/kol_hakavod.svg"}}),
        El("img", {attributes: {class: "tillderFeedBackTextEnd", src: "./assets/images/good_ending.svg"}}),
        // El("div", {cls: `Feedback`}, `קבלו ${calcPercentageWin(nTillderCorrectAnswers, AMOUNT_OF_TILLDER_QUESTION)}% לסוללה שלכם`),
        El("img", {listeners: {click: () => {
            window.close()  
        }}, attributes: {class: "tillderFeedBackEndButton endButtons", src: "./assets/images/finish_button.svg"}}),
        El("img", {listeners: {click: restartTilder}, attributes: {class: "tillderFeedBackRestartButton endButtons", src: "./assets/images/restart_button .svg"}}),
        );
    } else {// loose - remove 5 %
        feedback = El("div", {classes: ["tillderFeedbackTitle"]}, 
        El("img", {attributes: {class: "tillderFeedBackIcon", src: "./assets/images/oyyy.svg"}}),
        El("img", {attributes: {class: "tillderFeedBackTextEnd", src: "./assets/images/bad_ending.svg"}}),
        // El("div", {cls: `Feedback`}, `סתם בזבזתם 5%....`),
        El("img", {listeners: {click: restartTilder}, attributes: {class: "tillderFeedBackRestartButton endButtons", src: "./assets/images/restart_button .svg"}}),
        );
    }
    document.querySelector(`.tillderFeedBackContainer`).append(feedback);
}

/* restartTilder
--------------------------------------------------------------
Description: */
const restartTilder = () => {
    // reset verubles
    nTillderCurrentQuestion = 0;
    nTillderCorrectAnswers = 0;
    arrTillderQuestions = shuffle(DATA.tillder.questions);
    addContentToQuestion();
}


/*
shuffle
------------------------------------------------
Description: take orgnaiz array and shffel it
Parameters: array.
------------------------------------------------
Programer: Gal
------------------------------------------------
*/
function shuffle(arr) {
    let tmp = arr.slice();
    for (let i = 0; i < arr.length; i++) {
        let index = Math.floor(Math.random() * tmp.length);
        arr[i] = tmp[index];
        tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
    }
    return arr;
}

/* El
--------------------------------------------------------------
Description: create html elements */
function El(tagName, options = {}, ...children) {
    let el = Object.assign(document.createElement(tagName), options.fields || {});
    if (options.classes && options.classes.length) el.classList.add(...options.classes);
    else if (options.cls) el.classList.add(options.cls);
    if (options.id) el.id = options.id;
    el.append(...children.filter(el => el));
    for (let listenerName of Object.keys(options.listeners || {}))
        if (options.listeners[listenerName]) el.addEventListener(listenerName, options.listeners[listenerName], false);
    for (let attributeName of Object.keys(options.attributes || {})) {
        if (options.attributes[attributeName] !== undefined) el.setAttribute(attributeName, options.attributes[attributeName]);
    }
    return el;
}

const handlePan = () => {
       
	var reqAnimationFrame = (function () {
	    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
	        window.setTimeout(callback, 1000 / 60);
	    };
	})();

    let transform;
    let angle = 3;
    var ticking = false;
    var screen = document.querySelector(".tillder");
    let el = document.querySelector(`.tillderContentContainer`);
    var START_X = Math.round((screen.offsetWidth - el.offsetWidth) / 2);

    var mc = new Hammer.Manager(el);
    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

	mc.on("panright panleft", onPan);
	mc.on("panend", resetElement);

    resetElement();

	function resetElement() {
        let feedBackPic = document.querySelector(`.tillderFeedBackPic`);
        if(feedBackPic) {
            document.querySelector(`.tillderContentContainer`).removeChild(feedBackPic);
        }
	    el.classList.add('animate');
	    transform = {
	        translate: { x: 0, y: 0 },
	        scale: 1,
	        angle: 0,
	        rx: 0,
	        ry: 0,
	        rz: 0
	    };
	    requestElementUpdate();
	}

	function updateElementTransform() {
	    var value = [
	        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
	        'scale(' + transform.scale + ', ' + transform.scale + ')',
	        'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
	    ];

	    value = value.join(" ");
	    el.style.webkitTransform = value;
	    el.style.mozTransform = value;
	    el.style.transform = value;
	    ticking = false;
	}

	function requestElementUpdate() {
	    if(!ticking) {
	        reqAnimationFrame(updateElementTransform);
	        ticking = true;
	    }
	}

    
    function onPan(ev) {
        transform.translate = {
            x: START_X + ev.deltaX,
            y: 0
        };

        if (transform.angle < 10) {
            transform.angle += 1;
        }
        let feedBackPic = document.querySelector(`.tillderFeedBackPic`);
        if(feedBackPic) {
            document.querySelector(`.tillderContentContainer`).removeChild(feedBackPic)  
        }
        if (ev.additionalEvent === "panright") {
            transform.angle = angle;
            transform.rz = -1;
            let feedBackPic = El("img", {cls: `tillderFeedBackPic`, attributes:{src: "./assets/images/right.svg"}}, );
            document.querySelector(`.tillderContentContainer`).append(feedBackPic);
            if (transform.translate.x > 300) {
                const event = new CustomEvent("swiped", {detail: {dir : "right"}});
                document.querySelector(`.tillderContentContainer`).dispatchEvent(event)
    
            }
        } else if (ev.additionalEvent === "panleft") {
            transform.angle = angle;
            transform.rz = 1;
            let feedBackPic = El("img", {classes: [`tillderFeedBackPic`, `tillderFeedBackPicWrong`], attributes:{src: "./assets/images/wrong.svg"}}, );
            document.querySelector(`.tillderContentContainer`).append(feedBackPic);
            if (transform.translate.x < -300) {
                const event = new CustomEvent("swiped", {detail: {dir : "left"}});
                document.querySelector(`.tillderContentContainer`).dispatchEvent(event)
    
            }
        }
   
	    requestElementUpdate();
	}
}
