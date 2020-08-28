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



function timeslotConfirmation() {
    document.getElementById('SOI-firstForm').style.display = "none";
    document.getElementById('SOI-firstConfirm').style.display = "none";
    document.getElementById('SOI-secondForm').style.display = "block";
    document.getElementById('SOI-firstBack').style.display = "block";
    document.getElementById('SOI-secondConfirm').style.display = "block";
    document.getElementById('SOISecondayInfo1').style.display = "block";
    document.getElementById('SOISecondayInfo2').style.display = "block";
    TimeSlotValue = document.getElementById('userSelectedDate');
    TimeSlotValue2 = document.getElementById('userSelectedTimeSlot');
    document.getElementById('SOISecondayInfoDateTime').innerHTML = TimeSlotValue2.value + ",   " + TimeSlotValue.value;
    document.getElementById('SOIFormTitle').innerHTML = "Enter Personal Details";
}

function personalDetailsBack() {
    document.getElementById('SOI-firstForm').style.display = "block";
    document.getElementById('SOI-firstConfirm').style.display = "block";
    document.getElementById('SOI-secondForm').style.display = "none";
    document.getElementById('SOI-firstBack').style.display = "none";
    document.getElementById('SOI-secondConfirm').style.display = "none";
    document.getElementById('SOISecondayInfo1').style.display = "block";
    document.getElementById('SOISecondayInfo2').style.display = "block";
    document.getElementById('SOIFormTitle').innerHTML = "Choose a Date and Time";
}

function onPersonalDetailsConfirmation() {
    document.getElementById('SOI-secondForm').style.display = "none";
    document.getElementById('SOI-firstBack').style.display = "none";
    document.getElementById('SOI-secondConfirm').style.display = "none";
    document.getElementById('SOI-thirdForm').style.display = "block";
    document.getElementById('SOI-secondBack').style.display = "block";
    document.getElementById('SOI-thirdConfirm').style.display = "block";
    document.getElementById('SOIFormTitle').innerHTML = "Enter Meeting Details";
}

function meetingDetailsBack() {
    document.getElementById('SOI-secondForm').style.display = "block";
    document.getElementById('SOI-firstBack').style.display = "block";
    document.getElementById('SOI-secondConfirm').style.display = "block";
    document.getElementById('SOI-thirdForm').style.display = "none";
    document.getElementById('SOI-secondBack').style.display = "none";
    document.getElementById('SOI-thirdConfirm').style.display = "none";
    document.getElementById('SOIFormTitle').innerHTML = "Enter Personal Details";
}

function onMeetingDetailsConfirmation() {
    document.getElementById('SOI-thirdForm').style.display = "none";
    document.getElementById('SOI-secondBack').style.display = "none";
    document.getElementById('SOI-thirdConfirm').style.display = "none";
    document.getElementById('SOI-fourthForm').style.display = "block";
    document.getElementById('SOI-thirdBack').style.display = "block";
    document.getElementById('SOI-fourthConfirm').style.display = "block";
    document.getElementById('SOIFormTitle').innerHTML = "Confirm Appointment";
    userPhoneValue = document.getElementById('userPhone');
    userEmailValue = document.getElementById('userEmail');
    document.getElementById('confirmDate').innerHTML = TimeSlotValue.value;
    document.getElementById('confirmTime').innerHTML = TimeSlotValue2.value;
    document.getElementById('confirmPhoneNo').innerHTML = userPhoneValue.value;
    document.getElementById('confirmEmail').innerHTML = userEmailValue.value;
}

function paymentDetailsBack() {
    document.getElementById('SOI-thirdForm').style.display = "block";
    document.getElementById('SOI-secondBack').style.display = "block";
    document.getElementById('SOI-thirdConfirm').style.display = "block";
    document.getElementById('SOI-fourthForm').style.display = "none";
    document.getElementById('SOI-thirdBack').style.display = "none";
    document.getElementById('SOI-fourthConfirm').style.display = "none";
    document.getElementById('SOIFormTitle').innerHTML = "Enter Meeting Details";
}