
(function ($) {
    $.fn.mfValidate = function (userOptions) {
        var options = $.extend({
            errorDivMainClass: "errorMsg",
            fieldNameAttr: "data-fname",
            fieldErrorClassAttr: "data-err-class"
        }, userOptions);

        var passwordRegex=/([a-z 0-9 A-z !@#$%^&]+)/;
        var mobileRegex=/(09|9)[0-3 9][0-9](\d){7}/;
        var emailRegex = /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/i;
        var urlRegex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/;
        var nameRegex = /([a-z A-z]+)/;

        var startWith = function (str, prefix) {
            return (str.slice(0, prefix.length) == prefix);
        }


        this.each(function () {
            var frm = $(this);
/*-------------------------------------------after submit check -------------------------------------------------------------------------------------- */
            var elements = frm.find("input[data-vld],textarea[data-vld]")
            elements.each(function () {
                var field = $(this);
                var fName = (field.is("["+options.fieldNameAttr+"]")) ? field.attr(options.fieldNameAttr): field.attr("name");
                var vldStrings = field.attr("data-vld").split("|");
                var errClass= $(this).attr(options.fieldErrorClassAttr);
                $(this).keyup(function () {
                    for(i in vldStrings ){
                        var vldStr = vldStrings[i].trim();
                        if(!(field.val()==="")){
                            $("." + errClass + "empty").remove()
                        }
                        if (vldStr === "email") {
                            if(emailRegex.test(field.val())){
                               $("." + errClass + "email").remove()
                            }
                        }
                        else if (vldStr === "url") {
                            if(urlRegex.test(field.val())){
                                $("." + errClass + "url").remove()
                            }
                        }
                        else if (vldStr === "name") {
                            if(nameRegex.test(field.val())){
                                $("." + errClass + "name").remove()
                            }
                        }
                        else if (vldStr === "password") {
                            if (passwordRegex.test(field.val())) {
                                $("." + errClass + "password").remove()
                            }
                        }
                        else if (vldStr === "mobileNumber") {
                            if (mobileRegex.test(field.val())) {
                                $("." + errClass + "mobile").remove()
                            }
                        }
                        else if (startWith(vldStr, "minlen_")) {
                            var len = Number(vldStr.split("_")[1]);
                            if(!(field.val().length < len)){
                                $("." + errClass + "minlen").remove()
                            }
                        }
                        else if (startWith(vldStr, "maxlen_")) {
                            var len = Number(vldStr.split("_")[1]);
                            if(!(field.val().length > len)){
                                $("." + errClass + "maxlen").remove()
                            }
                        }
                        else if (startWith(vldStr, "min_")) {
                            var num = Number(vldStr.split("_")[1]); // 0:min  1:num
                            if (!(Number(field.val()) < num)) {
                                $("." + errClass + "min").remove()
                            }
                        }
                        else if (startWith(vldStr, "max_")) {
                            var num = Number(vldStr.split("_")[1]); // 0:max  1:num
                            if (!(Number(field.val()) > num)) {
                                $("." + errClass + "max").remove()
                            }
                        }
                    }

                })

            })
/*-------------------------------------------submit check-------------------------------------------------------------------------------------- */
            frm.submit(function (ev) {
                var errors = [];
                var fields = $(this).find("input[data-vld],textarea[data-vld]");
                $("."+options.errorDivMainClass).remove()

                fields.each(function () {
                    var field = $(this);
                    var fName = (field.is("["+options.fieldNameAttr+"]")) ? field.attr(options.fieldNameAttr): field.attr("name");
                    var vldStrings = field.attr("data-vld").split("|");
                    var errClass= $(this).attr(options.fieldErrorClassAttr);
                    for (i in vldStrings) {
                        var vldStr = vldStrings[i].trim();
                        if (vldStr === "not-required") {
                            if (field.val()==="") {
                                break;
                            }
                        }
                        if(field.val()===""){
                            var emptyErrorDiv = $("<div>").addClass(options.errorDivMainClass+" "+ errClass + "empty" );
                            emptyErrorDiv.html(fName+" را وارد نمایید");
                            $(this).after(emptyErrorDiv);
                            errors.push("error");
                            break;
                        }
                        if (vldStr === "email") {
                            if(!emailRegex.test(field.val())){
                                var emailErrorDiv = $("<div>").addClass(options.errorDivMainClass+" "+ errClass + "email" );
                                emailErrorDiv.html(fName +" نامعتبر است");
                                $(this).after(emailErrorDiv);
                                errors.push("error");
                            }
                        } else if (vldStr === "url") {
                            if(!urlRegex.test(field.val())){
                                var urlErrorDiv = $("<div>").addClass(options.errorDivMainClass+" "+ errClass + "url" );
                                urlErrorDiv.html(fName+" نامعتبر است");
                                $(this).after(urlErrorDiv);
                                errors.push("error");
                            }
                        }else if (vldStr === "name") {
                            if(!nameRegex.test(field.val())){
                                var nameErrorDiv = $("<div>").addClass(options.errorDivMainClass+" "+ errClass + "name" );
                                nameErrorDiv.html(fName+" نامعتبر است");
                                $(this).after(nameErrorDiv);
                                errors.push("error");
                            }
                        } else if (vldStr === "password") {
                            if (!passwordRegex.test(field.val())) {
                                var passErrorDiv = $("<div>").addClass(options.errorDivMainClass + " " + errClass + "password");
                                passErrorDiv.html(fName + " فقط میتواند شامل حروف لاتین، اعداد و کاراکتر های " + "( ! , @ , # , $ , % , ^ , & ) "+" باشد");
                                $(this).after(passErrorDiv);
                                errors.push("error");
                            }
                        }else if (vldStr === "mobileNumber") {
                            if (!mobileRegex.test(field.val())) {
                                var mobileErrorDiv = $("<div>").addClass(options.errorDivMainClass + " " + errClass + "mobile");
                                mobileErrorDiv.html(fName + " نامعتبر است");
                                $(this).after(mobileErrorDiv);
                                errors.push("error");
                            }
                        }else if (startWith(vldStr, "minlen_")) {
                                    var len = Number(vldStr.split("_")[1]);
                                    if(field.val().length < len){
                                        var minlenErrorDiv = $("<div>").addClass(options.errorDivMainClass+" "+ errClass + "minlen" );
                                        minlenErrorDiv.html(fName +" باید دارای حداقل"+" "+len+" کاراکتر باشد");
                                        $(this).after(minlenErrorDiv);
                                        errors.push("error");
                                    }
                                } else if (startWith(vldStr, "maxlen_")) {
                                    var len = Number(vldStr.split("_")[1]);
                                    if(field.val().length > len){
                                        var maxlenErrorDiv = $("<div>").addClass(options.errorDivMainClass+" "+ errClass + "maxlen" );
                                        maxlenErrorDiv.html(fName+" باید دارای حداکثر"+" "+len+" کاراکتر باشد");
                                        $(this).after(maxlenErrorDiv);
                                        errors.push("error");
                                    }
                                } else if (startWith(vldStr, "min_")) {
                                    var num = Number(vldStr.split("_")[1]); // 0:min  1:num
                                    if (Number(field.val()) < num) {
                                        var minErrorDiv = $("<div>").addClass(options.errorDivMainClass+" "+ errClass + "min" );
                                        minErrorDiv.html(fName+" باید حداقل"+" "+num+" باشد");
                                        $(this).after(minErrorDiv);
                                        errors.push("error");
                                    }
                                } else if (startWith(vldStr, "max_")) {
                                    var num = Number(vldStr.split("_")[1]); // 0:max  1:num
                                    if (Number(field.val()) > num) {
                                        var maxErrorDiv = $("<div>").addClass(options.errorDivMainClass+" "+ errClass + "max" );
                                        maxErrorDiv.html(fName+" باید حداکثر"+" "+num+" باشد");
                                        $(this).after(maxErrorDiv);
                                        errors.push("error");
                                    }
                                }


                            }

                        })

                if (errors.length == 0) {
                    return true;
                } else {
                    ev.preventDefault();

                }
            });

        })

    }
})(jQuery)



