export function mockAIResponse(userText: string): string {
  const text = userText.toLowerCase();

  if (text.includes("किसान") || text.includes("farmer")) {
    return `
आप किसान हैं। आपके लिए ये योजनाएँ हो सकती हैं:

1️⃣ PM-KISAN – ₹6,000 प्रति वर्ष  
2️⃣ किसान क्रेडिट कार्ड  
3️⃣ प्रधानमंत्री फसल बीमा योजना  

क्या आप अपनी उम्र और राज्य बता सकते हैं?
`;
  }

  if (text.includes("बीमारी") || text.includes("health")) {
    return `
स्वास्थ्य से जुड़ी योजनाएँ:

1️⃣ आयुष्मान भारत – ₹5 लाख तक इलाज  
2️⃣ जन औषधि योजना – सस्ती दवाइयाँ  

क्या आपके पास राशन कार्ड है?
`;
  }

  return `
मैं आपकी मदद कर सकता हूँ। कृपया बताएं:
- आपकी उम्र
- काम/पेशा
- राज्य
`;
}