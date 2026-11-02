export type Level = {
  id: string;
  name: string;
  age: string;
  desc: string;
  focus: string[];
  classes: string[];
};

export type SchoolConfig = {
  name: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroText: string;
  location: string;
  addressLines: string[];
  phone: string;
  email: string;
  whatsapp: string;
  whatsappMessage: string;
  openingHours: string;
  logo: string;
  heroVideo: string;
  heroPoster: string;
  images: Record<string, string>;
  mapUrl: string;
  social: { facebook: string; instagram: string; youtube: string; tiktok: string };
  designer: string;
  stats: { years: number; students: number; staff: number; programs: number };
  levels: Level[];
  about: { intro: string; mission: string; mandate: string; activities: string };
  values: { title: string; icon: string; text: string }[];
  admissionSteps: { title: string; text: string }[];
  galleryCategories: string[];
};

export type StaffMember = {
  id: string;
  name: string;
  position: string;
  department: string;
  photo: string;
  bio: string;
};

export type GalleryItem = {
  id: string;
  image: string;
  caption: string;
  category: string;
};

export type NewsItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  published: boolean;
  excerpt: string;
  content: string;
};

export type Facility = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type Testimonial = {
  id: string;
  name: string;
  childClass: string;
  photo: string;
  quote: string;
};

export type Fees = {
  levels: Record<string, Record<string, string>>;
  payment: {
    note: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    instructions: string;
    methods: { name: string; desc: string }[];
  };
};

export type SitePayload = {
  config: SchoolConfig;
  staff: StaffMember[];
  gallery: GalleryItem[];
  news: NewsItem[];
  facilities: Facility[];
  academicsApproach: { id: string; title: string; description: string }[];
  academicsSubjects: string[];
  testimonials: Testimonial[];
  fees: Fees;
};

export type Admission = {
  id: string;
  child: string;
  childAge: number;
  parent: string;
  email: string;
  phone: string;
  classApplying: string;
  contactMethod: string;
  message: string;
  status: string;
  createdAt: string;
};

export type Student = {
  id: string;
  name: string;
  className: string;
  parent: string;
  phone: string;
  admitted: string;
  createdAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
};

export type Activity = {
  id: string;
  text: string;
  admin: string;
  createdAt: string;
};

export type Dashboard = {
  counts: {
    students: number;
    admissions: number;
    staff: number;
    news: number;
    gallery: number;
    unread: number;
  };
  months: { label: string; value: number }[];
  statuses: { label: string; value: number }[];
  byLevel: { label: string; value: number }[];
  activities: Activity[];
};

export type Me = {
  username: string;
  pendingAdmissions: number;
  unreadMessages: number;
};

export type CreateAdmissionInput = {
  parent: string;
  email: string;
  phone: string;
  child: string;
  childAge: number | string;
  classApplying: string;
  contactMethod: string;
  message?: string;
  website?: string;
};

export type CreateAdmissionResult = {
  id: string;
  reference: string;
  createdAt: string;
};

export type CreateMessageInput = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  website?: string;
};

export type CreateMessageResult = { id: string };

export type LoginInput = { username: string; password: string };

export type LoginResult = { token: string; username: string };

export type StudentInput = {
  id?: string;
  name: string;
  className: string;
  parent: string;
  phone: string;
  admitted: string;
};

export type StatusPatch = { id: string; status: string };
