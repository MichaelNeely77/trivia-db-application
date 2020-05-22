var btn = document.getElementById('btn');

btn.addEventListener('click', nextItem);
var answers = {'correct':0, 'wrong': 0}
var output = document.getElementById('output');

function nextItem() {
    var url = 'https://opentdb.com/api.php?amount=10';
    var html = '<h2>Question</h2>'
    requestAJAX(url, function(data) {
        console.log(data.results[0]);
        var obj = data.results[0];
        html += '<div><div class="cat">Category: '+obj.category+'</div>';
        html += '<div class="question">'+obj.question+'</div></div>';
        html += '<div></div>';
        output.innerHTML = html;

    });
}

function questionBuilder() {
    
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