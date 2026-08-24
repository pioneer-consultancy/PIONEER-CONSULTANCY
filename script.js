/* =========================================================
   PIONEER — CLEAN COMPLETE SCRIPT
   PART 1 OF 2

   Designed for the current Pioneer index.html

   Main flow:
   Splash
      ↓
   Welcome
      ↓
   Get Started
      ↓
   Home Dashboard

   EmailJS:
   Service: service_s6o1qnv
   Education: template_19kwdvr
   Jobs: template_dhbaivp
========================================================= */


/* =========================================================
   EMAILJS
========================================================= */

const PIONEER_EMAILJS = {
    serviceId: "service_s6o1qnv",
    educationTemplateId: "template_19kwdvr",
    jobsTemplateId: "template_dhbaivp",
    publicKey: "wEO6lCBpvzjXiqJxl"
};

let emailJSReady = false;


/* =========================================================
   PIONEER LOGO
========================================================= */

const PIONEER_LOGO_URL =
    "https://i.postimg.cc/NFJjZDm1/Chat-GPT-Image-Aug-23-2026-06-17-24-PM.png";


function setupPioneerLogo() {

    document
        .querySelectorAll("img")
        .forEach((img) => {

            const isPioneerLogo =
                img.classList.contains("splash-logo") ||
                img.classList.contains("pioneer-inline-logo") ||
                img.closest(".logo-icon") ||
                img.closest(".auth-logo");

            if (isPioneerLogo) {
                img.src = PIONEER_LOGO_URL;
            }
        });
}


/* =========================================================
   DOM HELPER
========================================================= */

const $ = (id) => document.getElementById(id);


/* =========================================================
   START APPLICATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializePioneer();

});


/* =========================================================
   INITIALIZE
========================================================= */

function initializePioneer() {

    initializeEmailJS();

    setupPioneerLogo();

    setupSplashScreen();

    setupAuthentication();

    setupNavigation();

    setupEducation();

    setupJobs();

    restoreSession();

    console.log("Pioneer: application initialized.");

}


/* =========================================================
   EMAILJS INITIALIZATION
========================================================= */

function initializeEmailJS() {

    if (typeof emailjs === "undefined") {

        console.warn(
            "Pioneer: EmailJS library was not loaded."
        );

        emailJSReady = false;

        return;
    }

    try {

        emailjs.init({
            publicKey: PIONEER_EMAILJS.publicKey
        });

        emailJSReady = true;

        console.log(
            "Pioneer: EmailJS initialized."
        );

    } catch (error) {

        emailJSReady = false;

        console.error(
            "Pioneer: EmailJS initialization failed:",
            error
        );
    }
}


/* =========================================================
   SPLASH SCREEN
========================================================= */

function setupSplashScreen() {

    const splash = $("splashScreen");

    if (!splash) {

        console.warn(
            "Pioneer: splashScreen not found."
        );

        showWelcomeScreen();

        return;
    }

    /*
     * Make absolutely sure the splash starts visible.
     */

    splash.style.display = "flex";
    splash.style.opacity = "1";
    splash.style.visibility = "visible";
    splash.style.pointerEvents = "auto";

    /*
     * Hide the real application while
     * the splash animation is running.
     */

    const loginPage = $("loginPage");

    if (loginPage) {

        loginPage.style.visibility = "hidden";
        loginPage.style.opacity = "0";
    }

    /*
     * Give the logo animation time to play.
     * When the splash ends, the Welcome page is shown.
     * The Get Started button then opens the Home dashboard.
     */

    setTimeout(() => {

        splash.style.transition =
            "opacity 0.8s ease, visibility 0.8s ease";

        splash.style.opacity = "0";
        splash.style.visibility = "hidden";
        splash.style.pointerEvents = "none";

        if (loginPage) {

            loginPage.style.visibility = "visible";
            loginPage.style.opacity = "1";

            loginPage.style.transition =
                "opacity 0.6s ease";
        }

        showWelcomeScreen();

    }, 2800);


    /*
     * Completely remove the splash.
     */

    setTimeout(() => {

        splash.style.display = "none";

    }, 3700);
}


