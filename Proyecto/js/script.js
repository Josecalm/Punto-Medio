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

function showMorePosts() {
    var x = document.getElementById("morePosts");
    var y = document.getElementById("showMorePosts");
    if (x.style.display === "none") {
        x.style.display = "flex";
        y.style.display = "none";
    } else {
        x.style.display = "none";
    }
}

