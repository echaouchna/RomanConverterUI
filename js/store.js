(function(Reflux, converterActions, global) {
    'use strict';

    var person = {
        name: "Nabil",
        age: 29
    };

    var numbers = {
        roman: "",
        arabic: "",
        error: ""
    };

    global.converterStore = Reflux.createStore({
        listenables: [converterActions],
        onConvertRomanToArabic: function() {
            console.log('roman = ' + numbers.roman);
            numbers.error = "";
            if (numbers.roman === "") {
                numbers.arabic = "";
                this.trigger(numbers);
            } else {
                self = this;
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    crossDomain: true,
                    url: "http://localhost:9090/api/convertToArabic?roman=" + numbers.roman,
                    success: function(data) {
                        console.log("success");
                        console.log(JSON.stringify(data));
                        if (data <= 3999) {
                            numbers.arabic = data;
                        } else {
                            numbers.error = "Roman number should be smaller than MMMCMXCIX (3999)";
                        }
                        self.trigger(numbers);
                    },
                    error: function(data) {
                        console.log("error");
                        console.log(JSON.stringify(data));
                        numbers.error = "Wrong roman number";
                        self.trigger(numbers);
                    }
                });
            }
        },
        onConvertArabicToRoman: function() {
            console.log('arabic = ' + numbers.arabic);
            numbers.error = "";
            if (numbers.arabic === "") {
                numbers.roman = "";
                this.trigger(numbers);
            } else {
                self = this;
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    crossDomain: true,
                    url: "http://localhost:9090/api/convertToRoman?arabic=" + numbers.arabic,
                    success: function(data) {
                        console.log("success");
                        console.log(JSON.stringify(data));
                        numbers.roman = data.message;
                        self.trigger(numbers);
                    },
                    error: function(data) {
                        console.log("error");
                        console.log(JSON.stringify(data));
                        numbers.error = "Wrong arabic number, You shoud use integer in the range [1, 3999]";
                        self.trigger(numbers);
                    }
                });
            }
        },
        getInitialState: function() {
            return numbers;
        }
    });

})(window.Reflux, window.converterActions, window);