/* =========================================================
   AUTHENTICATION SCREEN CONTROL
========================================================= */

function showAuthScreen(screen) {

    const welcome = $("welcomeScreen");
    const signIn = $("signInScreen");
    const signUp = $("signUpScreen");

    if (welcome) {
        welcome.classList.add("hidden");
    }

    if (signIn) {
        signIn.classList.add("hidden");
    }

    if (signUp) {
        signUp.classList.add("hidden");
    }


    if (screen === "welcome" && welcome) {

        welcome.classList.remove("hidden");
    }


    if (screen === "signin" && signIn) {

        signIn.classList.remove("hidden");
    }


    if (screen === "signup" && signUp) {

        signUp.classList.remove("hidden");
    }
}


/* =========================================================
   SHOW WELCOME
========================================================= */

function showWelcomeScreen() {

    const loginPage = $("loginPage");
    const homePage = $("homePage");

    if (homePage) {

        homePage.classList.add("hidden");
    }

    if (loginPage) {

        loginPage.classList.remove("hidden");

        loginPage.style.visibility = "visible";
        loginPage.style.opacity = "1";
    }

    showAuthScreen("welcome");
}


/* =========================================================
   SHOW HOME
========================================================= */

function showHomePage() {

    const loginPage = $("loginPage");
    const homePage = $("homePage");

    if (loginPage) {

        loginPage.classList.add("hidden");
    }

    if (homePage) {

        homePage.classList.remove("hidden");
    }

    showHomeSection("home");
}


/* =========================================================
   HOME SECTIONS
========================================================= */

function showHomeSection(section) {

    const sections = [
        "homeContent",
        "educationContent",
        "jobsContent"
    ];

    sections.forEach((id) => {

        const element = $(id);

        if (element) {

            element.classList.add("hidden");
        }
    });


    const buttons = [
        "homeNavButton"
    ];

    buttons.forEach((id) => {

        const button = $(id);

        if (button) {

            button.classList.remove("active");
        }
    });


    if (section === "home") {

        $("homeContent")?.classList.remove(
            "hidden"
        );

        $("homeNavButton")?.classList.add(
            "active"
        );
    }


    if (section === "education") {

        $("educationContent")?.classList.remove(
            "hidden"
        );
    }


    if (section === "jobs") {

        $("jobsContent")?.classList.remove(
            "hidden"
        );

        fillJobUserDetails();
    }
}


/* =========================================================
   AUTHENTICATION SETUP
========================================================= */

function setupAuthentication() {

    $("startButton")?.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            showHomePage();
        }
    );
}


/* =========================================================
   SIGN UP
========================================================= */

