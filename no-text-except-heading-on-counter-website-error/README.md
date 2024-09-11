## Solution

The issue is how you linked to the script in your HTML. You should use the `<script>` tag, not `<link>`, like this:

```html
<script src="script1.js"></script>
```

I'd also recommend a change to your JavaScript, since your current code will probably freeze the page. If you want the number to move up once per second, for example, your current JS won't work; it will just move the number up forever without any delay and probably crash.

```html
<!-- begin snippet: js hide: false console: true babel: false -->

<!-- language: lang-js -->

    var number = 1; // Start with one, since setInterval won't run the code initially but waits until the first second has passed

    // Update the counter every second (1000 ms)
    setInterval(function() {
        document.getElementById("counter").innerHTML = number;
        number++;
    }, 1000);

<!-- language: lang-css -->

    body {
        background-color: rgb(255, 169, 0);
    }

    h1, p {
        text-align: center;
        color: rgb(255, 69, 0);
        background-color: rgb(148, 43, 226);
        margin-left: auto;
        margin-right: auto;
    }

<!-- language: lang-html -->

    <!DOCTYPE html>
    <html>
        <head>
            <title>JS Website</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="styles3.css">
            <!-- Correct way to link the JavaScript file -->
            <script src="script1.js"></script>
        </head>
        <body>
            <h1>Counter</h1>
            <p id="counter">0</p>
        </body>
    </html>

<!-- end snippet -->
```

You _could_ keep your original counter implementation, but I don't recommend it. Also, you might want to add `defer` to your script to make sure that the HTML page is fully loaded before running it, or you'll get errors from JS when you try to select the counter element…

```html
<script src="script1.js" defer></script>
```

## References:

**script tag**: https://www.w3schools.com/tags/tag_script.asp
