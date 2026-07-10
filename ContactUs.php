<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - MyIndiaService</title>
    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Bootstrap CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <style>
        /* Global page styles */
        body {
            background-color: #0A142A;
            color: #F0F2F5;
            font-family: 'Arial', sans-serif;
        }

        a {
            color: #17A2B8;
            text-decoration: none;
        }

        a:hover {
            color: #ffffff;
            text-decoration: underline;
        }

        /* Contact header styles */
        .contact-header {
            text-align: center;
            margin-bottom: 50px;
            padding-top: 20px;
            color: #F0F2F5;
        }

        .contact-header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .contact-header p {
            font-size: 1.2em;
            color: #CCCCCC;
        }

        /* Contact info styles */
        .contact-info {
            background-color: #1A233A;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            color: #F0F2F5;
        }

        .contact-info h4 {
            margin-top: 20px;
            font-size: 1.4em;
            color: #17A2B8;
        }

        .contact-info p {
            margin: 10px 0;
            font-size: 1.1em;
        }

        .contact-info p i {
            margin-right: 10px;
        }

        /* Map container styles */
        .map-container {
            height: 400px;
            border-radius: 10px;
            overflow: hidden;
        }

        .rounded {
            border-radius: 10px;
        }
        .line{
            border-bottom: 1px solid gray;
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
                margin-top: 10px;
            }
        }
    </style>
</head>

<body>
    <!-- Home button -->
    <a href="./index.php" class="btn home-button"><i class="fas fa-house-user"></i></a>
    <div class="container">
        <div class="contact-header">
            <h1>Contact Us</h1>
            <p>You may contact us using the information below</p>
        </div>

        <div class="row">
            <!-- Company Info -->
            <div class="col-md-6">
                <div class="contact-info">
                    <h4><i class="fas fa-building"></i> Merchant Legal Entity Name</h4>
                    <p>NB Corporate & Services</p>
                    <h4><i class="fas fa-map-marker-alt"></i> Our Office</h4>
                    <p>HN.69 Sewak Park, Dwarka More,<br>Delhi, PIN: 110059</p>
                    <h4><i class="fas fa-phone-alt"></i> Phone</h4>
                    <p>+91 9990014966</p>
                    <h4><i class="fas fa-envelope"></i> Email</h4>
                    <p><a href="mailto:myindiaservice1@gmail.com">myindiaservice1@gmail.com<br> contact@myindiaservice.com</a></p>
                </div>
            </div>

            <!-- Google Maps Embed -->
            <div class="col-md-6">
                <div class="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.351148887676!2d77.03109987528858!3d28.619236075671996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05e9e9fb961f%3A0xf54d197cb3b1ef41!2sMy%20India%20Service!5e0!3m2!1sen!2sin!4v1719295522192!5m2!1sen!2sin"
                        width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade" class="rounded"></iframe>
                </div>
            </div>
        </div>
    </div>
    <hr class="line mx-5">
    <!-- footer -->
    <script src="./footer.js"></script>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>