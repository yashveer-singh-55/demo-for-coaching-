/* =========================================================
   AXIOM ACADEMY
   GLOBAL INTERACTION ENGINE
========================================================= */


/* ---------------------------------------------------------
   PRELOADER
--------------------------------------------------------- */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    setTimeout(() => {

        preloader.classList.add("loaded");

    }, 700);

});


/* ---------------------------------------------------------
   MOBILE MENU
--------------------------------------------------------- */

const mobileButton =
    document.getElementById("mobileMenuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");


if (mobileButton && mobileMenu) {

    mobileButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

        mobileButton.classList.toggle("open");

    });


    mobileMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

        });

    });

}


/* ---------------------------------------------------------
   CUSTOM CURSOR
--------------------------------------------------------- */

const cursor =
    document.querySelector(".cursor");

const cursorRing =
    document.querySelector(".cursor-ring");


if (cursor && cursorRing && window.innerWidth > 900) {

    document.addEventListener("mousemove", e => {

        cursor.style.transform =
            `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

        cursorRing.style.transform =
            `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

    });


    document.querySelectorAll("a,button,.magnetic").forEach(el => {

        el.addEventListener("mouseenter", () => {

            cursor.classList.add("cursor-hover");

            cursorRing.classList.add("cursor-ring-hover");

        });


        el.addEventListener("mouseleave", () => {

            cursor.classList.remove("cursor-hover");

            cursorRing.classList.remove("cursor-ring-hover");

        });

    });

}


/* ---------------------------------------------------------
   MAGNETIC BUTTONS
--------------------------------------------------------- */

