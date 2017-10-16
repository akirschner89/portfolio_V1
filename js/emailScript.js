//AJAX call to PHP - send email

function isValidEmail(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    return pattern.test(emailAddress);

}

$("#contactForm").on('submit', function (e) {
    e.preventDefault();
    var data = {
        firstname: $("#name").val().trim(),
        lastname: $("#surname").val().trim(),
        email: $("#email").val().trim(),
        // subject: $("#subject").val().trim(),
        message: $("#message").val().trim()
    };



    if (isValidEmail(data['email']) && (data['message'].length > 1) && (data['firstname'].length >= 1) && (data['lastname'].length >= 1)) {
        console.log("validation works!");
        $.ajax({
            url: "contact.php",
            type: "post",
            data: data,
            success: function () {
                $('#contactForm .input-success').delay(500).fadeIn(1000);
                $('#contactForm .input-error').fadeOut(500);
                // alert("success");
                console.log(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("ERROR:" + xhr.responseText+" - "+thrownError);
                }
               
        });
    } else {
        console.log("no validation for you!");
        $('#contactForm .input-error').delay(500).fadeIn(1000);
        $('#contactForm .input-success').fadeOut(500);
    }

    return false;
});


