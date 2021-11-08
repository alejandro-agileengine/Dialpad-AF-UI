const formFile = document.querySelector('#file-selector');
formFile.addEventListener('change', getData, false);

function getData() {
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
            console.log(fr.result);
            // Do additional processing here
        }
    }
}