export interface EVAResponse {
  text: string;
  suggestions?: string[];
}

const responses: Record<string, EVAResponse> = {
  'employment insurance': {
    text: 'Employment Insurance (EI) provides temporary financial assistance to unemployed Canadians while they look for work or upgrade their skills. You may be eligible if you have lost your job through no fault of your own and have worked enough insurable hours. To qualify, you typically need between 420 to 700 hours of insurable employment, depending on your region\'s unemployment rate.',
    suggestions: ['How do I apply for EI?', 'What are the EI payment amounts?', 'EI eligibility requirements']
  },
  'ei': {
    text: 'Employment Insurance (EI) provides temporary income support. Regular benefits are available to individuals who lose their job through no fault of their own. The maximum benefit amount is 55% of your average insurable weekly earnings, up to a yearly maximum.',
    suggestions: ['Apply for EI', 'EI payment schedule', 'EI reporting requirements']
  },
  'apply for ei': {
    text: 'To apply for Employment Insurance, visit canada.ca/ei or call 1-800-206-7218. You will need your Social Insurance Number, banking information, and Records of Employment from all your employers in the last 52 weeks. Applications must be submitted within 4 weeks of your last day of work.',
    suggestions: ['What documents do I need?', 'How long does EI processing take?']
  },
  'old age security': {
    text: 'Old Age Security (OAS) is a monthly payment available to most Canadians 65 years of age or older. You do not need to have worked to receive OAS. The amount depends on how long you have lived in Canada after age 18. For maximum benefits, you need 40 years of Canadian residence.',
    suggestions: ['OAS eligibility', 'OAS payment amounts', 'When to apply for OAS']
  },
  'oas': {
    text: 'Old Age Security (OAS) is a monthly payment for seniors 65+. Most Canadians are automatically enrolled - Service Canada will send you a letter when you turn 64. The payment amount is based on how many years you\'ve lived in Canada after age 18.',
    suggestions: ['OAS application process', 'Living outside Canada and OAS']
  },
  'pension': {
    text: 'There are two main pension programs: Old Age Security (OAS) for seniors 65+, and Canada Pension Plan (CPP) which requires contributions during your working years. OAS is funded by general tax revenues, while CPP is funded by employee and employer contributions.',
    suggestions: ['Tell me about CPP', 'Tell me about OAS', 'Can I receive both?']
  },
  'canada pension': {
    text: 'Canada Pension Plan (CPP) is a contributory, earnings-related social insurance program. It provides retirement pensions, disability benefits, and survivor benefits. You contribute to CPP through payroll deductions during your working years. The standard age to start receiving CPP retirement pension is 65, but you can start as early as 60 or as late as 70.',
    suggestions: ['CPP payment amounts', 'Early vs late CPP', 'CPP disability benefits']
  },
  'cpp': {
    text: 'Canada Pension Plan (CPP) provides retirement, disability, and survivor benefits. Your CPP retirement pension amount is based on how much and for how long you contributed to the plan. The maximum monthly payment for new beneficiaries starting at age 65 varies annually.',
    suggestions: ['Check my CPP contributions', 'CPP retirement planning', 'CPP survivor benefits']
  },
  'job': {
    text: 'ESDC offers many job search resources including Job Bank (jobbank.gc.ca), skills training programs, and employment services. Job Bank features thousands of job postings across Canada, resume builder tools, and labour market information to help you make informed career decisions.',
    suggestions: ['Visit Job Bank', 'Skills training programs', 'Career planning tools']
  },
  'work': {
    text: 'Looking for work? Visit Job Bank at jobbank.gc.ca to search thousands of job postings across Canada. You can also access career planning tools, labour market information, and connect with employment services in your area. Job Bank also offers a Job Match service that notifies you of opportunities matching your profile.',
    suggestions: ['Create Job Bank account', 'Employment services near me', 'Resume writing tips']
  },
  'benefits': {
    text: 'ESDC administers several benefit programs including Employment Insurance (EI), Canada Pension Plan (CPP), Old Age Security (OAS), and partners with provinces on social programs. Each program has different eligibility requirements and application processes.',
    suggestions: ['Employment Insurance', 'Canada Pension Plan', 'Old Age Security', 'Benefits Finder tool']
  },
  'disability': {
    text: 'The Canada Pension Plan Disability (CPP-D) benefit provides financial assistance to contributors who cannot work due to a severe and prolonged disability. To qualify, you must have made enough CPP contributions and have a disability that prevents you from working regularly.',
    suggestions: ['CPP disability eligibility', 'How to apply for CPP-D', 'Medical requirements']
  },
  'student': {
    text: 'The Canada Student Loans Program provides financial assistance to post-secondary students. Additionally, students may be eligible for EI if they\'ve worked enough hours, and various youth employment programs exist to help students gain work experience.',
    suggestions: ['Canada Student Loans', 'Summer jobs programs', 'Youth employment programs']
  },
  'family': {
    text: 'Canada offers several family benefits including the Canada Child Benefit (CCB), administered by the Canada Revenue Agency. ESDC also provides parental and maternity benefits through Employment Insurance for new parents.',
    suggestions: ['Maternity benefits', 'Parental benefits', 'Canada Child Benefit']
  },
  'default': {
    text: 'I can help you with information about ESDC programs and services. Ask me about Employment Insurance (EI), Old Age Security (OAS), Canada Pension Plan (CPP), job search resources, or benefits programs.',
    suggestions: ['Employment Insurance', 'Old Age Security', 'Canada Pension Plan', 'Find a job']
  }
};

export function getEVAResponse(userMessage: string): EVAResponse {
  const msg = userMessage.toLowerCase().trim();
  
  for (const [trigger, response] of Object.entries(responses)) {
    if (trigger !== 'default' && msg.includes(trigger)) {
      return response;
    }
  }
  
  return responses.default;
}
