## Your question:

```md
I am facing a problem, I have a function defined as follows

\`\`\`js
const myFunction= () =>{
alert("Hi there!!!!")
console.log("From child")
}
\`\`\`

And I wish to call it from a popup, but the instruction `window.parent.myFunction()` does not work; does anyone know how to call the function in the parent?

Current error:

> Uncaught TypeError: window.parent.myFunction is not a function.

I hope to see the message contained in the alert
```

## Solution

I'm not 100% sure why you're using `window.parent()` — I'll assume that you have some type of popup window thing going on.

A `const` function isn't globally exposed, so you probably can't call it from another page. This is really a good thing for security reasons.

You can use `postMessage` instead (this is the best workaround I can think of). Add a listener for messages in your parent page:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Parent Window</title>
    <script>
      // Define the function in the parent
      function myFunction() {
        alert("Hi there!!!!");
        console.log("From parent");
      }

      // Listen for messages from the popup
      window.addEventListener("message", (event) => {
        // Ensure you receive the message only from the expected origin
        if (event.origin !== "http://example.com")
          return; /* Replace example.com with your website. If you don't want any restrictions, remove this line */

        // Check the message data and call the function
        if (event.data === "callParentFunction") {
          myFunction();
        }
      });

      function openPopup() {
        window.open("popup.html", "popupWindow", "width=400,height=400");
      }
    </script>
  </head>
  <body>
    <button onclick="openPopup()">Open Popup</button>
  </body>
</html>
```

In your `popup.html` file, use `postMessage` with `window.opener` to call the main page's function:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Popup Window</title>
    <script>
      function callParentFunction() {
        // Send a message to the parent
        window.opener.postMessage(
          "callParentFunction",
          "http://example.com"
        ); /* If you want to remove restrictions here, replace the website link with an asterisk (*) */
      }
    </script>
  </head>
  <body>
    <button onclick="callParentFunction()">Call Parent Function</button>
  </body>
</html>
```
