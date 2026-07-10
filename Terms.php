<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms and Conditions - MyIndiaService</title>
    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- shortcode icon -->
    <link rel="shortcut icon" href="./images/logo my india 22-01.jpg">
    <style>
        /* Custom Styles */
        body {
            background-color: #f8f9fa;
        }

        .terms-header {
            background-color: #0A142A;
            color: white;
            padding: 40px 0px 1px 0px;
            text-align: center;
        }

        .terms-section {
            padding: 50px 0;
            background-color: #0A142A;
        }

        .terms-content {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .terms-content h2 {
            margin-top: 20px;
        }

        .terms-content p,
        .terms-content li {
            line-height: 1.6;
        }

        .line {
            background-color: gray;
            height: 3px;
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
            gap: 5px;
            /* Adding a gap between icon and text */
            font-size: 1em;
            /* Ensuring font-size is consistent */
        }

        .home-button:hover {
            background-color: #0D6E80;
        }

        .home-button i {
            margin-right: 1px;
            /* Adding some space between icon and text */
        }

        @media (max-width: 576px) {
            .home-button {
                font-size: 0.9em;
                /* Slightly reduce font size for smaller screens */
                padding: 8px 8px;
                /* Adjust padding to be more suitable for smaller screens */
                top: 20px;
                /* Adjusting the position to fit well on smaller screens */
                left: 20px;
                margin-top: 25px;
            }
        }
    </style>
</head>

<body>
    <?php
    // You can include a header file here if you have one
    // include 'header.php';
    ?>
    <!-- Home button -->
    <a href="./index.php" class="btn home-button"><i class="fas fa-house-user"></i></a>
    <!-- Header Section -->
    <header class="terms-header">
        <h1>Terms and Conditions</h1>
        <p>Effective Date: <?php echo date('F j, Y'); // Display current date ?></p>
    </header>

    <!-- Terms and Conditions Section -->
    <section class="terms-section">
        <div class="pb-5 px-5">
            <hr class="line">
        </div>
        <div class="container">
            <div class="terms-content">
                <h2>1. Introduction</h2>
                <p>Welcome to MyIndiaService! These terms and conditions outline the rules and regulations for the use
                    of our website and services. By accessing or using our website, you agree to comply with and be
                    bound by these terms. If you do not agree with these terms, please do not use our services.</p>

                <h2>2. Definitions</h2>
                <p>In these terms and conditions:</p>
                <ul>
                    <li><strong>"Company"</strong> refers to MyIndiaService.</li>
                    <li><strong>"User"</strong> refers to any individual or entity accessing or using our services.</li>
                    <li><strong>"Services"</strong> refer to all products and services offered by MyIndiaService,
                        including website design, development, and maintenance.</li>
                </ul>

                <h2>3. Use of Services</h2>
                <p>Users agree to use our services in compliance with all applicable laws and regulations. The company
                    reserves the right to refuse service to anyone at any time for any reason. Users must not:</p>
                <ul>
                    <li>Use our services for any illegal or unauthorized purpose.</li>
                    <li>Disrupt or interfere with the security or functionality of our services.</li>
                    <li>Copy, modify, or distribute any part of our services without our explicit consent.</li>
                </ul>

                <h2>4. Intellectual Property</h2>
                <p>All content, trademarks, and data on our website and provided through our services are the property
                    of MyIndiaService or its licensors. Users are granted a limited, non-exclusive, non-transferable
                    license to access and use the content for personal or business purposes, subject to these terms.</p>

                <h2>5. Payments and Refunds</h2>
                <p>All payments for services provided by MyIndiaService must be made in accordance with the agreed
                    payment terms. Our payment policies include:</p>
                <ul>
                    <li>Payment terms will be specified in the service agreement or invoice provided.</li>
                    <li>Refunds are provided only under specific circumstances as outlined in our refund policy.</li>
                    <li>In case of non-payment, MyIndiaService reserves the right to suspend or terminate the services.
                    </li>
                </ul>

                <h2>6. Limitation of Liability</h2>
                <p>MyIndiaService is not liable for any direct, indirect, incidental, or consequential damages arising
                    out of or in connection with the use of our services. We make no warranties or representations about
                    the accuracy or completeness of our services. Users agree to use our services at their own risk.</p>

                <h2>7. Indemnification</h2>
                <p>Users agree to indemnify and hold harmless MyIndiaService and its affiliates, employees, and agents
                    from any claims, damages, or expenses arising out of their use of our services or violation of these
                    terms.</p>

                <h2>8. Changes to Terms and Conditions</h2>
                <p>MyIndiaService reserves the right to update or modify these terms and conditions at any time. We will
                    notify users of any significant changes by posting the updated terms on our website. Continued use
                    of our services after any changes constitutes acceptance of the new terms.</p>

                <h2>9. Governing Law</h2>
                <p>These terms and conditions are governed by and construed in accordance with the laws of India. Any
                    disputes arising from these terms or the use of our services will be subject to the exclusive
                    jurisdiction of the courts of India.</p>

                <h2>10. Contact Information</h2>
                <p>If you have any questions or concerns about these terms and conditions, please contact us at:</p>
                <p>Email: <a href="mailto:myindiaservice1@gmail.com">myindiaservice1@gmail.com</a></p>
                <p>Phone: +91-9990014966</p>
                <p>Address: Dwarka more, Sewak Park, New Delhi, India</p>
            </div>
        </div>
        <div class="px-5 pt-5">
            <hr class="line">
        </div>
    </section>

    <?php
    // You can include a footer file here if you have one
    // include 'footer.php';
    ?>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./footer.js"></script> <!-- Make sure footer.js is accessible in the same directory -->
</body>

</html>