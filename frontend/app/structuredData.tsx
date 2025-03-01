export default function StructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AggieMenus",
      "description": "Find your perfect dining experience, all in one place",
      "url": "https://aggiemenus.org",
      "applicationCategory": "Food",
      "operatingSystem": "Web",
      "audience": {
        "@type": "Audience",
        "audienceType": "UC Davis Students"
      },
      "potentialAction": {
        "@type": "UseAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://aggiemenus.org",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        }
      }
    };
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    );
  }