function handleSignup(event) {

    event.preventDefault();


    const name =
        $("signUpName")
            ?.value
            .trim() || "";


    const email =
        $("signUpEmail")
            ?.value
            .trim()
            .toLowerCase() || "";


    const password =
        $("signUpPassword")
            ?.value || "";


    const confirmPassword =
        $("confirmSignUpPassword")
            ?.value || "";


    const mobile =
        $("mobileNumber")
            ?.value
            .trim() || "";


    const terms =
        $("termsCheckbox");


    /* -------------------------------------------------------
       VALIDATION
    ------------------------------------------------------- */

    if (name.length < 2) {

        showMessage(
            "Please enter your full name.",
            "error"
        );

        return;
    }


    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email)
    ) {

        showMessage(
            "Please enter a valid email address.",
            "error"
        );

        return;
    }


    if (password.length < 6) {

        showMessage(
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    if (
        password !==
        confirmPassword
    ) {

        showMessage(
            "Passwords do not match.",
            "error"
        );

        return;
    }


    if (
        !/^\d{10}$/.test(
            mobile
        )
    ) {

        showMessage(
            "Please enter a valid 10-digit mobile number.",
            "error"
        );

        return;
    }


    if (
        terms &&
        !terms.checked
    ) {

        showMessage(
            "Please agree to the Pioneer terms and privacy policy.",
            "error"
        );

        return;
    }


    /* -------------------------------------------------------
       CHECK EXISTING ACCOUNT
    ------------------------------------------------------- */

    const accounts =
        getAccounts();


    const existing =
        accounts.find(
            (account) =>
                account.email ===
                email
        );


    if (existing) {

        showMessage(
            "An account with this email already exists. Please sign in.",
            "error"
        );

        return;
    }


    /* -------------------------------------------------------
       CREATE USER
    ------------------------------------------------------- */

    const user = {

        name,

        email,

        password,

        mobile,

        createdAt:
            new Date().toISOString()

    };


    accounts.push(user);

    saveAccounts(accounts);

    setCurrentUser(user);


    /* -------------------------------------------------------
       RESET FORM
    ------------------------------------------------------- */

    $("signUpForm")
        ?.reset();


    /* -------------------------------------------------------
       GO HOME
    ------------------------------------------------------- */

    showHomePage();

    updateProfileDisplay();

    showMessage(
        `Welcome to Pioneer, ${name}! 🚀`
    );
}


/* =========================================================
   SIGN IN
========================================================= */

function handleLogin(event) {

    event.preventDefault();


    const email =
        $("email")
            ?.value
            .trim()
            .toLowerCase() || "";


    const password =
        $("password")
            ?.value || "";


    if (!email) {

        showMessage(
            "Please enter your email address.",
            "error"
        );

        return;
    }


    if (!password) {

        showMessage(
            "Please enter your password.",
            "error"
        );

        return;
    }


    const accounts =
        getAccounts();


    const user =
        accounts.find(
            (account) =>
                account.email ===
                    email &&
                account.password ===
                    password
        );


    if (!user) {

        showMessage(
            "Invalid email or password.",
            "error"
        );

        return;
    }


    setCurrentUser(user);


    $("loginForm")
        ?.reset();


    showHomePage();

    updateProfileDisplay();

    showMessage(
        `Welcome back, ${user.name}! 👋`
    );
}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function getAccounts() {

    try {

        const saved =
            localStorage.getItem(
                "pioneerAccounts"
            );

        if (!saved) {

            return [];
        }

        const accounts =
            JSON.parse(saved);

        return Array.isArray(accounts)
            ? accounts
            : [];

    } catch (error) {

        console.error(
            "Pioneer: accounts read error:",
            error
        );

        return [];
    }
}


function saveAccounts(accounts) {

    try {

        localStorage.setItem(
            "pioneerAccounts",
            JSON.stringify(accounts)
        );

    } catch (error) {

        console.error(
            "Pioneer: accounts save error:",
            error
        );
    }
}


function getCurrentUser() {

    try {

        const saved =
            localStorage.getItem(
                "pioneerCurrentUser"
            );

        if (!saved) {

            return null;
        }

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "Pioneer: current user read error:",
            error
        );

        return null;
    }
}


function setCurrentUser(user) {

    localStorage.setItem(
        "pioneerCurrentUser",
        JSON.stringify(user)
    );
}


function clearCurrentUser() {

    localStorage.removeItem(
        "pioneerCurrentUser"
    );
}


/* =========================================================
   PASSWORD STRENGTH
========================================================= */

function updatePasswordStrength() {

    const password =
        $("signUpPassword")
            ?.value || "";


    const bar =
        $("passwordStrengthBar");


    const text =
        $("passwordStrengthText");


    if (!bar || !text) {

        return;
    }


    let strength = 0;


    if (password.length >= 6) {

        strength++;
    }


    if (password.length >= 10) {

        strength++;
    }


    if (/[A-Z]/.test(password)) {

        strength++;
    }


    if (/[0-9]/.test(password)) {

        strength++;
    }


    if (/[^A-Za-z0-9]/.test(password)) {

        strength++;
    }


    const levels = [

        {
            width: "0%",
            message:
                "Use at least 6 characters."
        },

        {
            width: "25%",
            message:
                "Weak password."
        },

        {
            width: "50%",
            message:
                "Fair password."
        },

        {
            width: "75%",
            message:
                "Good password."
        },

        {
            width: "90%",
            message:
                "Strong password."
        },

        {
            width: "100%",
            message:
                "Very strong password."
        }

    ];


    const level =
        levels[
            Math.min(
                strength,
                levels.length - 1
            )
        ];


    bar.style.width =
        level.width;


    text.textContent =
        level.message;
}


