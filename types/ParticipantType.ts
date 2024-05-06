export type ParticipantDataType = {
  name: string;
  displayName: string;
  email: string;
  customData: {
    tShirtSize:
    | 'fxs'
    | 'fs'
    | 'fm'
    | 'fl'
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | 'xxl'
    | 'xxxl';
    eveningEventParticipation: boolean;
    foodPreference: 'Vegan' | 'Vegetarian' | 'Meat';
    userGroup?: string;
    jobDescription?: string;
    companyName?: string;
    awsExperience?: '' | '< 1 year' | '1-3 years' | '3-5 years' | '5+ years';
  };
};

export type ParticipantType = ParticipantDataType & {
  id: string;
};

type ParticipantInputElementsType = HTMLFormControlsCollection & {
  name: HTMLInputElement;
  displayName: HTMLInputElement;
  email: HTMLInputElement;
  tShirtSize: HTMLSelectElement;
  eveningEventParticipation: HTMLSelectElement;
  foodPreference: HTMLSelectElement;
  userGroup?: HTMLInputElement;
  jobDescription?: HTMLInputElement;
  companyName?: HTMLInputElement;
  awsExperience?: HTMLSelectElement;
};

export type ParticipantFormType = HTMLFormElement & {
  readonly elements: ParticipantInputElementsType;
};
