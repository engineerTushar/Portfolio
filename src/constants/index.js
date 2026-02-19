import {
    logo,
    cafe1,
    cafe2,
    cafe3,
    pythonIcon,
    htmlIcon,
    cssIcon,
    sqlIcon,
    bootstrapIcon,
    wordIcon,
    pptIcon,
} from "../assets";

export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "work",
        title: "Work",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const services = [
    {
        title: "HTML 5",
        icon: htmlIcon,
    },
    {
        title: "CSS 3",
        icon: cssIcon,
    },
    {
        title: "Python",
        icon: pythonIcon,
    },
    {
        title: "SQL / MySQL",
        icon: sqlIcon,
    },
    {
        title: "Bootstrap",
        icon: bootstrapIcon,
    },
    {
        title: "MS Word",
        icon: wordIcon,
    },
    {
        title: "MS PowerPoint",
        icon: pptIcon,
    },
];

const technologies = [
    {
        name: "HTML 5",
        icon: htmlIcon,
    },
    {
        name: "Python",
        icon: pythonIcon,
    },
    // Add more if we had them
];

const experiences = [
    {
        title: "Advanced Python Intern",
        company_name: "SparkLab IT Solutions Pvt. Ltd.",
        icon: pythonIcon,
        iconBg: "#383E56",
        date: "Jun 2022 - July 2022",
        points: [
            "Developing and implementing Python-based backend logic.",
            "Collaborating with the team on real-world development tasks.",
            "Improving code quality, documentation, and version control skills.",
        ],
    },
    {
        title: "Python Intern",
        company_name: "Malleable Software",
        icon: pythonIcon,
        iconBg: "#E6DEDD",
        date: "July 2022 - Aug 2022",
        points: [
            "Developed an interactive number-guessing game using Python.",
            "Designed and implemented the classic Snake Game using Python and Pygame.",
            "Built a Library Management System using Java and MySQL.",
        ],
    },
];

const testimonials = [];

const projects = [
    {
        name: "Cafe - Brew & Bloom",
        description:
            "A boutique café website serving hand-roasted coffee. Visuals include craft coffee, cozy vibes, and warm interiors. Interactive table reservation and menu viewing.",
        tags: [
            {
                name: "html",
                color: "blue-text-gradient",
            },
            {
                name: "css",
                color: "green-text-gradient",
            },
        ],
        image: cafe1,
        source_code_link: "https://engineertushar.github.io/Cafe/",
    },
    {
        name: "Student Hub",
        description:
            "Centralized dashboard for students to manage attendance, reports, and submissions.",
        tags: [
            {
                name: "php",
                color: "blue-text-gradient",
            },
        ],
        image: cafe2, // Placeholder
        source_code_link: "https://github.com/engineerTushar/Student-Hub",
    },
];

export { services, technologies, experiences, testimonials, projects };