/* =========================================================
   MESSAGE SYSTEM
========================================================= */

function showMessage(
    message,
    type = "success"
) {

    const box =
        $("messageBox");


    if (!box) {

        console.log(
            `Pioneer ${type}:`,
            message
        );

        return;
    }


    box.textContent =
        message;


    box.className =
        `message-box ${type}`;


    box.classList.remove(
        "hidden"
    );


    clearTimeout(
        window.pioneerMessageTimer
    );


    window.pioneerMessageTimer =
        setTimeout(
            () => {

                box.classList.add(
                    "hidden"
                );

            },
            4500
        );
}


/* =========================================================
   HOME NAVIGATION
========================================================= */

function setupNavigation() {

    $("homeNavButton")
        ?.addEventListener(
            "click",
            () => {

                showHomeSection("home");

            }
        );


    $("educationButton")
        ?.addEventListener(
            "click",
            () => {

                showHomeSection("education");

            }
        );


    $("jobsButton")
        ?.addEventListener(
            "click",
            () => {

                showHomeSection("jobs");

            }
        );


    $("backFromEducationButton")
        ?.addEventListener(
            "click",
            () => {

                showHomeSection("home");

            }
        );


    $("backFromJobsButton")
        ?.addEventListener(
            "click",
            () => {

                showHomeSection("home");

            }
        );


    $("logoutButton")
        ?.addEventListener(
            "click",
            () => {

                clearCurrentUser();

                showWelcomeScreen();

                showMessage(
                    "You have been signed out."
                );

            }
        );
}


/* =========================================================
   PROFILE DISPLAY
========================================================= */

function updateProfileDisplay() {

    const user =
        getCurrentUser();


    if (!user) {

        return;
    }


    const profileName =
        $("profileName");


    const profileEmail =
        $("profileEmail");


    const profileMobile =
        $("profileMobile");


    const homeUserName =
        $("homeUserName");


    if (profileName) {

        profileName.textContent =
            user.name ||
            "Pioneer User";
    }


    if (profileEmail) {

        profileEmail.textContent =
            user.email ||
            "Not available";
    }


    if (profileMobile) {

        profileMobile.textContent =
            user.mobile ||
            "Not available";
    }


    if (homeUserName) {

        homeUserName.textContent =
            user.name ||
            "Pioneer User";
    }
}


/* =========================================================
   PROFILE PHOTO
========================================================= */

function loadProfilePhoto() {

    const photo =
        $("profilePhoto");


    const user =
        getCurrentUser();


    if (!photo || !user) {

        return;
    }


    const key =
        `pioneerProfilePhoto_${user.email}`;


    const saved =
        localStorage.getItem(key);


    if (saved) {

        photo.style.backgroundImage =
            `url("${saved}")`;

        photo.style.backgroundSize =
            "cover";

        photo.style.backgroundPosition =
            "center";

        photo.textContent =
            "";

    } else {

        photo.style.backgroundImage =
            "";

        photo.textContent =
            "👤";
    }
}


/* =========================================================
   PROFILE PHOTO UPLOAD
========================================================= */

function setupProfilePhoto() {

    $("photoInput")
        ?.addEventListener(
            "change",
            (event) => {

                const file =
                    event.target.files?.[0];


                if (!file) {

                    return;
                }


                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    showMessage(
                        "Please select an image file.",
                        "error"
                    );

                    event.target.value =
                        "";

                    return;
                }


                const user =
                    getCurrentUser();


                if (!user) {

                    showMessage(
                        "Please sign in first.",
                        "error"
                    );

                    return;
                }


                const reader =
                    new FileReader();


                reader.onload =
                    () => {

                        try {

                            const key =
                                `pioneerProfilePhoto_${user.email}`;


                            localStorage.setItem(
                                key,
                                reader.result
                            );


                            loadProfilePhoto();


                            showMessage(
                                "Profile photo updated successfully."
                            );

                        } catch (error) {

                            console.error(
                                "Pioneer: photo save error:",
                                error
                            );


                            showMessage(
                                "The image is too large to save.",
                                "error"
                            );
                        }
                    };


                reader.readAsDataURL(file);

            }
        );
}


