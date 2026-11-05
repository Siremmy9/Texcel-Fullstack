import type { SitePayload } from "./types";

export const mockSite: SitePayload = {
  config: {
    name: "Texcel Schools",
    tagline: "Raising The Joy of Nations",
    heroTitle: "Raising The Joy of Nations",
    heroSubtitle: "since 2011",
    heroText: "A caring school community where every child is encouraged to discover their strengths.",
    location: "13/15, Olabisi Seriki Street (By Celestial Church) Opposite Fara park Estate, Abijo Lekki-Epe Expressway, Lagos, Nigeria",
    addressLines: ["13/15, Olabisi Seriki Street,(By Celestial Church) Opposite Fara park Estate, Abijo Lekki-Epe Expressway, Lagos, Nigeria"],
    phone: "+234 703 711 6014",
    email: "texcelschool.com",
    whatsapp: "234811453435",
    whatsappMessage: "Hello, I would like to know more about Texcel Schools.",
    openingHours: "Monday to Friday, 8:00am–4:00pm",
    logo: "/assets/images/logo.jpg",
    heroVideo: "/assets/videos/school-hero.mp4",
    heroPoster: "/assets/images/eaglebuilding.jpg",
    images: {
      about: "/assets/images/facilities/building.jpg",
      creche: "/assets/images/facilities/kids.jpg",
      preschool: "/assets/images/facilities/class.jpg",
      primary: "/assets/images/facilities/pryAssembly.jpg",
      college: "/assets/images/facilities/assembly.jpg",
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.354431716398!2d3.6541889749924574!3d6.471305993520402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf951eaf38345%3A0x13eb1c618447402b!2sTeresh%20Eternal%20Excellence%20School%20(Texcels)!5e1!3m2!1sen!2sng!4v1793456988610!5m2!1sen!2sng",
    campuses: {
      primary: {
        name: "Primary School",
        principalName: "Mrs Adeleke",
        principalTitle: "Head Mistress, Primary School",
        principalImage: "/assets/images/facilities/building.jpg",
        welcomeMessage: "Welcome to the Primary School at Texcel Schools. Our aim is to give every child a strong foundation for learning while helping them grow in confidence, creativity and character.We look forward to working with your family and making your childs primary years happy, purposeful and full of discovery.",
        address: "13/15, Olabisi Seriki Street, Majek Bus Stop (By Celestial Church), Opposite Fara park Estate Abijo-Ajah, Lagos",
        whatsapp: "2347037116024",
        whatsappMessage: "Hello, I would like to know more about Texcel Primary School.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.354431716398!2d3.6541889749924574!3d6.471305993520402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf951eaf38345%3A0x13eb1c618447402b!2sTeresh%20Eternal%20Excellence%20School%20(Texcels)!5e1!3m2!1sen!2sng!4v1793456988610!5m2!1sen!2sng",
      },
      secondary: {
        name: "Secondary School",
        principalName: "Add Secondary School principal's name",
        principalTitle: "Principal, Secondary School",
        principalImage: "",
        welcomeMessage: "Add the Secondary School principal's welcome message here.",
        address: "Add Secondary School campus address here.",
        whatsapp: "",
        whatsappMessage: "Hello, I would like to know more about Texcel Secondary School.",
        mapUrl: "",
      },
    },
    social: { facebook: "https://web.facebook.com/TEXCELS/?_rdc=1&_rdr#", instagram: "https://www.instagram.com/texcel_schools/", youtube: "https://youtube.com/@TEXCELSchools?si=2tks3uSxIaijQB-X", tiktok: "https://www.tiktok.com/search?q=texcel%20schools&t=1793475923849" },
    designer: "",
    stats: { years: 15, students: 700, staff: 35, programs: 4 },
    levels: [
      { id: "creche", name: "Creche", age: "Ages 3 months–2 years", desc: "Specially designed curriculum prepared for them helps to promote social, intellectual, physical, and emotional development.", focus: ["Care through play", "Language and sensory development"], classes: ["Baby class", "Toddler class"] },
      { id: "preschool", name: "Pre-School", age: "Ages 2–5 years", desc: "Curiosity and confidence grow through play.", focus: ["Early literacy and numeracy", "Creative play and discovery"], classes: ["Nursery 1", "Nursery 2", "Kindergarten"] },
      { id: "primary", name: "Primary", age: "Ages 5–11 years", desc: "Strong foundations for a lifetime of learning.", focus: ["Core academic skills", "Teamwork and creativity"], classes: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"] },
      { id: "college", name: "College", age: "Ages 11–16 years", desc: "Preparing students to lead and thrive.", focus: ["Academic excellence", "Leadership and responsibility"], classes: ["JSS 1", "JSS 2", "JSS 3"] },
    ],
    about: {
      intro: "We help children build knowledge, confidence, and a love of learning in a supportive school community.",
      mission: "We are dedicated to inspire, nurture and educate children in a conducive, safe and prepared environment through highly skilled professionals, making learning easier for children and developing them to become seasoned future leaders and Joy of Many Nations.",
      mandate: "To raise children that are excellent morally and academically, ultimately becoming solid and responsible future leaders.",
      activities: "Learning is enriched through sports, creative arts, technology, and community activities.",
    },
    proprietressWelcome: {
      name: "Mrs Olufadeji Foluso",
      title: "Proprietress",
      image: "/assets/images/facilities/propiertress.jpg",
      message: "Welcome to Texcel Schools. We are committed to providing a caring and supportive environment where every child can learn, grow in confidence, and reach their full potential. We look forward to partnering with you in your child's journey.",
    },
    values: [
      { title: "Integrity", icon: "shield", text: "We act with honesty and care." },
      { title: "Excellence", icon: "crown", text: "We give our best and keep learning." },
      { title: "Curiosity", icon: "bulb", text: "We ask questions and explore new ideas." },
      { title: "Respect", icon: "heart", text: "We value every person in our community." },
      { title: "Responsibility", icon: "check", text: "We take ownership of our choices." },
      { title: "Community", icon: "target", text: "We grow stronger by learning together." },
    ],
    admissionSteps: [
      { title: "Make an enquiry", text: "Contact the school to discuss the right section for your child." },
      { title: "Visit the school", text: "Arrange a visit and learn more about school life." },
      { title: "Complete an application", text: "Submit an application when admissions are open." },
    ],
    galleryCategories: ["Learning", "Campus", "Activities"],
  },
  staff: [
    { id: "preview-staff-1", name: "Mrs Olufadeji Foluso", role: "Propiertress", photo: "/assets/images/facilities/propiertress.jpg" },  
    { id: "preview-staff-5", name: "Mr. Odeyemi", role: "Principal", photo: "/assets/images/facilities/logo.jpg" },
    { id: "preview-staff-3", name: "Mrs. A. Johnson", role: "Admin", photo: "/assets/images/facilities/logo.jpg" },
    { id: "preview-staff-4", name: "Mrs. Adeleke", role: "Head Mistress", photo: "/assets/images/facilities/mistress.jpeg" },

  ],
  gallery: [
    { id: "preview-reading", image: "assets/images/facilities/admission.jpg", caption: "A moment of shared reading", category: "Learning" },
    { id: "preview-assembly", image: "assets/images/facilities/prybuilding.jpg", caption: "Primary School building", category: "Activities" },
    { id: "preview-campus", image: "assets/images/facilities/exc.jpg", caption: "Outdoor learning", category: "students" },
    { id: "preview-arts", image: "assets/images/gallery/computerlab.jpg", caption: "Computer Lab", category: "ICT Laboratory" },
    { id: "preview-library", image: "assets/images/facilities/graduation.jpg", caption: "Graduation Day", category: "Graduation" },
    { id: "preview-student", image: "assets/images/facilities/hero.jpg", caption: "School Student", category: "students" },
    { id: "preview-music", image: "assets/images/facilities/musicstudent.jpg", caption: "Music Class", category: "Outdoor Activities" },
    { id: "preview-around", image: "assets/images/facilities/assembly.jpg", caption: "School Assembly", category: "students" },
    { id: "preview-sport", image: "assets/images/facilities/sport.jpg", caption: "School Sport", category: "Outdoor Activities" },
    { id: "preview-playground", image: "assets/images/gallery/playground.jpg", caption: "School Playground", category: "Outdoor Activities" },
    { id: "preview-art", image: "assets/images/gallery/arts.jpg", caption: "Art Lessons", category: "students" },
    { id: "preview-openday", image: "assets/images/gallery/openday.jpg", caption: "Open Day", category: "Events" },
    { id: "preview-wazobia", image: "assets/images/facilities/wazobia.jpg", caption: "Wazobia Visit", category: "Events" },
    { id: "preview-firstaid", image: "assets/images/facilities/firstaid.jpg", caption: "First Aid", category: "Facilities" },
    { id: "preview-bus", image: "assets/images/gallery/bus.jpg", caption: "School Bus", category: "Bus" },





  ],
  news: [
    { id: "preview-news-1", title: "Welcome to a new school term School Admission is open", category: "School News", date: "2026-09-01", image: "/assets/images/facilities/admission.jpg", published: true, excerpt: "We look forward to a term full of discovery and achievement.", content: "Our school community is ready for a new term of learning, friendship, and fresh opportunities." },
    { id: "preview-news-2", title: "After-School Services", category: "Activities", date: "2026-08-15", image: "/assets/images/facilities/aftschool.jpg", published: true, excerpt: "Enroll your kids for after-school activities.", content: "Enroll your kids for after-school activities." },
    { id: "preview-news-3", title: "Inter-House Sports", category: " Sports", date: "2026-08-01", image: "/assets/images/facilities/sport.jpg", published: true, excerpt: "Explore the school sections and learn about the admissions process.", content: "Contact the school office for current admissions information." },
    { id: "preview-news-4", title: "Graduation Ceremony", category: " graduation", date: "2026-08-01", image: "/assets/images/facilities/Graduation.jpg", published: true, excerpt: "Explore the school sections and learn about the admissions process.", content: "Contact the school office for current admissions information." },
    { id: "preview-news-5", title: "Parents Meeting", category: " Parents", date: "2026-08-01", image: "/assets/images/facilities/kidsteachers.jpg", published: true, excerpt: "Explore the school sections and learn about the admissions process.", content: "Contact the school office for current admissions information." },
    { id: "preview-news-6", title: "Cultural Day", category: " Events", date: "2026-08-01", image: "/assets/images/facilities/drama.jpg", published: true, excerpt: "Explore the school sections and learn about the admissions process.", content: "Contact the school office for current admissions information." },
    { id: "preview-news-7", title: "Music Festival", category: " Events", date: "2026-08-01", image: "/assets/images/facilities/sax.jpg", published: true, excerpt: "Explore the school sections and learn about the admissions process.", content: "Contact the school office for current admissions information." },
    { id: "preview-news-8", title: "Christmas Celebration", category: " Events", date: "2026-12-17", image: "/assets/images/facilities/christmas.jpg", published: true, excerpt: "Explore the school sections and learn about the admissions process.", content: "Contact the school office for current admissions information." },



  ],
  facilities: [
    { id: "preview-library", title: "Library", description: "A welcoming space for reading, research, and discovery.", image: "/assets/images/gallery/library.jpg" },
    { id: "preview-computer-lab", title: "Computer Lab", description: "Students build digital skills through guided practice.", image: "/assets/images/gallery/computerlab.jpg" },
    { id: "preview-classroom", title: "Modern Classrooms", description: "A space for movement, teamwork, and outdoor play.", image: "/assets/images/gallery/reading.jpg" },
    { id: "preview-music-studio", title: "Music Studio", description: "A space for movement, teamwork, and outdoor play.", image: "/assets/images/gallery/playground.jpg" },
    { id: "preview-bus", title: "School Bus", description: "A space for movement, teamwork, and outdoor play.", image: "/assets/images/gallery/bus.jpg" },
    { id: "preview-playground", title: "Playground", description: "A space for movement, teamwork, and outdoor play.", image: "/assets/images/gallery/playground.jpg" },

  ],
  academicsApproach: [
    { id: "preview-core", title: "Strong foundations", description: "Clear teaching helps students grow confidence in core subjects." },
    { id: "preview-whole-child", title: "Whole-child learning", description: "Creative arts, sports, and character education complement classroom learning." },
      {id: "preview-curriculum",
      title: "Curriculum",
      description:
        "A structured, age-appropriate curriculum that builds strong foundations in literacy, numeracy, science and the arts.",
    },
      {id: "preview-co-curricular",
      title: "Co-curricular activities",
      description:
        "Clubs and societies that let pupils explore interests beyond the classroom.",
    },
     { id: "preview-sports",
      title: "Sports",
      description:
        "Regular physical education, team games and inter-house competitions.",
    },
    {id: "preview-creative-arts",
      title: "Creative arts",
      description:
        "Art, music, drama and dance to build expression and confidence.",
    },
    { id: "preview-leadership",
      title: "Leadership development",
      description:
        "Prefect roles, public speaking and service projects for every age group.",
    },

  ],
  academicsSubjects: ["English Language", "Mathematics", "Science", "Creative Arts", "ICT", "Physical Education"],
  testimonials: [
    { id: "preview-testimonial-1", name: "A School Parent", childClass: "Primary", photo: "/assets/images/client1.jpg", quote: "Our child is excited to learn and feels supported every day." },
    { id: "preview-testimonial-2", name: "A School Parent", childClass: "Pre-School", photo: "/assets/images/client2.jpg", quote: "We appreciate the caring teachers and welcoming community." },
    { id: "preview-testimonial-3", name: "A School Parent", childClass: "College", photo: "/assets/images/client3.jpg", quote: "We have seen our child grow in confidence and independence." },
  ],
  fees: {
    levels: {
      creche: {
        tuition: "20,000",
        registration: "10,000",
        levy: "10,000",
        books: "5,000",
        uniform: "5,000",
        other: "10,000",
      },
      preschool: {
        tuition: "25,000",
        registration: "15,000",
        levy: "15,000",
        books: "20,000",
        uniform: "10,000",
        other: "10,000",
      },
      primary: {
        tuition: "30,000",
        registration: "20,000",
        levy: "15,000",
        books: "20,000",
        uniform: "10,000",
        other: "15,000",
      },
      college: {
        tuition: "35,000",
        registration: "25,000",
        levy: "15,000",
        books: "20,000",
        uniform: "15,000",
        other: "20,000",
      },
    },
    payment: {
      note: "This preview uses sample content. Contact the school for current fees.",
      bankName: "Texcel Bank",
      accountName: "Texcel Schools",
      accountNumber: "XXXXXXXXXX",
      instructions: "Please use your child's full name and class as the payment reference, and send proof of payment to the school office or via WhatsApp.",
      methods: [
        { name: "Bank transfer", desc: "Transfer to the school account shown below and keep your receipt." },
        { name: "Card payment", desc: "Pay by card at the school payment office." },
        { name: "School Office Payment", desc: "Pay in person at the bursary during opening hours." },

      ],
    },
  },
};
