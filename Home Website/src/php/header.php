<header class="header">
    <div class="header-top">
        <button class="logo">
            <img src="./src/images/VeilGuard-Logo.png" alt="Veilguard logo">
        </button>
        <search class="search-bar">
            <form id="site-search" role="search">
                <label for="site-search-input">Search:</label>
                <input type="text" id="site-search-input" name="q" placeholder="Search . . ." autocomplete="off">
                <button type="submit" aria-label="Search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--tertiary-color)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </form>
        </search>
    </div>
    <div class="header-bottom">
        <nav class="nav">
            <button type="button" class="nav-btn enc-btn" data-target="home" data-encrypt="Home" data-persist>Home</button>
            <button type="button" class="nav-btn enc-btn" data-target="contact" data-encrypt="Contact" data-persist>Contact</button>
            <button type="button" class="nav-btn enc-btn" data-target="projects" data-encrypt="Projects" data-persist>Projects</button>
            <button type="button" class="nav-btn enc-btn" data-target="qualifications" data-encrypt="Qualifications" data-persist>Qualifications</button>
            <button type="button" class="nav-btn enc-btn" data-target="services" data-encrypt="Services" data-persist>Services</button>
        </nav>
    </div>
</header>