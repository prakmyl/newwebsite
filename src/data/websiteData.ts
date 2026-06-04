import { ServiceDetail, Industry, EngagementStep } from '../types';

export const servicesData: ServiceDetail[] = [
  {
    id: 'it-services',
    number: 1,
    title: 'IT Services',
    tagline: 'Building Technology That Drives Business Growth',
    description: 'Our IT Services division helps organizations modernize infrastructure, streamline operations, and develop scalable technology solutions.',
    iconName: 'Laptop',
    features: [
      'Reduced operational downtime',
      'Improved business productivity',
      'Secure and scalable infrastructure',
      'Cost-effective technology management'
    ],
    subServices: [
      {
        name: 'Application Development',
        description: 'Custom web, mobile, and enterprise applications designed around your business requirements.'
      },
      {
        name: 'Cloud Solutions',
        description: 'Cloud migration, deployment, management, optimization, and support across modern cloud platforms.'
      },
      {
        name: 'Managed IT Services',
        description: 'End-to-end IT monitoring, maintenance, infrastructure management, and technical support.'
      },
      {
        name: 'ERP & CRM Solutions',
        description: 'Implementation, customization, and support for ERP and customer relationship management systems.'
      },
      {
        name: 'Software Testing & Quality Assurance',
        description: 'Comprehensive testing services ensuring reliability, security, and performance.'
      },
      {
        name: 'IT Infrastructure Support',
        description: 'Network management, server administration, security monitoring, and system optimization.'
      }
    ],
    benefits: [
      'Reduced operational downtime',
      'Improved business productivity',
      'Secure and scalable infrastructure',
      'Cost-effective technology management'
    ]
  },
  {
    id: 'ites',
    number: 2,
    title: 'IT Enabled Services (ITES)',
    tagline: 'Enhancing Business Operations Through Technology',
    description: 'Our ITES solutions help organizations improve customer engagement, streamline administrative processes, and optimize service delivery.',
    iconName: 'PhoneCall',
    features: [
      'Faster turnaround times',
      'Enhanced customer satisfaction',
      'Improved operational efficiency',
      'Reduced administrative burden'
    ],
    subServices: [
      {
        name: 'Technical Help Desk Support',
        description: 'Multi-channel support services for customers and employees.'
      },
      {
        name: 'Email & Chat Support',
        description: 'Professional customer assistance through digital communication channels.'
      },
      {
        name: 'Data Management Services',
        description: 'Data entry, validation, cleansing, migration, and maintenance.'
      },
      {
        name: 'Virtual Assistant Services',
        description: 'Administrative and operational support for growing businesses.'
      },
      {
        name: 'Document Processing',
        description: 'Digitization, indexing, document management, and workflow automation.'
      },
      {
        name: 'Back Office Operations',
        description: 'Efficient handling of routine business processes and administrative functions.'
      }
    ],
    benefits: [
      'Faster turnaround times',
      'Enhanced customer satisfaction',
      'Improved operational efficiency',
      'Reduced administrative burden'
    ]
  },
  {
    id: 'bpo',
    number: 3,
    title: 'Business Process Outsourcing (BPO)',
    tagline: 'Streamlining Operations for Maximum Efficiency',
    description: 'Our BPO solutions enable businesses to focus on strategic growth while we manage operational processes.',
    iconName: 'Briefcase',
    features: [
      'Lower operating costs',
      'Increased efficiency',
      'Flexible resource scaling',
      'Improved service quality'
    ],
    subServices: [
      {
        name: 'Customer Support Services',
        description: 'Voice, email, and chat support operations.'
      },
      {
        name: 'Back Office Processing',
        description: 'Order management, transaction processing, and administrative support.'
      },
      {
        name: 'Data Entry & Processing',
        description: 'Accurate and secure processing of business-critical information.'
      },
      {
        name: 'Finance & Accounting Support',
        description: 'Invoice processing, accounts payable, accounts receivable, and reconciliation support.'
      },
      {
        name: 'HR Process Support',
        description: 'Employee onboarding, documentation management, and HR administration.'
      },
      {
        name: 'Operations Management',
        description: 'Process optimization and workflow management.'
      }
    ],
    benefits: [
      'Lower operating costs',
      'Increased efficiency',
      'Flexible resource scaling',
      'Improved service quality'
    ]
  },
  {
    id: 'kpo',
    number: 4,
    title: 'Knowledge Process Outsourcing (KPO)',
    tagline: 'Turning Data Into Business Intelligence',
    description: 'Our KPO services provide high-value analytical and knowledge-based solutions that support informed decision-making.',
    iconName: 'BrainCircuit',
    features: [
      'Better decision-making',
      'Data-driven growth strategies',
      'Improved forecasting',
      'Competitive advantage'
    ],
    subServices: [
      {
        name: 'Market Research',
        description: 'Industry analysis, competitor benchmarking, and market intelligence.'
      },
      {
        name: 'Business Research',
        description: 'Strategic research and business insight generation.'
      },
      {
        name: 'Data Analytics',
        description: 'Data interpretation, reporting, and visualization.'
      },
      {
        name: 'Financial Analysis Support',
        description: 'Business performance analysis and reporting assistance.'
      },
      {
        name: 'Report Preparation',
        description: 'Research reports, dashboards, presentations, and management summaries.'
      },
      {
        name: 'Business Intelligence Services',
        description: 'Transforming data into actionable insights.'
      }
    ],
    benefits: [
      'Better decision-making',
      'Data-driven growth strategies',
      'Improved forecasting',
      'Competitive advantage'
    ]
  },
  {
    id: 'ai-automation',
    number: 5,
    title: 'AI Automation Services',
    tagline: 'Intelligent Automation for Modern Businesses',
    description: 'Leverage Artificial Intelligence and automation technologies to eliminate repetitive tasks, improve productivity, and accelerate business operations.',
    iconName: 'Cpu',
    features: [
      'Increased productivity',
      'Reduced manual effort',
      'Faster response times',
      'Higher operational accuracy',
      'Scalable business processes'
    ],
    subServices: [
      {
        name: 'AI-Powered Business Automation',
        description: 'Automating routine workflows and business processes.'
      },
      {
        name: 'Intelligent Document Processing',
        description: 'Automated extraction and processing of business documents.'
      },
      {
        name: 'AI Chatbots & Virtual Assistants',
        description: '24/7 customer engagement and support automation.'
      },
      {
        name: 'Workflow Automation',
        description: 'Automating approvals, notifications, reporting, and operational tasks.'
      },
      {
        name: 'Predictive Analytics',
        description: 'Using AI to identify trends, opportunities, and risks.'
      },
      {
        name: 'Generative AI Solutions',
        description: 'Custom AI solutions for content generation, knowledge management, and customer engagement.'
      }
    ],
    benefits: [
      'Increased productivity',
      'Reduced manual effort',
      'Faster response times',
      'Higher operational accuracy',
      'Scalable business processes'
    ]
  },
  {
    id: 'digital-transformation',
    number: 6,
    title: 'Digital Transformation & Digitalization',
    tagline: "Digitalisation Is No Longer Optional. It's Essential.",
    description: 'We help organizations modernize traditional business operations through technology-driven transformation initiatives.',
    iconName: 'Shuffle',
    features: [
      'Improved efficiency',
      'Reduced operational costs',
      'Better customer experience',
      'Enhanced collaboration',
      'Increased business agility'
    ],
    subServices: [
      {
        name: 'Business Process Digitalization',
        description: 'Converting manual workflows into automated digital processes.'
      },
      {
        name: 'Paperless Office Solutions',
        description: 'Digital document management and workflow automation.'
      },
      {
        name: 'Process Automation',
        description: 'Improving efficiency through technology-enabled workflows.'
      },
      {
        name: 'CRM & Customer Experience Transformation',
        description: 'Creating seamless digital customer journeys.'
      },
      {
        name: 'Data Analytics & Reporting',
        description: 'Real-time visibility into business performance.'
      },
      {
        name: 'Enterprise Mobility Solutions',
        description: 'Access business operations anytime, anywhere.'
      }
    ],
    benefits: [
      'Improved efficiency',
      'Reduced operational costs',
      'Better customer experience',
      'Enhanced collaboration',
      'Increased business agility'
    ]
  },
  {
    id: 'it-recruitment',
    number: 7,
    title: 'IT Recruitment & Staffing',
    tagline: 'Connecting Businesses with Exceptional Technology Talent',
    description: 'We help organizations find, evaluate, and hire top technology professionals quickly and efficiently.',
    iconName: 'Users',
    features: [
      'Access to skilled talent',
      'Faster hiring cycles',
      'Reduced recruitment costs',
      'Flexible engagement models'
    ],
    subServices: [
      {
        name: 'Permanent Staffing',
        description: 'Full-time technology hiring solutions.'
      },
      {
        name: 'Contract Staffing',
        description: 'Flexible staffing for project-based requirements.'
      },
      {
        name: 'Dedicated Offshore Teams',
        description: 'Build and manage remote technical teams from India.'
      },
      {
        name: 'Executive Technology Hiring',
        description: 'Leadership and specialized technology recruitment.'
      },
      {
        name: 'Resource Augmentation',
        description: 'Scale your workforce on demand.'
      },
      {
        name: 'Talent Acquisition Consulting',
        description: 'Recruitment strategy and hiring process optimization.'
      }
    ],
    benefits: [
      'Access to skilled talent',
      'Faster hiring cycles',
      'Reduced recruitment costs',
      'Flexible engagement models'
    ],
    rolesRecruited: [
      'Software Developers',
      'Cloud Engineers',
      'DevOps Engineers',
      'Cybersecurity Specialists',
      'Data Analysts',
      'AI Engineers',
      'Project Managers',
      'Business Analysts',
      'IT Support Professionals'
    ]
  }
];

