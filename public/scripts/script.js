//BOOTSTRAP CODE TO PUT IMAGE NAME ON LABEL FOR FILE UPLOAD
/* $(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
}); */

$(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});


/*  Blogs.sort(function(a, b){return b - a}).reverse(); */
/* 
function sortBy(sortingOrder) {
    if (sortingOrder = 'asc') {
        document.getElementById('SortingDesc').style.display = "none";
        document.getElementById('SortingAsc').style.display = "inline-block";
    }
    if (sortingOrder = 'desc') {
        document.getElementById('SortingDesc').style.display= "inline-block";
        document.getElementById('SortingAsc').style.display = "none";
    }
} */