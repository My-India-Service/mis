<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cancellation and Refund Policy - MyIndiaService</title>
    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Bootstrap CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
    <style>
        /* Custom styles for the page */
        body {
            background-color: #0A142A;
            color: #F0F2F5;
            font-family: 'Arial', sans-serif;
            padding-top: 20px;
        }

        .container-fluid {
            background-color: #1A233A;
            padding: 30px;
            border-radius: 10px;
            margin-top: 20px;
        }

        h1 {
            font-size: 3em;
            color: #17A2B8;
            margin-bottom: 20px;
        }

        h3 {
            font-size: 1.5em;
            margin-bottom: 30px;
        }

        ul {
            list-style-type: none;
            padding-left: 0;
        }

        ul li {
            margin-bottom: 20px;
            line-height: 1.6;
        }

        ul .list:before {
            content: "\2022";
            color: #17A2B8;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
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
                margin-top: 50px;
            }
        }
    </style>
</head>

<body>
    <!-- Home button -->
    <a href="./index.php" class="btn home-button"><i class="fas fa-house-user"></i></a>
    <!-- Content start -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 text-center">
                <h1>Cancellation and Refund Policy</h1>
                <hr style="border-color: #17A2B8;">
            </div>
            <div class="col-md-12 text-center mb-5">
                <h3>
                    <?php
                    $companyName = "NB Corporate & Services";
                    echo "$companyName believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:";
                    ?>
                </h3>
            </div>
            <div class="col-md-12">
                <ul>
                    <li class="list">
                        <?php echo "Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them."; ?>
                    </li>
                    <li class="list" >
                        <?php echo "$companyName does not accept cancellation requests for perishable items like flowers, eatables, etc. However, refund/replacement can be made if the customer establishes that the quality of the product delivered is not good."; ?>
                    </li>
                    <li class="list">
                        <?php echo "In case of receipt of damaged or defective items, please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within the same day of receipt of the products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within the same day of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision."; ?>
                    </li>
                    <li class="list">
                        <?php echo "In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them. In case of any refunds approved by $companyName, it will take 6-8 days for the refund to be processed to the end customer."; ?>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- footer -->
    <script src="./footer.js"></script>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>
