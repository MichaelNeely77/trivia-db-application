var btn = document.getElementById('btn');

btn.addEventListener('click', nextItem);

function nextItem() {
    var url = 'https://opentdb.com/api.php?amount=10';
    requestAJAX(url, function(data) {
        console.log(data);
    });
}

function requestAJAX(url,callback) {
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200)
        console.log(JSON.parse(xhr.responseText));
    }

    xhr.open('GET',url,true);
    xhr.send();
}