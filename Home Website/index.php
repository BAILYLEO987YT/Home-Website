<?php require_once(__DIR__ . "/src/php/functions.php");?>
<html>
    <!-- if your reading this, you just lost the game >:3 -->
    <head>
        <link rel="stylesheet" href="./src/css/main.css">
        <link rel="stylesheet" href="./src/css/un-helper-bot.css">
        <script src="./src/js/head.js"></script>
        <script src="./src/js/functions.js"></script>
        <script defer src="./src/js/screen-saver.js"></script>
        <script defer src="./src/js/encrypted.js"></script>
        <script defer src="./src/js/slider.js"></script>
        <script defer src="./src/js/un-helper-bot.js"></script>
        <script defer src="./src/js/foot.js"></script>
        <title id="title">Veilguard</title>
        <link rel="icon" type="image/x-icon" href="./src/images/VeilGuard-Shield.png">
    </head>
    <body>
        <?php include_once(__DIR__ ."/src/php/un-helper-bot.php");?>
        <div id="page">
            <?php 
            include_once(__DIR__ . "/src/php/header.php");
            ?>
            <main>
                <section id="home" class="segment">
                    <div style="padding-top: 15vh; padding-bottom: 15vh;">
                        <div class="reveal-stage" data-reveal>
                            <article class="reveal-panel reveal-panel--left" data-panel="left">
                                <h2 class="reveal-panel__title">Software</h2>
                                <p>
                                Developed to fix <strong>modern issues</strong> with modern tools from scratch, avoiding the headache of patching old software.
                                </p>
                            </article>
                            <div class="reveal-center">
                                <div class="reveal-logo" role="button" tabindex="0"
                                    aria-label="Drag left or right to reveal more. Use the arrow keys if you prefer.">
                                    <div style="background-color:var(--main-color); border-radius:var(--radius);">
                                        <img src="./src/images/VeilGuard-Shield.png" alt="Veilguard logo">
                                    </div>
                                </div>
                                <p class="reveal-hint" aria-hidden="true">← drag →</p>
                            </div>
                            <article class="reveal-panel reveal-panel--right" data-panel="right">
                                <h2 class="reveal-panel__title">SI</h2>
                                <p>
                                SI <strong>assisted</strong> not driven. in an age where SI is used to attack systems, we utilise SI to help defend you systems.
                                </p>
                            </article>
                        </div>
                    </div>
                    <div>
                        <?php
                        $projectsJsonFile = __DIR__ . "/src/json/projects.json";
                        $projects = json_decode(file_get_contents($projectsJsonFile), true);
                        $featuredKey = array_rand($projects, 1);
                        $featuredProject = $projects[$featuredKey];
                        ?>
                        <div style="width:60vw; margin:0 auto">
                            <h2 style="padding-bottom:1vh;">Featured Project</h2>
                            <article class="project nav-btn" data-target="projects">
                                <h3 class="project-title"><?= htmlspecialchars($featuredProject['title'] ?? '') ?></h3>
                                <p class="project-desc"><?= htmlspecialchars($featuredProject['description'] ?? '') ?></p>
                                <?php displayTags($featuredProject['tags'] ?? []); ?>
                            </article>
                        </div>
                    </div>
                </section>
                <section id="contact" class="segment">
    hello
                </section>
                <section id="projects" class="segment projects">
                    <div style="padding:2.5vh;">
                        <h2 style="padding-bottom:2vh;">Projects</h2>
                        <div class="projects-filter" id="projects-filter" hidden>
                            <span id="projects-filter-label"></span>
                            <button type="button" class="projects-filter-clear" id="projects-filter-clear">Clear ✕</button>
                        </div>
                        <p class="projects-empty" id="projects-empty" hidden>No projects match that search.</p>
                        <div class="projects-grid" id="projects-grid">
                            <?php
                            foreach ($projects as $id) {
                                displayProject(
                                    $id["title"] ?? '',
                                    $id["description"] ?? '',
                                    $id["tags"] ?? [],
                                    $id["link"] ?? ''
                                );
                            }?>
                        </div>
                    </div>
                </section>
                <section id="qualifications" class="segment">
    hello
                </section>
                <section id="services" class="segment">
                    <div>
                        <div class="carousel" data-carousel>
                            <div class="carousel-viewport">
                                <div class="carousel-track">
                                    <?php
                                    $servicesJsonFile = __DIR__ . "/src/json/services.json";
                                    $services = json_decode(file_get_contents($servicesJsonFile), true);
                                    foreach ($services as $id) {
                                        displayServices(
                                            $id["title"] ?? '',
                                            $id["description"] ?? '',
                                            $id["image"] ?? ['', '']
                                        );
                                    }?>
                                </div>
                            </div>
                            <button class="carousel-btn prev" type="button" aria-label="Previous slide">&#10094;</button>
                            <button class="carousel-btn next" type="button" aria-label="Next slide">&#10095;</button>
                            <div class="carousel-dots" role="tablist" aria-label="Slide navigation"></div>
                        </div>
                    </div>
                </section>
            </main>
            <?php include_once(__DIR__ . "/src/php/footer.php");?>
        </div>
        <canvas id="screensaver" aria-hidden="true"></canvas>
    </body>
</html>

<!-- 
TODO: 
- create a home section
- create a contact section that lists methods to contact (and think of a way to contact the host pc directly)
- create a qualification section listing my qualifications
- add other sections that may be nice to have
- make the search bar actually useful (partial)
- make the project cards buttons and that link to seperate pages or expand to tell/show more about the project
-->