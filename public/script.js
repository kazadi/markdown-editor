window.onload = function () {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');
    var codespanArea = document.getElementById('codespanArea');

    pad.addEventListener('keydown', function (e) {
        if (e.keyCode === 9) {
            //get caret position/selection
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var target = e.target;
            var value = e.value;

            // set textarea value to: text before caret + tab + text after caret
            target.value = value.substring(0, start) +
                "\t" +
                value.substring(end);

            // put caret at right position again (add one for the tab)
            this.selectionStart = this.selectionEnd = start + 1;

            //prevent the focus lose
            e.preventDefault();
        }
    });

    var previousMarkdownValue;

    var convertTextAreaToMarkdown = function () {
        var markdownText = pad.value;
        previousMarkdownValue = markdownText;
        html = converter.makeHtml(markdownText);
        codespanArea.innerText = html;
        markdownArea.innerHTML = html;
    };

    var didChangeOccur = function () {
        if (previousMarkdownValue != pad.value) {
            return true;
        }
        return false;
    };

    // every second: check if textarea has changed
    setInterval(function () {
        if (didChangeOccur()) {
            convertTextAreaToMarkdown();
        }
    }, 1000);

    // convert textarea on input change
    pad.addEventListener('input', convertTextAreaToMarkdown);

    //ignore if on home page
    if (document.location.pathname.length > 1) {
        //implement share js
        var documentName = document.location.pathname.substring(1)
        sharejs.open(document.location.pathname, 'text', function (error, doc) {
            doc.attach_textarea(pad);
            convertTextAreaToMarkdown();
        });
    }

    // convert on page load
    convertTextAreaToMarkdown();
};