export const industriesData: Industry[] = [
  {
    id: 'retail',
    name: 'Retail & Wholesale',
    iconName: 'ShoppingBag',
    description: 'Accelerate digital sales & scale complex inventory supply-chains with enterprise e-commerce solutions.'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    iconName: 'Factory',
    description: 'Enhance predictive analytics and paperless scheduling platforms to improve process efficiencies.'
  },
  {
    id: 'logistics',
    name: 'Logistics & Transportation',
    iconName: 'Truck',
    description: 'Streamline shipping flows, order integrations, and dynamic telemetry systems.'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    iconName: 'HeartPulse',
    description: 'Secure, HIPAA-compliant workflow automation and reliable back-office support.'
  },
  {
    id: 'education',
    name: 'Education & Training',
    iconName: 'GraduationCap',
    description: 'Modernizing student dashboards, LMS applications, and interactive virtual tools.'
  },
  {
    id: 'hospitality',
    name: 'Restaurants & Hospitality',
    iconName: 'Coffee',
    description: 'Optimizing table bookings, digital workflows, and seamless guest service desk channels.'
  },
  {
    id: 'construction',
    name: 'Real Estate & Construction',
    iconName: 'Building2',
    description: 'Transform contract indexes, asset registries, and field operations tools.'
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Agri Business',
    iconName: 'Sprout',
    description: 'Smart tech analysis and business process support for modern food chains.'
  },
  {
    id: 'saas',
    name: 'Technology & SaaS',
    iconName: 'Cloud',
    description: 'Dynamic resource scaling, custom full-stack developer hiring, and full product testing.'
  },
  {
    id: 'financial',
    name: 'Financial Services',
    iconName: 'TrendingUp',
    description: 'High-value analytics, accurate reconciliation audits, and automated invoice processing.'
  },
  {
    id: 'professional',
    name: 'Professional Services',
    iconName: 'UserCheck',
    description: 'Virtual administration services, legal docket organization, and client report preparation.'
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    iconName: 'Globe',
    description: 'Comprehensive 24/7 client operations, cart management, and multi-channel chat help desks.'
  }
];