/* =========================================================
   RESTORE SESSION
========================================================= */

function restoreSession() {
    // No authentication flow: always begin at Welcome after the splash.
    showWelcomeScreen();
}
/* =========================================================
   PIONEER — CLEAN COMPLETE SCRIPT
   PART 2 OF 2

   Education
   Jobs
   Certificates
   Resume
   EmailJS
   Final initialization
========================================================= */


/* =========================================================
   EDUCATION SETUP
========================================================= */

function setupEducation() {

    const form =
        $("educationForm");


    if (!form) {

        console.warn(
            "Pioneer: educationForm not found."
        );

        return;
    }


    form.addEventListener(
        "submit",
        handleEducationSubmit
    );


    setupEducationCertificates();


    /*
     * Education back button
     */

    $("backFromEducationButton")
        ?.addEventListener(
            "click",
            () => {

                showHomeSection("home");

            }
        );
}


/* =========================================================
   EDUCATION CERTIFICATES
========================================================= */

function setupEducationCertificates() {

    const container =
        $("certificateContainer");


    if (!container) {

        return;
    }


    container
        .querySelectorAll(
            ".certificate-row"
        )
        .forEach(
            setupCertificateRow
        );


    $("addCertificateButton")
        ?.addEventListener(
            "click",
            addCertificateRow
        );
}


/* =========================================================
   CERTIFICATE ROW
========================================================= */

function setupCertificateRow(row) {

    if (!row) {

        return;
    }


    const removeButton =
        row.querySelector(
            ".remove-certificate"
        );


    if (!removeButton) {

        return;
    }


    removeButton.onclick =
        () => {

            const container =
                $("certificateContainer");


            const rows =
                container?.querySelectorAll(
                    ".certificate-row"
                );


            if (
                rows &&
                rows.length > 1
            ) {

                row.remove();

            } else {

                row.querySelectorAll(
                    "input, select"
                )
                .forEach(
                    (field) => {

                        field.value = "";

                    }
                );
            }
        };
}


/* =========================================================
   ADD CERTIFICATE ROW
========================================================= */

function addCertificateRow() {

    const container =
        $("certificateContainer");


    if (!container) {

        return;
    }


    const firstRow =
        container.querySelector(
            ".certificate-row"
        );


    if (!firstRow) {

        return;
    }


    const newRow =
        firstRow.cloneNode(true);


    newRow
        .querySelectorAll(
            "input, select"
        )
        .forEach(
            (field) => {

                field.value = "";

            }
        );


    setupCertificateRow(newRow);


    container.appendChild(
        newRow
    );
}


/* =========================================================
   GET CERTIFICATES
========================================================= */

function getCertificates() {

    const container =
        $("certificateContainer");


    if (!container) {

        return "None";
    }


    const rows =
        container.querySelectorAll(
            ".certificate-row"
        );


    const certificates = [];


    rows.forEach(
        (row) => {

            const type =
                row.querySelector(
                    "select"
                )?.value
                ?.trim() || "";


            const name =
                row.querySelector(
                    "input"
                )?.value
                ?.trim() || "";


            if (
                type ||
                name
            ) {

                certificates.push(
                    `${type || "Certificate"}: ${
                        name || "Not specified"
                    }`
                );
            }
        }
    );


    return certificates.length
        ? certificates.join("\n")
        : "None";
}


/* =========================================================
   RESET CERTIFICATES
========================================================= */

