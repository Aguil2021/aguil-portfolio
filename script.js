document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================== */

    const menuButton = document.querySelector(".menu-button");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });

        });
    }


    /* =========================
       SCROLL REVEAL
    ========================== */

    const revealElements = document.querySelectorAll(
        ".current-item, .product-window, .case-card, .about-statement, .about-copy, .fellowship-card, .skill-column, .contact-main"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       CUSTOM CURSOR
    ========================== */

    const cursor = document.querySelector(".cursor");
    const cursorRing = document.querySelector(".cursor-ring");

    if (window.innerWidth > 850 && cursor && cursorRing) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;


        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.opacity = "1";
            cursorRing.style.opacity = "1";

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

        });


        function animateCursor() {

            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();


        const interactiveElements = document.querySelectorAll(
            "a, button, .current-item, .product-card, .case-card"
        );


        interactiveElements.forEach(element => {

            element.addEventListener("mouseenter", () => {

                cursorRing.style.width = "55px";
                cursorRing.style.height = "55px";

                cursorRing.style.background = "rgba(21,21,21,.06)";
            });


            element.addEventListener("mouseleave", () => {

                cursorRing.style.width = "34px";
                cursorRing.style.height = "34px";

                cursorRing.style.background = "transparent";
            });

        });
    }


    /* =========================
       HERO PARALLAX
    ========================== */

    const heroHeading = document.querySelector(".hero-main h1");

    if (heroHeading && window.innerWidth > 850) {

        document.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX / window.innerWidth - 0.5) * 8;

            const y =
                (event.clientY / window.innerHeight - 0.5) * 5;

            heroHeading.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }


    /* =========================
       ACTIVE NAVIGATION
    ========================== */

    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-links a");


    const navObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    links.forEach(link => {
                        link.classList.remove("active");
                    });


                    const activeLink =
                        document.querySelector(
                            `.nav-links a[href="#${entry.target.id}"]`
                        );


                    if (activeLink) {
                        activeLink.classList.add("active");
                    }

                }

            });

        },
        {
            rootMargin: "-40% 0px -50% 0px"
        }
    );


    sections.forEach(section => {
        navObserver.observe(section);
    });


    /* =========================
       CURRENT YEAR
    ========================== */

    const yearElement = document.querySelector(
        "footer span:last-child"
    );

    if (yearElement) {
        yearElement.textContent = `© ${new Date().getFullYear()}`;
    }


    /* =========================
       SMOOTH PROJECT HOVER
    ========================== */

    const projectCards =
        document.querySelectorAll(".product-card");


    projectCards.forEach(card => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -3;

            const rotateY =
                ((x / rect.width) - 0.5) * 3;


            card.style.transform =
                `perspective(500px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0)";

        });

    });


    /* =========================
       PAGE LOAD
    ========================== */

    document.body.classList.add("loaded");

});