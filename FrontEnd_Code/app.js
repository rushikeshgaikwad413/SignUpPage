// Send OTP
function sendOtp() {
    const email = document.getElementById('email').value;
    
    if (email) {
        fetch('http://localhost:8092/user/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            // Show OTP input field and label
            document.getElementById('otp').style.display = 'block';
            document.getElementById('otpLabel').style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter your email.');
    }
}

// Signup
function signup() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const moNumber = document.getElementById('moNumber').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const otp = document.getElementById('otp').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Prepare the payload
    const userDto = {
        name: name,
        address: address,
        email: email,
        moNumber: moNumber,
        password: password
    };

    // Verify OTP before signing up
    fetch(`http://localhost:8092/user/verify-otp?otp=${otp}&email=${email}`, {
        method: 'POST'
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Verified') {
            // Proceed with signup if OTP is verified
            fetch('http://localhost:8092/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDto)
            })
            .then(response => response.text())
            .then(data => alert(data))
            .catch(error => console.error('Error:', error));
        } else {
            alert('Invalid or expired OTP. Please try again.');
        }
    })
    .catch(error => console.error('Error:', error));
}
