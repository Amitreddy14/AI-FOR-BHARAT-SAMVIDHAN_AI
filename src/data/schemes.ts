export type Scheme = {
  id: string;
  name: string;
  hindiName: string;
  category: string;
  benefit: string;
  eligibility: string;
  keywords: string[]; // for fallback detection
};

export const SCHEMES: Scheme[] = [

  // 🌾 AGRICULTURE
  {
    id: "pm-kisan",
    name: "PM-KISAN",
    hindiName: "प्रधानमंत्री किसान सम्मान निधि",
    category: "Agriculture",
    benefit: "₹6,000 per year income support",
    eligibility: "Small & marginal farmers",
    keywords: ["pm kisan", "किसान योजना", "kisan", "pm किसान"]
  },
  {
    id: "pm-fasal-bima",
    name: "PM Fasal Bima Yojana",
    hindiName: "प्रधानमंत्री फसल बीमा योजना",
    category: "Agriculture",
    benefit: "Crop insurance coverage",
    eligibility: "All farmers",
    keywords: ["फसल बीमा", "crop insurance", "fasal"]
  },

  // 🏥 HEALTH
  {
    id: "ayushman",
    name: "Ayushman Bharat",
    hindiName: "आयुष्मान भारत",
    category: "Health",
    benefit: "₹5 lakh health cover per family",
    eligibility: "Low-income families",
    keywords: ["ayushman", "आयुष्मान", "health card"]
  },

  // 🏠 HOUSING
  {
    id: "pm-awas",
    name: "PM Awas Yojana",
    hindiName: "प्रधानमंत्री आवास योजना",
    category: "Housing",
    benefit: "Housing subsidy",
    eligibility: "No permanent house",
    keywords: ["awas", "आवास", "घर योजना"]
  },
  {
    id: "pm-awas-gramin",
    name: "PM Awas Gramin",
    hindiName: "प्रधानमंत्री आवास योजना ग्रामीण",
    category: "Housing",
    benefit: "Rural housing assistance",
    eligibility: "Rural poor families",
    keywords: ["gramin awas", "ग्रामीण आवास"]
  },

  // 💼 EMPLOYMENT
  {
    id: "mgnrega",
    name: "MGNREGA",
    hindiName: "मनरेगा",
    category: "Employment",
    benefit: "100 days guaranteed wage employment",
    eligibility: "Rural households",
    keywords: ["मनरेगा", "mgnrega", "job card"]
  },

  // 🎓 STUDENTS
  {
    id: "nsp",
    name: "National Scholarship Portal",
    hindiName: "राष्ट्रीय छात्रवृत्ति पोर्टल",
    category: "Students",
    benefit: "Scholarship for students",
    eligibility: "Eligible school & college students",
    keywords: ["scholarship", "छात्रवृत्ति", "student scheme"]
  },

  // 👩 WOMEN
  {
    id: "sukanya",
    name: "Sukanya Samriddhi Yojana",
    hindiName: "सुकन्या समृद्धि योजना",
    category: "Women",
    benefit: "High-interest savings scheme for girl child",
    eligibility: "Girl child under 10 years",
    keywords: ["sukanya", "सुकन्या", "girl savings"]
  },

  // 🏦 FINANCIAL
  {
    id: "jan-dhan",
    name: "Jan Dhan Yojana",
    hindiName: "प्रधानमंत्री जन धन योजना",
    category: "Financial",
    benefit: "Zero balance bank account",
    eligibility: "Any Indian citizen",
    keywords: ["jan dhan", "जन धन", "bank account scheme"]
  },

  // 🏭 BUSINESS
  {
    id: "mudra",
    name: "PM Mudra Yojana",
    hindiName: "प्रधानमंत्री मुद्रा योजना",
    category: "Business",
    benefit: "Loan up to ₹10 lakh",
    eligibility: "Small businesses & startups",
    keywords: ["mudra", "मुद्रा", "business loan"]
  }

];