//AJAX call to PHP - send email
module.exports = function app() {

    app.post("/../contact.php", function(req, res) {
    
    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    
        return pattern.test(emailAddress);
    
    }
    
    $("#contactForm").on('submit', function (e) {
        e.preventDefault();
        var data = {
            firstname: $("#name").val().trim(),
            lastname: $("#surnamename").val().trim(),
            email: $("#email").val().trim(),
            // subject: $("#subject").val().trim(),
            message: $("#message").val().trim()
        };
    
        if (isValidEmail(data['email']) && (data['message'].length > 1) && (data['name'].length > 1) && (data['subject'].length > 1)) {
            $.ajax({
                type: "POST",
                url: "contact.php",
                data: data,
                success: function () {
                    $('#contactForm .input-success').delay(500).fadeIn(1000);
                    $('#contactForm .input-error').fadeOut(500);
                }
            });
        } else {
            $('#contactForm .input-error').delay(500).fadeIn(1000);
            $('#contactForm .input-success').fadeOut(500);
        }
    
        return false;
    });
});
    }