var btn = document.getElementById('btn');

btn.addEventListener('click', nextItem);
var answers = {'correct':0, 'wrong': 0}
var output = document.getElementById('output');
var selAnswer = document.getElementById('selAnswers');

function nextItem() {
    var btn = document.getElementById('btn');
    btn.style.display = 'none';
    var url = 'https://opentdb.com/api.php?amount=10';
    var html = '<h2>Question</h2>'
    requestAJAX(url, function(data) {
        console.log(data.results[0]);
        var obj = data.results[0];
        html += '<div><div class="cat">Category: '+obj.category+'</div>';
        html += '<div class="question">'+obj.question+'</div></div>';
        html += '<div></div>';
        output.innerHTML = html;
        questionBuilder(obj.correct_answer, obj.incorrect_answers);
    });
}

function correctAnswerIs() {
    var els = document.querySelectorAll('#selAnswers div');
    for(x=0;x<els.length;x++) {
        if(els[x].getAttribute('data-cor')) {
            return els[x].innerText
        };
    }
}


function sendAnswer() {
    var res = event.target.getAttribute('data-cor');
    var correctAnswer = correctAnswerIs();

    if(res == 'true') {
        answers.correct++;
        selAnswer.innerHTML = '<h5>Correct!!</h5>'
    } else {
        answers.wrong++;
        selAnswer.innerHTML = '<h5>Wrong, it was '+correctAnswer+'</h5>';

    }
    document.getElementById('score').innerHTML = 'Correct '+answers.correct+' Wrong: '+answers.wrong;
    btn.style.display = 'block';
}

function questionBuilder(cor, incor) {
    var holder = incor;
    holder.push(cor);
    holder.sort();

    selAnswer.innerHTML = '';
        for(var x=0;x<holder.length; x++){
            var el = document.createElement('div');
            var checker = holder[x] == cor ? true : false;
            el.setAttribute('data-cor', checker);
            el.innerHTML = holder[x];
            el.addEventListener('click',sendAnswer);
            selAnswer.appendChild(el);
        }
    }



function requestAJAX(url,callback) {
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200)
        callback(JSON.parse(xhr.responseText));
    }

    xhr.open('GET',url,true);
    xhr.send();
}