if (window.innerWidth > 900) {

    document.querySelectorAll(".magnetic").forEach(button => {

        button.addEventListener("mousemove", e => {

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX - rect.left - rect.width / 2;

            const y =
                e.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * 0.15}px, ${y * 0.15}px)`;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

}


/* ---------------------------------------------------------
   SCROLL REVEALS
--------------------------------------------------------- */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


document.querySelectorAll(".reveal").forEach(element => {

    revealObserver.observe(element);

});


/* ---------------------------------------------------------
   COUNTERS
--------------------------------------------------------- */

const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const element =
                    entry.target;

                const target =
                    Number(element.dataset.counter);

                let current = 0;

                const duration = 1500;

                const start =
                    performance.now();


                function update(time) {

                    const progress =
                        Math.min(
                            (time - start) / duration,
                            1
                        );

                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            4
                        );

                    current =
                        Math.floor(
                            target * eased
                        );

                    element.textContent =
                        current.toLocaleString();

                    if (progress < 1) {

                        requestAnimationFrame(update);

                    }

                }


                requestAnimationFrame(update);

                counterObserver.unobserve(element);

            });

        },

        {
            threshold: 0.5
        }

    );


document.querySelectorAll("[data-counter]")
    .forEach(counter => {

        counterObserver.observe(counter);

    });


/* ---------------------------------------------------------
   FAQ
--------------------------------------------------------- */

document.querySelectorAll(".faq-question")
    .forEach(button => {

        button.addEventListener("click", () => {

            const item =
                button.parentElement;

            const wasOpen =
                item.classList.contains("open");


            document.querySelectorAll(".faq-item")
                .forEach(other => {

                    other.classList.remove("open");

                });


            if (!wasOpen) {

                item.classList.add("open");

            }

        });

    });


/* ---------------------------------------------------------
   THREE.JS HERO
--------------------------------------------------------- */

const canvas =
    document.getElementById("heroCanvas");


if (canvas && typeof THREE !== "undefined") {

    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            60,
            window.innerWidth /
            window.innerHeight,
            0.1,
            1000
        );


    const renderer =
        new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    camera.position.z = 8;


    /* PARTICLES */

    const particleCount = 1800;

    const geometry =
        new THREE.BufferGeometry();

    const positions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount * 3;
        i += 3
    ) {

        positions[i] =
            (Math.random() - 0.5) * 22;

        positions[i + 1] =
            (Math.random() - 0.5) * 14;

        positions[i + 2] =
            (Math.random() - 0.5) * 15;

    }


    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            color: 0xffffff,

            size: 0.025,

            transparent: true,

            opacity: 0.7

        });


    const particles =
        new THREE.Points(
            geometry,
            material
        );


    scene.add(particles);


    /* WIREFRAME SPHERE */

    const sphereGeometry =
        new THREE.IcosahedronGeometry(
            2.3,
            2
        );


    const sphereMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x5c7cff,

            wireframe: true,

            transparent: true,

            opacity: 0.16

        });


    const sphere =
        new THREE.Mesh(
            sphereGeometry,
            sphereMaterial
        );


    sphere.position.x = 3.2;

    sphere.position.y = 0.2;

    scene.add(sphere);


    /* INNER CORE */

    const coreGeometry =
        new THREE.IcosahedronGeometry(
            1.35,
            2
        );


    const coreMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x8f5cff,

            wireframe: true,

            transparent: true,

            opacity: 0.1

        });


    const core =
        new THREE.Mesh(
            coreGeometry,
            coreMaterial
        );


    core.position.x = 3.2;

    scene.add(core);


    let mouseX = 0;

    let mouseY = 0;


    window.addEventListener(
        "mousemove",
        e => {

            mouseX =
                (e.clientX /
                    window.innerWidth -
                    0.5);

            mouseY =
                (e.clientY /
                    window.innerHeight -
                    0.5);

        }
    );


    function animate() {

        requestAnimationFrame(animate);


        particles.rotation.y += 0.00035;

        particles.rotation.x += 0.0001;


        sphere.rotation.x += 0.002;

        sphere.rotation.y += 0.003;


        core.rotation.x -= 0.003;

        core.rotation.y -= 0.002;


        sphere.position.y +=
            Math.sin(
                performance.now() *
                0.0005
            ) * 0.0005;


        camera.position.x +=
            (mouseX * 0.45 -
                camera.position.x) *
            0.025;


        camera.position.y +=
            (-mouseY * 0.35 -
                camera.position.y) *
            0.025;


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;

            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

        }
    );

}


/* ---------------------------------------------------------
   PARALLAX
--------------------------------------------------------- */

const floatingCards =
    document.querySelectorAll(".floating-card");


if (floatingCards.length) {

    window.addEventListener(
        "mousemove",
        e => {

            const x =
                (e.clientX /
                    window.innerWidth -
                    0.5);

            const y =
                (e.clientY /
                    window.innerHeight -
                    0.5);


            floatingCards.forEach(
                (card, index) => {

                    const amount =
                        (index + 1) * 8;

                    card.style.transform =
                        `translate3d(
                            ${x * amount}px,
                            ${y * amount}px,
                            0
                        ) rotate(${x * 4}deg)`;

                }
            );

        }
    );

}


/* ---------------------------------------------------------
   COURSE DECK
--------------------------------------------------------- */

let deckIndex = 0;


function renderDeck() {

    const cards =
        document.querySelectorAll(
            ".deck-card"
        );


    if (!cards.length) return;


    const total =
        cards.length;


    cards.forEach(
        (card, index) => {

            let relative =
                index - deckIndex;


            if (relative < 0) {

                relative += total;

            }


            let x = 0;

            let y = 0;

            let rotate = 0;

            let scale = 1;

            let opacity = 1;

            let zIndex = 10;


            if (relative === 0) {

                x = 0;

                y = 0;

                rotate = 0;

                scale = 1;

                zIndex = 20;

            }

            else if (relative === 1) {

                x = 150;

                y = 20;

                rotate = 7;

                scale = 0.92;

                opacity = 0.75;

                zIndex = 15;

            }

            else if (relative === 2) {

                x = 275;

                y = 60;

                rotate = 13;

                scale = 0.84;

                opacity = 0.45;

                zIndex = 10;

            }

            else if (relative === 3) {

                x = -275;

                y = 60;

                rotate = -13;

                scale = 0.84;

                opacity = 0.4;

                zIndex = 9;

            }

            else {

                x = -150;

                y = 20;

                rotate = -7;

                scale = 0.92;

                opacity = 0.7;

                zIndex = 15;

            }


            card.style.transform =
                `translate(
                    ${x}px,
                    ${y}px
                )
                rotate(${rotate}deg)
                scale(${scale})`;


            card.style.opacity =
                opacity;

            card.style.zIndex =
                zIndex;

        }
    );


    const position =
        document.getElementById(
            "deckPosition"
        );


    if (position) {

        position.textContent =
            `${String(deckIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

    }

}


function rotateDeck(direction) {

    const cards =
        document.querySelectorAll(
            ".deck-card"
        );


    if (!cards.length) return;


    deckIndex += direction;


    if (deckIndex < 0) {

        deckIndex =
            cards.length - 1;

    }


    if (deckIndex >= cards.length) {

        deckIndex = 0;

    }


    renderDeck();

}


window.rotateDeck =
    rotateDeck;


renderDeck();


/* ---------------------------------------------------------
   COURSE MODAL
--------------------------------------------------------- */

function openCourse(course) {

    const data =
        window.courseData ||
        courseData;


    const selected =
        data[course];


    if (!selected) return;


    let modal =
        document.getElementById(
            "courseModal"
        );


    if (!modal) {

        modal =
            document.createElement(
                "div"
            );


        modal.id =
            "courseModal";


        modal.className =
            "course-modal";


        document.body.appendChild(
            modal
        );

    }


    modal.innerHTML = `

        <div class="modal-backdrop"
             onclick="closeCourse()">
        </div>

        <div class="modal-window">

            <button
                class="modal-close"
                onclick="closeCourse()">
                ×
            </button>

            <span class="section-label">
                PROGRAM
            </span>

            <h2>
                ${selected.title}
            </h2>

            <p>
                ${selected.description}
            </p>

            <div class="modal-subjects">

                ${selected.subjects
                    .map(subject =>
                        `<span>${subject}</span>`
                    )
                    .join("")}

            </div>

            <a href="contact.html"
               class="btn btn-primary">
                Book Counselling →
            </a>

        </div>
    `;


    requestAnimationFrame(() => {

        modal.classList.add("open");

    });

}


function closeCourse() {

    const modal =
        document.getElementById(
            "courseModal"
        );


    if (modal) {

        modal.classList.remove(
            "open"
        );

    }

}


window.openCourse =
    openCourse;

window.closeCourse =
    closeCourse;


/* ---------------------------------------------------------
   FORM
--------------------------------------------------------- */

const form =
    document.getElementById(
        "counsellingForm"
    );


if (form) {

    form.addEventListener(
        "submit",
        e => {

            e.preventDefault();


            const name =
                form.querySelector(
                    '[name="name"]'
                ).value;


            const phone =
                form.querySelector(
                    '[name="phone"]'
                ).value;


            const target =
                form.querySelector(
                    '[name="target"]'
                ).value;


            const message =
                document.getElementById(
                    "formMessage"
                );


            message.innerHTML = `

                <div class="success-message">

                    ✓ Request received.

                    <br>

                    Our counselling team can contact
                    ${name} regarding ${target}.

                </div>

            `;


            form.reset();

        }
    );

}


/* ---------------------------------------------------------
   SMOOTH ANCHOR SCROLL
--------------------------------------------------------- */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        e => {

            const target =
                document.querySelector(
                    link.getAttribute("href")
                );


            if (!target) return;


            e.preventDefault();


            target.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

});


/* ---------------------------------------------------------
   NAVBAR SCROLL EFFECT
--------------------------------------------------------- */

const navbar =
    document.querySelector(
        ".navbar"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;


        if (window.scrollY > 60) {

            navbar.classList.add(
                "scrolled"
            );

        }

        else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);