export const engagementModelSteps: EngagementStep[] = [
  {
    step: 1,
    title: 'Understand Your Requirements',
    description: 'We assess your goals, challenges, and opportunities.'
  },
  {
    step: 2,
    title: 'Build Your Dedicated Team',
    description: 'We assemble the right experts for your project.'
  },
  {
    step: 3,
    title: 'Execute & Deliver',
    description: 'We implement solutions with agility and precision.'
  },
  {
    step: 4,
    title: 'Monitor & Optimize',
    description: 'Continuous improvement through analytics and reporting.'
  },
  {
    step: 5,
    title: 'Scale & Grow Together',
    description: 'Expand capabilities as your business evolves.'
  }
];

export const chooseUsFactors = [
  {
    title: 'Cost-Effective Global Delivery',
    description: 'US business presence combined with offshore delivery excellence in Chennai, India.'
  },
  {
    title: 'Skilled & Experienced Teams',
    description: 'Access specialized professionals across technology, analytics, and business domains.'
  },
  {
    title: 'Flexible Engagement Models',
    description: 'Scale developer, back-office, or research resources based on changing business needs.'
  },
  {
    title: 'Data Security & Compliance',
    description: 'Strong focus on confidentiality, compliance, encryption, and process governance.'
  },
  {
    title: 'Transparent Communication',
    description: 'Regular status reports, Slack/Teams presence, and direct collaborative engagement.'
  },
  {
    title: '24/7 Operational Support',
    description: 'Round-the-clock shift staffing to support global enterprises in different timezones.'
  },
  {
    title: 'Long-Term Partnership Approach',
    description: 'Focused on sustainable growth, process improvements, and measurable business outcomes.'
  }
];
