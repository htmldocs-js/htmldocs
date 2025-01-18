import { Document, Head, Page, Spacer } from "@htmldocs/react";
import { FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa";
import "~/index.css";

interface Company {
  name: string;
  logo: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  website: string;
}

interface Contact {
  name: string;
  title: string;
  company: string;
  address: string;
  city: string;
}

export interface LetterProps {
  sender: Company;
  senderContact: {
    name: string;
    title: string;
  };
  recipient: Contact;
  date: string;
  reference?: string;
  subject: string;
  content: string;
  closing: string;
}

function Letter({
  sender,
  senderContact,
  recipient,
  date,
  reference,
  subject,
  content,
  closing,
}: LetterProps) {
  // Process content to handle paragraphs and bullet points
  const processContent = (content: string) => {
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => {
      // Check if paragraph contains bullet points
      if (paragraph.includes('•')) {
        const [introText, ...listItems] = paragraph.split('\n');
        return (
          <div key={index} className="mb-4">
            {introText && <p className="mb-2">{introText.trim()}</p>}
            <ul className="list-none pl-4 space-y-2">
              {listItems.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 text-gray-600">•</span>
                  <span>{item.replace('•', '').trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <Document size="A4" orientation="portrait" margin="0.25in">
      <Head>
        <link href="https://fonts.cdnfonts.com/css/cmu-serif" rel="stylesheet" />
      </Head>
      <Page className="p-16 text-sm flex flex-col" style={{ fontFamily: "CMU Serif" }}>
        {/* Header with Logo and Company Info */}
        <div className="flex justify-between items-start mb-12">
          <img 
            src="/static/techflow.svg" 
            className="w-64 h-auto mt-2"
          />
          <div className="text-right text-gray-700">
            <div>{sender.address}</div>
            <div>{sender.city}</div>
            <div className="flex items-center justify-end mt-2">
              <FaPhone className="w-3 h-3 mr-1" />
              {sender.phone}
            </div>
            <div className="flex items-center justify-end">
              <FaEnvelope className="w-3 h-3 mr-1" />
              {sender.email}
            </div>
            <div className="flex items-center justify-end">
              <FaGlobe className="w-3 h-3 mr-1" />
              {sender.website}
            </div>
          </div>
        </div>

        {/* Date and Reference */}
        <div className="mb-8">
          <div>{date}</div>
        </div>

        {/* Recipient's Information */}
        <div className="mb-8">
          <div className="font-semibold">{recipient.name}</div>
          <div>{recipient.title}</div>
          <div className="font-semibold">{recipient.company}</div>
          <div>{recipient.address}</div>
          <div>{recipient.city}</div>
        </div>

        {/* Subject Line */}
        <div className="font-semibold mb-4">
          Subject: {subject}
        </div>

        {/* Salutation */}
        <div className="mb-4">
          Dear {recipient.name},
        </div>

        {/* Content with proper paragraph and list spacing */}
        <div className="mb-8">
          {processContent(content)}
        </div>

        <Spacer height="auto" className="flex-1" />

        {/* Closing */}
        <div>
          {closing},
          <Spacer height={8} />
          <div className="font-semibold">{senderContact.name}</div>
          <div>{senderContact.title}</div>
          <div>{sender.name}</div>
        </div>
      </Page>
    </Document>
  );
}

Letter.PreviewProps = {
  sender: {
    name: "TechFlow Solutions, Inc.",
    logo: "https://placehold.co/200x80?text=TechFlow",
    address: "100 Enterprise Way, Suite 300",
    city: "San Francisco, CA 94105",
    phone: "(415) 555-0123",
    email: "info@techflow.com",
    website: "www.techflow.com"
  },
  senderContact: {
    name: "Michael Chen",
    title: "Director of Enterprise Partnerships"
  },
  recipient: {
    name: "Sarah Williams",
    title: "Chief Technology Officer",
    company: "GlobalCorp Enterprises",
    address: "200 Innovation Drive",
    city: "Boston, MA 02110"
  },
  date: "April 4, 2024",
  subject: "Enterprise Software Solution Proposal - Cloud Migration Services",
  content: `Following our productive meeting last week, I am pleased to present TechFlow Solutions' formal proposal for GlobalCorp's cloud migration initiative.

Based on our discussion of your requirements, we have developed a comprehensive solution that addresses your key concerns regarding data security, minimal operational disruption, and scalability. Our proposal includes: full assessment of current infrastructure, customized migration strategy, 24/7 support during the transition period, and post-migration optimization services.

The detailed proposal document and pricing structure are attached for your review. We are confident that our solution will reduce your operational costs by approximately 35% while improving system performance by up to 60%.

We would welcome the opportunity to discuss this proposal in detail at your convenience. I will follow up with your office next week to schedule a meeting with your team.

Thank you for considering TechFlow Solutions as your technology partner. We look forward to the possibility of contributing to GlobalCorp's digital transformation journey.`,
  closing: "Best regards"
};

Letter.documentId = "letter";

export default Letter;
