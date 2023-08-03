import { useQRCode } from 'next-qrcode';

export default function RegistrationQRCode({
  eventId,
  participantEmail,
}: {
  eventId: string;
  participantEmail: string;
}) {
  const { Canvas } = useQRCode();
  const seperator = '#';

  return (
    <Canvas
      text={`${eventId}${seperator}${participantEmail}`}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    />
  );
}
