function saveFormData() {
    var jsforms = {};    
    var forms = document.getElementsByTagName("form");
    jsforms.count = forms.length;    
    for (var i = 0; i < forms.length; i++) {
        var obj = {};
        var fields = forms[i].getElementsByTagName("input");
        for (var j = 0; j < fields.length; j++) {
            // some forms may not have a label - this needs to be updated
            var value = fields[j].value;
            var key = fields[j].labels[0].innerText;
            obj[key] = value;
        }
        jsforms[i] = obj;
    }    
    localStorage.setItem("__form_data__", JSON.stringify(jsforms));
}

function loadFormData() {
    var objs = JSON.parse(localStorage.getItem("__form_data__"));
    if (objs && objs.count) {
        var forms = document.getElementsByTagName("form");
        for (var i = 0; i < objs.count; i++) {
            var obj = objs[i];
            var fields = forms[i].getElementsByTagName("input");
            
            for (var prop in obj) {
                // find the property in fields
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].labels[0].innerText === prop) {
                        fields[j].value = obj[prop];
                        break;
                    }
                }
            }
        }        
    } else {
        alert("There isn't any form data saved for this page/site");
    }
}