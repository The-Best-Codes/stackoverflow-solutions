var number = 1; // Start with one, since setInterval won't run the code initially but waits until the first second has passed

// Update the counter every second (1000 ms)
setInterval(function () {
    document.getElementById("counter").innerHTML = number;
    number++;
}, 1000);