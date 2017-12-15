window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("button_top").style.display = "block";
    } else {
        document.getElementById("button_top").style.display = "none";
    }
}

// Cuando el usuario da click, se va hasta la parte superior del documento
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}