function resetCertificates() {

    const container =
        $("certificateContainer");


    if (!container) {

        return;
    }


    const rows =
        container.querySelectorAll(
            ".certificate-row"
        );


    rows.forEach(
        (row, index) => {

            if (index === 0) {

                row.querySelectorAll(
                    "input, select"
                )
                .forEach(
                    (field) => {

                        field.value = "";

                    }
                );

            } else {

                row.remove();
            }
        }
    );
}


/* =========================================================
   EDUCATION SUBMIT
========================================================= */

async function handleEducationSubmit(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    const originalText =
        submitButton?.textContent ||
        "Submit";


    if (submitButton) {

        submitButton.disabled =
            true;

        submitButton.textContent =
            "Sending...";
    }


    try {

        if (!emailJSReady) {

            throw new Error(
                "Email service is not ready. Please refresh the page and try again."
            );
        }


        const user =
            getCurrentUser();


        const name =
            $("eduFullName")
                ?.value
                ?.trim() || "";


        const email =
            $("eduEmail")
                ?.value
                ?.trim() || "";


        const mobile =
            $("eduMobile")
                ?.value
                ?.trim() || "";


        const qualification =
            $("qualification")
                ?.value
                ?.trim() || "";


        const course =
            $("course")
                ?.value
                ?.trim() || "";


        const institution =
            $("institution")
                ?.value
                ?.trim() || "";


        const district =
            $("district")
                ?.value
                ?.trim() || "";


        const locality =
            $("locality")
                ?.value
                ?.trim() || "";


        const year =
            $("yearOfCompletion")
                ?.value
                ?.trim() || "";


        const certificates =
            getCertificates();


        const message =
            $("educationMessage")
                ?.value
                ?.trim() || "";


        const templateParams = {

            name:
                name ||
                user?.name ||
                "",

            email:
                email ||
                user?.email ||
                "",

            mobile:
                mobile ||
                user?.mobile ||
                "",

            phone:
                mobile ||
                user?.mobile ||
                "",

            qualification,

            course,

            institution,

            district,

            locality,

            year,

            yearOfCompletion:
                year,

            certificates,

            message
        };


        console.log(
            "Pioneer: Sending education enquiry..."
        );


        await emailjs.send(
            PIONEER_EMAILJS.serviceId,
            PIONEER_EMAILJS.educationTemplateId,
            templateParams
        );


        showMessage(
            "Education enquiry submitted successfully! 📧"
        );


        form.reset();


        resetCertificates();


    } catch (error) {

        console.error(
            "Pioneer: Education submission failed:",
            error
        );


        showMessage(
            error?.text ||
            error?.message ||
            "Education enquiry could not be sent.",
            "error"
        );


    } finally {

        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                originalText;
        }
    }
}


/* =========================================================
   JOBS SETUP
========================================================= */

function setupJobs() {

    const form =
        $("jobsForm");


    if (!form) {

        console.warn(
            "Pioneer: jobsForm not found."
        );

        return;
    }


    form.addEventListener(
        "submit",
        handleJobsSubmit
    );


    setupJobCertificates();


    setupResumeUpload();


    $("backFromJobsButton")
        ?.addEventListener(
            "click",
            () => {

                showHomeSection("home");

            }
        );
}


/* =========================================================
   JOB CERTIFICATES
========================================================= */

function setupJobCertificates() {

    const container =
        $("jobCertificatesContainer");


    if (!container) {

        return;
    }


    container
        .querySelectorAll(
            ".job-certificate-row"
        )
        .forEach(
            setupJobCertificateRow
        );


    $("addJobCertificateButton")
        ?.addEventListener(
            "click",
            addJobCertificateRow
        );
}


/* =========================================================
   JOB CERTIFICATE ROW
========================================================= */

function setupJobCertificateRow(row) {

    const remove =
        row?.querySelector(
            ".remove-job-certificate"
        );


    if (!remove) {

        return;
    }


    remove.onclick =
        () => {

            const container =
                $("jobCertificatesContainer");


            const rows =
                container?.querySelectorAll(
                    ".job-certificate-row"
                );


            if (
                rows &&
                rows.length > 1
            ) {

                row.remove();

            } else {

                row.querySelectorAll(
                    "input, select"
                )
                .forEach(
                    (field) => {

                        field.value = "";

                    }
                );
            }
        };
}


