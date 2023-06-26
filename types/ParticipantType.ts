export type ParticipantType = {
  id: number;
  name: string;
  displayName: string;
  email: string;
  customData: {
    tShirtSize: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
    eventParticipation: boolean;
    foodPreference: 'Vegan' | 'Vegetarian' | 'Meat';
    jobDescription?: string;
    companyName?: string;
    awsExperience?: '< 1 year' | '1-3 years' | '3-5 years' | '5+ years';
  };
};

type ParticipantInputElementsType = HTMLFormControlsCollection & {
  name: HTMLInputElement;
  displayName: HTMLInputElement;
  email: HTMLInputElement;
  tShirtSize: HTMLSelectElement;
  eventParticipation: HTMLSelectElement;
  foodPreference: HTMLSelectElement;
  jobDescription?: HTMLInputElement;
  companyName?: HTMLInputElement;
  awsExperience?: HTMLSelectElement;
};

export type ParticipantFormType = HTMLFormElement & {
  readonly elements: ParticipantInputElementsType;
};
