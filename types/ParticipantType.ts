export type ParticipantType = {
  id: number;
  name: string;
  displayName: string;
  email: string;
  token: string;
};

type ParticipantInputElementsType = HTMLFormControlsCollection & {
  name: HTMLInputElement;
  displayName: HTMLInputElement;
  email: HTMLInputElement;
};

export type ParticipantFormType = HTMLFormElement & {
  readonly elements: ParticipantInputElementsType;
};
