const SuccessStory = require('../models/SuccessStory');

const DEFAULT_STORIES = [
  {
    title: 'Democratizing Digital PCR Testing',
    challenge:
      'Requirement of end-to-end accurate, seamless, and rapid dPCR testing solution for health monitoring and the identification of SARS-CoV-2 patients.',
    solution:
      'In partnership with myindiaservice, TFS designed and built the application from scratch. It seamlessly integrates with its hardware instruments, automatically processes data for SARS-CoV-2 patients, and enables automated, precise monitoring.',
    benefits:
      'Reduced dPCR testing for Covid +ve patients from hours to minutes. With added functionalities, the platform could track community spread as well.',
    previewImage: '/images/besteggs.webp',
    logoImage: '/images/Best egg-5_1.webp',
    published: true,
    order: 1,
  },
  {
    title: 'Disrupting the Digital Lending Space',
    challenge:
      'Build a revolutionary new platform that suits their business growth needs; be able to execute and test new business propositions and offerings.',
    solution:
      'myindiaservice developed customer-facing features and internal business tools, adding new features to the core product. Our work involved developing analytics capabilities, improving customer support, and supporting a multivariate testing program.',
    benefits:
      'Provided loans to over 600,000 qualified applicants. With a Trustpilot rating of 4.8/5, over $10 billion worth of loans were transacted.',
    previewImage: '/images/laboratory-equipment_0.webp',
    logoImage: '/images/Thermo Fisher Scientific_0.webp',
    published: true,
    order: 2,
  },
  {
    title: 'Enabling Cloud-Native Content Operations',
    challenge: "A content management system (CMS) that's manual, slow, scattered, and hard to scale.",
    solution:
      "Built a fast, flexible, integrated, and Cloud-native video CMS with user-friendly functionalities that helped our client's organization to be smarter and thus highly competitive.",
    benefits:
      'Automated, integrated content processes; improved business scalability to cater to global needs and adapt to disruptions faster.',
    previewImage: '/images/Zee51.webp',
    logoImage: '/images/new-zee5.webp',
    published: true,
    order: 3,
  },
];

const seedSuccessStories = async () => {
  const count = await SuccessStory.countDocuments();
  if (count === 0) {
    await SuccessStory.insertMany(DEFAULT_STORIES);
    console.log('Default success stories seeded');
  }
};

module.exports = seedSuccessStories;
