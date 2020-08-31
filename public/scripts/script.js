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

    
    /* FOR PRESELECTNG VALUES FOR SELECT OPTION TAG */
    const params = new URLSearchParams(window.location.search)
    if (params.has('SOI')) {
        SOIValue = params.get('SOI')
        $("#" + SOIValue).attr("selected", "");
    } else {
        console.log('not')
    }
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

/* function onSOIChange() {
    if (document.getElementById('inputState').value == 'workshops') {
        document.getElementById('confirmPrice').innerHTML = 'Charges vary as per sessions.'
    } else {
        document.getElementById('confirmPrice').innerHTML = '&#8377;1500';        
    }
} */

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
    if (document.getElementById('inputState').value == 'workshops') {
        document.getElementById('confirmPrice').innerHTML = 'Charges vary as per sessions.'
    } else {
        document.getElementById('confirmPrice').innerHTML = '&#8377;1500';        
    }
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



$(document).ready(function(){
    $('.toast').toast('show', {
        autohide: false
    })
});


/* function onServicesBooking(SOI)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == SOI){return pair[1];}
        }
        console.log(SOI)    
        console.log(query)
        console.log(pair[1])
        console.log('fin pair')
        document.getElementById(':diet-prescription').removeAttribute("selected");
        document.getElementById(':preventive-diet').removeAttribute("selected");
        document.getElementById(':workshops').removeAttribute("selected");
        document.getElementById(':sports-nutrition').removeAttribute("selected");
        document.getElementById(':lifestyle-modification').removeAttribute("selected");
        document.getElementById(':custom-dietplans').removeAttribute("selected");
        document.getElementById(':healthrisk-accessment').removeAttribute("selected");
        document.getElementById(':nutritional-counselling').removeAttribute("selected");
        document.getElementById('inputState').option(SOI).setAttribute("selected", "");

        if ( SOI == ':SOI=preventive-diet' ) {
            document.getElementById('inputState').option[5].selected="true";
        } else {
            console.log('in else')
        }

}  */



function onServicesBooking(params) {
    console.log(params)
}




/* function preselectedOption(optionSelected) {
    document.getElementById('serviceOption1').removeAttribute("selected");
    document.getElementById('serviceOption2').removeAttribute("selected");
    document.getElementById('serviceOption3').removeAttribute("selected");
    document.getElementById('serviceOption4').removeAttribute("selected");
    document.getElementById('serviceOption5').removeAttribute("selected");
    document.getElementById('serviceOption6').removeAttribute("selected");
    document.getElementById('serviceOption7').removeAttribute("selected");
    document.getElementById('serviceOption8').removeAttribute("selected");
    document.getElementById(optionSelected).setAttribute("selected", "");
} */