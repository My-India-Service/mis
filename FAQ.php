<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FAQ - MyIndiaService</title>
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

        .faq-header {
            background-color: #0A142A;
            color: white;
            padding: 30px 0;
        }

        .faq-section {
            padding: 50px 0;
        }

        .faq-item {
            margin-bottom: 30px;
        }

        .accordion-button {
            background-color: #0A142A;
            color: #fff;
        }

        .accordion-button:focus,
        .accordion-button:not(.collapsed) {
            background-color: #0d6efd;
            color: white;
        }

        .accordion-button:hover {
            background-color: #0056b3;
            color: white;
        }

        .accordion-body {
            background-color: #f1f1f1;
        }

        .text-decoration-none:hover {
            text-decoration: underline;
        }

        .line {
            height: 3px;
            background-color: gray;
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
                left: 15px;
                margin-bottom: 100px;
            }
        }
    </style>
</head>

<body>
    <?php
    // Include header or navigation PHP file if available
    // include 'header.php';
    ?>
    <!-- Home button -->
    <a href="./index.php" class="btn home-button"><i class="fas fa-house-user"></i></a>
    <!-- Header Section -->
    <header class="faq-header text-center">
    <div class="mb-5"></div>
        <h1>Frequently Asked Questions</h1>
        <p>Your questions answered by MyIndiaService</p>
        <div class="px-5 pt-2">
            <hr class="line">
        </div>
        </div>
    </header>
    <!-- FAQ Section -->
    <section class="faq-section" style="background-color: #0A142A;">
        <div class="container">
            <div class="accordion" id="faqAccordion">
                <!-- FAQ Item 1 -->
                <div class="accordion-item faq-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            What services does MyIndiaService offer?
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                        data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            MyIndiaService specializes in website design and development, including custom website
                            creation, e-commerce solutions, CMS integration, mobile responsiveness, and ongoing website
                            maintenance and support.
                        </div>
                    </div>
                </div>
                <!-- FAQ Item 2 -->
                <div class="accordion-item faq-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            What types of websites do you develop?
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                        data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            We develop a wide range of websites, including personal blogs, corporate websites,
                            e-commerce stores, portfolios, and custom web applications tailored to specific business
                            needs.
                        </div>
                    </div>
                </div>
                <!-- FAQ Item 3 -->
                <div class="accordion-item faq-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            How do I get started with a new website project?
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                        data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            To start, you can contact us through our website or call our customer service. We'll
                            schedule a consultation to discuss your project requirements, goals, and budget.
                        </div>
                    </div>
                </div>
                <!-- FAQ Item 4 -->
                <div class="accordion-item faq-item">
                    <h2 class="accordion-header" id="headingFour">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            How long does it take to develop a website?
                        </button>
                    </h2>
                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                        data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            The timeline depends on the complexity and size of the project. A basic website might take
                            4-6 weeks, while more complex sites, such as e-commerce or custom applications, can take
                            several months.
                        </div>
                    </div>
                </div>
                <!-- FAQ Item 5 -->
                <div class="accordion-item faq-item">
                    <h2 class="accordion-header" id="headingFive">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            Can I update my website after it’s been launched?
                        </button>
                    </h2>
                    <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
                        data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            Yes, all our websites come with an easy-to-use CMS (Content Management System) that allows
                            you to make updates. We also offer ongoing support if you prefer us to handle the updates.
                        </div>
                    </div>
                </div>
                <!-- FAQ Item 6 -->
                <div class="accordion-item faq-item">
                    <h2 class="accordion-header" id="headingSix">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                            How much does a new website cost?
                        </button>
                    </h2>
                    <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix"
                        data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            The cost varies depending on the project’s complexity, features, and design requirements. We
                            provide custom quotes after an initial consultation to understand your needs better.
                        </div>
                    </div>
                </div>
                <!-- FAQ Item 7 -->
                <div class="accordion-item faq-item">
                    <h2 class="accordion-header" id="headingSeven">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                            Do you offer payment plans?
                        </button>
                    </h2>
                    <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingSeven"
                        data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            Yes, we offer flexible payment plans to make our services accessible. Typically, we require
                            a deposit upfront, with the remaining balance spread over the project’s duration or upon
                            completion.
                        </div>
                    </div>
                </div>
                <!-- FAQ Item 8 -->
                <div class="accordion-item faq-item">
                    <h2 class="accordion-header" id="headingEight">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                            Are there any additional costs associated with website development?
                        </button>
                    </h2>
                    <div id="collapseEight" class="accordion-collapse collapse" aria-labelledby="headingEight"
                        data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            Additional costs can include domain registration, hosting fees, premium plugins or themes,
                            and ongoing maintenance. We will provide a detailed breakdown of all potential costs
                            upfront.
                        </div>
                    </div>
                </div>
                <!-- FAQ Item 9 -->
                <div class="accordion-item faq-item">
                    <h2 class="accordion-header" id="headingNine">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                            What platforms and technologies do you use?
                        </button>
                    </h2>
                    <div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingNine"
                        data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            We use various platforms and technologies, including HTML5, CSS3, JavaScript, PHP, PHP
                            Laravel, WordPress, NodeJS, and others, depending on the project requirements.
                        </div>
                    </div>
                </div>
                <!-- FAQ Item 10 -->
                <div class="accordion-item faq-item">
                    <h2 class="accordion-header" id="headingTen">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                            How can I contact MyIndiaService?
                        </button>
                    </h2>
                    <div id="collapseTen" class="accordion-collapse collapse" aria-labelledby="headingTen"
                        data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            You can contact us via our website’s <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSd97gw9-iWKjDjbughFN2bTmiMzM53Awf8Cz78YvuTcljCxxw/viewform"
                                class="text-decoration-none" target="_blank">contact form</a>, email us at
                            myindiaservice1@gmail.com, or call us at +91-9990708450.
                        </div>
                    </div>
                </div>
                <!-- Add more FAQ items as needed -->
            </div>
        </div>
        <div class="px-5 pt-2">
            <hr class="line">
        </div>
    </section>

    <?php
    // Include footer PHP file if available
    // include 'footer.php';
    ?>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./footer.js"></script>
</body>

</html>