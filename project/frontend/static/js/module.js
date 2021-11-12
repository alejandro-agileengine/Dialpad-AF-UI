const formFile = document.querySelector('#file-selector');
formFile.addEventListener('change', getData, false);
$("#input_date")[0].value = ""
$("#scheduler_control")[0].checked = false;
$("#message_box")[0].value = ""
$("#filename")[0].value = ""
$("#fakeBrowse")[0].value = "Browse file"

function HandleBrowseClick() {
    var fileinput = document.getElementById("file-selector");
    fileinput.click();
}

function Handlechange() {
    var fileinput = document.getElementById("file-selector");
    var textinput = document.getElementById("filename");
    textinput.value = fileinput.value;
}


function getData() {
    console.log("test")
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        console.log('The File APIs are not fully supported in this browser.');
        return;
    }

    if (!formFile.files) {
        console.log("This browser doesn't seem to support the `files` property of file inputs.");
    } else if (!formFile.files[0]) {
        console.log("No file selected.");
    } else {
        let file = formFile.files[0];
        let fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);

        function receivedText() {
            let data = fr.result;
            let data2 = data.split(" ");
            let final_data = data2[0].split('\r\n');
            final_data.shift();
            final_data.pop();
            processData(final_data);
            $("#calendar_icon").css("top", "56.8%");
            console.log(final_data)
            return final_data;
        }
    }
}

function processData(data) {
    let len = data.length;
    document.getElementById("phones_length").innerHTML = (len.toString() + " messages will be sent")
}

$("#submit").click(function() {
    let value = $("#file-selector")[0].value;
    let date = $("#input_date")[0].value;
    let status = $("#scheduler_control")[0].checked;
    if ((value == "") || (date == "")) {
        alert("Add file and date")
    } else {
        $("body").css("background-color", "#DEDEDE");
        $(".jumbotron").css("background-color", "#DEDEDE");
        $(".loading")[0].hidden = false;
        $("#loading").css("background-color", "#FFF");
        $("#message_box").css("background-color", "#DEDEDE");
        $("input").css("background-color", "#DEDEDE");
        if (!(status)) {
            $("span").css("background-color", "#DEDEDE");
        }
        $("#calendar_icon").css("top", "56.8%")
        setTimeout(function() {
            $(".loading")[0].hidden = true;
            $("body").css("background-color", "#FFF");
            $(".jumbotron").css("background-color", "#FFF");
            $("#message_box").css("background-color", "#FFF");
            $("input").css("background-color", "#FFF");
            document.getElementById("messages_sent").innerHTML = (String($("#phones_length")[0].innerText.split(" ")[0]) + " messages sent succesfully")
            $("#calendar_icon").css("top", "59.2%");
            if (!(status)) {
                $("span").css("background-color", "#FFF");
            }


        }, 4000)
    }

})

$("#scheduler_control").change(function() {
    let status = $("#scheduler_control")[0].checked;
    if (status) {
        let value = $("#file-selector")[0].value;
        let date = $("#input_date")[0].value;
        if ((value == "") || (date == "")) {
            alert("Add file and date")
            $("#scheduler_control")[0].checked = false;
        } else {
            $("span").css("background-color", "#2196F3");
            console.log("creating table")
            let table = document.createElement("table");
            table.setAttribute("class", "normal_table");
            var tableBody = document.createElement('TBODY');
            tableBody.setAttribute("align", "center");
            table.appendChild(tableBody);
            table.setAttribute("table-layout", "fixed");
            table.setAttribute("width", "100%");
            let headers = ["ID", "Message", "Time", "Status"];
            let date = new Date();
            let hour = date.toLocaleString('en-GB').split(",")[1];
            let final_hour = hour.split(":")[0] + ":" + hour.split(":")[1]
            let final_date_hour = $("#input_date")[0].value + final_hour;
            let tcontent3 = ["1", String($("#message_box")[0].value), String(final_date_hour), "Pending"];
            // let tcontent2 = [];
            // const formFile = document.querySelector('#file-selector');
            // let file = formFile.files[0];
            // let fr = new FileReader();
            // fr.onload = receivedText2;
            // fr.readAsText(file);

            // function receivedText2() {
            //     let data = fr.result;
            //     let data2 = data.split(" ");
            //     let final_data = data2[0].split('\r\n');
            //     d = final_data;
            //     d.shift();
            //     d.pop();
            //     for (let index = 0; index < d.length; index++) {
            //         tcontent2.push([index + 1, d[index], $("#input_date")[0].value, "Pending"])

            //     }

            //     for (let index = 0; index <= 3; index++) {
            //         let th = document.createElement("th");
            //         th.appendChild(document.createTextNode(headers[index]));
            //         th.style.padding = "12px";
            //         th.style.background = "#808080";
            //         th.style.color = "white";
            //         tableBody.appendChild(th);
            //     }


            //     // for (var i = 0; i < tcontent2.length; i++) {
            //     //     var tr = document.createElement('TR');
            //     //     tableBody.appendChild(tr);

            //     //     for (var j = 0; j <= 3; j++) {

            //     //         var td = document.createElement('TD');
            //     //         td.appendChild(document.createTextNode(tcontent2[i][j]));
            //     //         td.style.border = "1px solid #ddd";
            //     //         td.style.padding = "8px";
            //     //         tr.appendChild(td);
            //     //     }
            //     // }
            //     var trf = document.createElement('TR');
            //     tableBody.appendChild(trf);
            //     $("#table-container").append(table)
            // }
            for (let index = 0; index <= 3; index++) {
                let th = document.createElement("th");
                th.appendChild(document.createTextNode(headers[index]));
                th.style.padding = "12px";
                th.style.background = "#808080";
                th.style.color = "white";
                th.style.width = "15px";
                tableBody.appendChild(th);
            }

            for (var i = 0; i < 1; i++) {
                var tr = document.createElement('TR');
                tableBody.appendChild(tr);
                for (var j = 0; j <= 3; j++) {
                    var td = document.createElement('TD');
                    td.appendChild(document.createTextNode(tcontent3[j]));
                    td.style.border = "1px solid #ddd";
                    td.style.padding = "8px";
                    td.setAttribute("word-break", "break-all");
                    td.setAttribute("width", "500px");
                    td.setAttribute("align", "center");
                    tr.appendChild(td);
                }
            }
            var trf = document.createElement('TR');
            tableBody.appendChild(trf);
            $("#table-container").append(table)


        }

    } else {
        $("span").css("background-color", "#FFF");
        try {
            $(".normal_table").remove();
        } catch (error) {
            console.log("no table")
        }
    }
})