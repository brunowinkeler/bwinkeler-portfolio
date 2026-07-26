export const site = {
    name: "Bruno Winkeler",
    title: "Senior Embedded Software Engineer",
    description:
        "Senior embedded software engineer experienced in safety-critical firmware, real-time systems, embedded Linux, device connectivity, computer vision, and robotics.",
    url: "https://bwinkeler.com",
    email: "brunowinkeler@gmail.com",
    locale: "en",
    location: "Eindhoven, North Brabant, Netherlands",
    profileImageAlt: "Portrait of Bruno Winkeler",
    introduction:
        "I build reliable software close to the hardware, from safety-critical firmware and low-level drivers to embedded Linux and connected products.",
    about: [
        "I am an electrical engineer with an electronics emphasis who chose software as the central thread of my career. My work spans embedded applications, real-time systems, graphics, hardware interfaces, and cloud-connected devices.",
        "Across aviation, payment terminals, electronics R&D, computer vision, and robotics, I have worked with C and modern C++ from architecture and implementation through testing, documentation, and delivery.",
    ],
    socialLinks: [
        {
            name: "GitHub",
            href: "https://github.com/brunowinkeler",
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/brunowinkeler/",
        },
        {
            name: "Email",
            href: "mailto:brunowinkeler@gmail.com",
        },
    ],
    capabilities: [
        {
            title: "Embedded & real-time",
            items: ["C", "Modern C++", "STM32", "FreeRTOS", "DO-178C"],
        },
        {
            title: "Linux & connectivity",
            items: [
                "Embedded Linux",
                "CMake",
                "AWS IoT",
                "S3",
                "Cognito",
                "OpenSSL",
            ],
        },
        {
            title: "Applied engineering",
            items: ["Computer vision", "OpenCV", "PCL", "Python", "Robotics"],
        },
        {
            title: "Quality & delivery",
            items: [
                "Unit testing",
                "Catch2",
                "CUnit",
                "GitLab CI",
                "Docker",
                "Doxygen",
            ],
        },
    ],
    education: {
        institution: "Universidade Federal de Campina Grande",
        degree: "Bachelor of Electrical Engineering",
        focus: "Electrical and Electronics Engineering, with an electronics emphasis",
        dateRange: "2008–2014",
    },
    languages: [
        { name: "Portuguese", level: "Native or bilingual proficiency" },
        { name: "English", level: "Full professional proficiency" },
        { name: "Spanish", level: "Limited working proficiency" },
    ],
} as const;
