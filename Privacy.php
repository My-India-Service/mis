<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - My India Service</title>
    <!-- font awesome cdn -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- shortcode icon -->
    <link rel="shortcut icon" href="./images/logo my india 22-01.jpg">
    <!-- bootstrap cdn -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #0A142A;
            color: #f8f9fa;
            padding-top: 20px;
            padding-bottom: 20px;
            margin: 0;
            padding: 0;
        }

        .content {
            max-width: 800px;
            margin: auto;
            background-color: #1C2833;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1,
        h2 {
            color: #f1c40f;
        }

        p,
        ul,
        li {
            color: #f8f9fa;
        }

        ul {
            list-style-type: disc;
            padding-left: 20px;
        }

        .line {
            background-color: grey;
        }

        /* Home button styling */
        .home-button {
            position: absolute;
            top: 50px;
            left: 50px;
            background-color: #17A2B8;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px; /* Adding a gap between icon and text */
            font-size: 1em; /* Ensuring font-size is consistent */
        }

        .home-button:hover {
            background-color: #0D6E80;
        }

        .home-button i {
            margin-right: 1px; /* Adding some space between icon and text */
        }

        @media (max-width: 576px) {
            .home-button {
                font-size: 0.9em; /* Slightly reduce font size for smaller screens */
                padding: 8px 8px; /* Adjust padding to be more suitable for smaller screens */
                top: 20px; /* Adjusting the position to fit well on smaller screens */
                left: 10px;
                margin-top: 60px;
            }
            .content{
                margin-bottom: 0px !important;
                margin-top: 0px !important;
            }
        }
    </style>
</head>

<body>
    <?php
    // You can include header.php or any other file here
    // include 'header.php';
    ?>
    <!-- Home button -->
        <a href="./index.php" class="btn home-button"><i class="fas fa-house-user"></i></a>
    <div class="container content" style="margin-bottom: 50px; margin-top: 50px;">
        <h1 class="text-center">Privacy Policy</h1>
        <p class="text-center">Effective Date: <?php echo date('F j, Y'); ?></p>
        <!-- Dynamically display the current date -->

        <p>Welcome to My India Service. We value your privacy and are committed to protecting your personal information.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul>
            <li><strong>Personal Identification Information:</strong> Name, email address, phone number, etc.</li>
            <li><strong>Usage Data:</strong> Information about how you use our website, such as pages visited and time
                spent on each page.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> Cookies and similar technologies to track activity
                on our website.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
            <li>Provide and maintain our service.</li>
            <li>Communicate with you, including for customer service and support.</li>
            <li>Analyze usage and improve our services.</li>
            <li>Comply with legal obligations.</li>
        </ul>

        <h2>3. Sharing Your Information</h2>
        <p>We may share your information with:</p>
        <ul>
            <li><strong>Service Providers:</strong> Companies that provide services to us to help with our business
                activities.</li>
            <li><strong>Legal Authorities:</strong> When required by law or in response to legal processes.</li>
        </ul>

        <h2>4. Security of Your Information</h2>
        <p>We take reasonable measures to protect your information from unauthorized access, disclosure, or alteration.
        </p>

        <h2>5. Your Data Protection Rights</h2>
        <p>You have the right to access, update, or delete your personal information. If you wish to exercise any of
            these rights, please contact us.</p>

        <h2>6. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page.</p>

        <h2>7. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>Email: <a href="mailto:support@myindiaservice.com" style="color: #f1c40f;">support@myindiaservice.com</a></p>
        <p>Dwarka more, Sewak Park, New Delhi, India</p>
    </div>
    <div class="px-5 pb-3">
        <hr class="line">
    </div>
    <?php
    // You can include footer.php or any other file here
    // include 'footer.php';
    ?>
    <!-- Include Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="./footer.js"></script> <!-- Make sure footer.js is accessible in the same directory -->
</body>

</html>
