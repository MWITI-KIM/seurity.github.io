document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const correctPassword = "secure123"; // Replace with a hashed value in production
    const enteredPassword = document.getElementById("password").value;

    if (enteredPassword !== correctPassword) {
        triggerAlarm();
    } else {
        alert("Login successful!");
    }
});

document.getElementById("fingerprintAuth").addEventListener("click", async function () {
    if (window.PublicKeyCredential) {
        try {
            // Simulate WebAuthn request
            const publicKey = {
                challenge: new Uint8Array(32), // Replace with actual server-generated challenge
                rp: { name: "Secure App" },
                user: {
                    id: new Uint8Array(16), // Replace with user's unique ID
                    name: "user@example.com",
                    displayName: "User Example"
                },
                pubKeyCredParams: [{ alg: -7, type: "public-key" }]
            };

            const credential = await navigator.credentials.create({ publicKey });

            if (credential) {
                alert("Fingerprint recognized!");
            } else {
                triggerAlarm();
            }
        } catch (error) {
            triggerAlarm();
        }
    } else {
        alert("Fingerprint authentication not supported on this device.");
    }
});

function triggerAlarm() {
    const alarm = document.getElementById("alarmSound");
    alarm.play();
    al