/* =========================================================
   ADD JOB CERTIFICATE
========================================================= */

function addJobCertificateRow() {

    const container =
        $("jobCertificatesContainer");


    if (!container) {

        return;
    }


    const first =
        container.querySelector(
            ".job-certificate-row"
        );


    if (!first) {

        return;
    }


    const row =
        first.cloneNode(true);


    row.querySelectorAll(
        "input, select"
    )
    .forEach(
        (field) => {

            field.value = "";

        }
    );


    setupJobCertificateRow(
        row
    );


    container.appendChild(
        row
    );
}


/* =========================================================
   GET JOB CERTIFICATES
========================================================= */

function getJobCertificates() {

    const container =
        $("jobCertificatesContainer");


    if (!container) {

        return "None";
    }


    const rows =
        container.querySelectorAll(
            ".job-certificate-row"
        );


    const result = [];


    rows.forEach(
        (row) => {

            const fields =
                row.querySelectorAll(
                    "input, select"
                );


            const values = [];


            fields.forEach(
                (field) => {

                    const value =
                        field.value
                            ?.trim() || "";


                    if (value) {

                        values.push(value);
                    }
                }
            );


            if (values.length) {

                result.push(
                    values.join(" — ")
                );
            }
        }
    );


    return result.length
        ? result.join("\n")
        : "None";
}


/* =========================================================
   RESUME UPLOAD
========================================================= */

function setupResumeUpload() {

    $("resumeFile")
        ?.addEventListener(
            "change",
            (event) => {

                const file =
                    event.target.files?.[0];


                if (!file) {

                    return;
                }


                const allowedExtensions = [
                    ".pdf",
                    ".doc",
                    ".docx"
                ];


                const lowerName =
                    file.name.toLowerCase();


                const valid =
                    allowedExtensions.some(
                        (extension) =>
                            lowerName.endsWith(
                                extension
                            )
                    );


                if (!valid) {

                    showMessage(
                        "Please upload a PDF, DOC, or DOCX resume.",
                        "error"
                    );


                    event.target.value =
                        "";


                    return;
                }


                if (
                    file.size >
                    5 * 1024 * 1024
                ) {

                    showMessage(
                        "Resume must be smaller than 5 MB.",
                        "error"
                    );


                    event.target.value =
                        "";


                    return;
                }


                showMessage(
                    `Resume selected: ${file.name}`
                );
            }
        );
}


/* =========================================================
   JOB HELP OPTIONS
========================================================= */

function getJobHelpOptions() {

    const options = [];


    document
        .querySelectorAll(
            'input[name="jobHelp"]:checked'
        )
        .forEach(
            (checkbox) => {

                if (checkbox.value) {

                    options.push(
                        checkbox.value
                    );

                } else {

                    options.push(
                        checkbox.parentElement
                            ?.textContent
                            ?.trim() ||
                        "Selected"
                    );
                }
            }
        );


    return options.length
        ? options.join(", ")
        : "None";
}


/* =========================================================
   FILL JOB USER DETAILS
========================================================= */

function fillJobUserDetails() {

    const user =
        getCurrentUser();


    if (!user) {

        return;
    }


    const fields = [

        [
            "jobFullName",
            user.name
        ],

        [
            "jobEmail",
            user.email
        ],

        [
            "jobMobile",
            user.mobile
        ]

    ];


    fields.forEach(
        ([id, value]) => {

            const field =
                $(id);


            if (
                field &&
                !field.value
            ) {

                field.value =
                    value || "";
            }
        }
    );
}


/* =========================================================
   JOB SUBMIT
========================================================= */

