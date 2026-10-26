export interface WizardTopic {
  key: string;
  value: string;
  title: string;
  description: string;
  icon: 'Briefcase' | 'Code2' | 'Users' | 'MessageSquare';
  iconBgClass: string;
  iconTextClass: string;
  hoverTextClass: string;
}

export const WIZARD_TOPICS: WizardTopic[] = [
  {
    key: '1',
    value: 'Job opportunity',
    title: 'Job opportunity',
    description: 'Full-time role or contract',
    icon: 'Briefcase',
    iconBgClass: 'bg-accent-from/10',
    iconTextClass: 'text-accent-from',
    hoverTextClass: 'group-hover:text-accent-from',
  },
  {
    key: '2',
    value: 'Freelance project',
    title: 'Freelance project',
    description: 'App or architecture audit',
    icon: 'Code2',
    iconBgClass: 'bg-accent-via/10',
    iconTextClass: 'text-accent-via',
    hoverTextClass: 'group-hover:text-accent-via',
  },
  {
    key: '3',
    value: 'Collaboration',
    title: 'Collaboration',
    description: 'Open source co-building',
    icon: 'Users',
    iconBgClass: 'bg-accent-to/10',
    iconTextClass: 'text-accent-to',
    hoverTextClass: 'group-hover:text-accent-to',
  },
  {
    key: '4',
    value: 'Just saying hi',
    title: 'Just saying hi',
    description: 'Networking or friendly chat',
    icon: 'MessageSquare',
    iconBgClass: 'bg-available/10',
    iconTextClass: 'text-available',
    hoverTextClass: 'group-hover:text-available',
  },
];
