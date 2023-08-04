'use client';

import { useQRCode } from 'next-qrcode';

export default function RegistrationQRCode({
  eventId,
  participantId,
}: {
  eventId: string;
  participantId: string;
}) {
  const { Canvas } = useQRCode();
  const seperator = '#';

  return (
    <Canvas
      text={`${eventId}${seperator}${participantId}`}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 400,
        color: {
          dark: '#000',
          light: '#fff',
        },
      }}
    />
  );
}
