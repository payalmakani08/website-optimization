
// Display a welcome message
window.addEventListener("load", function () {
    console.log("Student Learning Hub loaded successfully!");
});

// Register service worker for caching
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("./sw.js")
            .then(function () {
                console.log("Service Worker Registered");
            })
            .catch(function (error) {
                console.log("Service Worker Error:", error);
            });
    });
}
