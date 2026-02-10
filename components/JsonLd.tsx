"use client";

import React from "react";

const JsonLd: React.FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Vantos",
    url: "https://www.vantoshq.com",
    logo: "https://www.vantoshq.com/images/vantos.png",
    description:
      "Plataforma de herramientas financieras para optimización de patrimonio e hipotecas.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default JsonLd;