async function handleJobsSubmit(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    const originalText =
        submitButton?.textContent ||
        "Submit";


    if (submitButton) {

        submitButton.disabled =
            true;

        submitButton.textContent =
            "Sending...";
    }


    try {

        if (!emailJSReady) {

            throw new Error(
                "Email service is not ready. Please refresh the page and try again."
            );
        }


        const user =
            getCurrentUser();


        const resume =
            $("resumeFile")
                ?.files?.[0];


        const templateParams = {

            name:
                $("jobFullName")
                    ?.value
                    ?.trim() ||
                user?.name ||
                "",


            email:
                $("jobEmail")
                    ?.value
                    ?.trim() ||
                user?.email ||
                "",


            mobile:
                $("jobMobile")
                    ?.value
                    ?.trim() ||
                user?.mobile ||
                "",


            phone:
                $("jobMobile")
                    ?.value
                    ?.trim() ||
                user?.mobile ||
                "",


            district:
                $("jobDistrict")
                    ?.value
                    ?.trim() ||
                "",


            locality:
                $("jobLocality")
                    ?.value
                    ?.trim() ||
                "",


            jobType:
                $("jobType")
                    ?.value
                    ?.trim() ||
                "",


            preferredLocation:
                $("preferredLocation")
                    ?.value
                    ?.trim() ||
                "",


            qualification:
                $("jobQualification")
                    ?.value
                    ?.trim() ||
                "",


            course:
                $("jobCourse")
                    ?.value
                    ?.trim() ||
                "",


            institution:
                $("jobInstitution")
                    ?.value
                    ?.trim() ||
                "",


            completionYear:
                $("jobCompletionYear")
                    ?.value
                    ?.trim() ||
                "",


            skills:
                $("jobSkills")
                    ?.value
                    ?.trim() ||
                "",


            languages:
                $("jobLanguages")
                    ?.value
                    ?.trim() ||
                "",


            experience:
                $("jobExperience")
                    ?.value
                    ?.trim() ||
                "",


            currentCompany:
                $("currentCompany")
                    ?.value
                    ?.trim() ||
                "",


            currentPosition:
                $("currentPosition")
                    ?.value
                    ?.trim() ||
                "",


            resume:
                resume?.name ||
                "Not provided",


            certificates:
                getJobCertificates(),


            help:
                getJobHelpOptions(),


            additionalInfo:
                $("jobAdditionalInfo")
                    ?.value
                    ?.trim() ||
                ""
        };


        console.log(
            "Pioneer: Sending job application..."
        );


        await emailjs.send(
            PIONEER_EMAILJS.serviceId,
            PIONEER_EMAILJS.jobsTemplateId,
            templateParams
        );


        showMessage(
            "Job application submitted successfully! 📧"
        );


        form.reset();


        fillJobUserDetails();


    } catch (error) {

        console.error(
            "Pioneer: Job submission failed:",
            error
        );


        showMessage(
            error?.text ||
            error?.message ||
            "Job application could not be sent.",
            "error"
        );


    } finally {

        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                originalText;
        }
    }
}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

function setupForgotPassword() {

    const button =
        $("forgotPasswordButton");


    if (!button) {

        return;
    }


    button.addEventListener(
        "click",
        () => {

            const email =
                $("email")
                    ?.value
                    ?.trim()
                    .toLowerCase() ||
                "";


            if (!email) {

                showMessage(
                    "Enter your email address first.",
                    "error"
                );

                return;
            }


            const accounts =
                getAccounts();


            const account =
                accounts.find(
                    (item) =>
                        item.email ===
                        email
                );


            if (!account) {

                showMessage(
                    "No Pioneer account was found with that email.",
                    "error"
                );

                return;
            }


            /*
             * This is a local-storage application.
             * There is no secure server-side password
             * reset system in the current HTML/JS.
             */

            showMessage(
                "Password reset requires a server-side email system. Please contact Pioneer support.",
                "error"
            );
        }
    );
}


/* =========================================================
   FINAL SETUP
========================================================= */

setupForgotPassword();


console.log(
    "Pioneer: clean script loaded successfully."
);


/* =========================================================
   SAFETY CHECK
========================================================= */

window.addEventListener(
    "error",
    (event) => {

        console.error(
            "Pioneer JavaScript error:",
            event.error ||
            event.message
        );
    }
);


/* =========================================================
   END OF CLEAN PIONEER SCRIPT
========================================================= */