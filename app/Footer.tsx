import Link from 'next/link';

export default function Footer() {
  const url_dach = 'https://www.aws-community.de';

  return (
    <footer className='bg-dark text-white py-10 px-5 md:px-32'>
      <div className='flex flex-wrap justify-between'>
        <div className='w-full md:w-auto mb-6 md:mb-0 max-w-lg'>
          <p className='mb-1'>
            <strong>Responsible:</strong>
          </p>
          <p>
            Förderverein AWS Community DACH e.V.
            <br />
            c/o Taimos GmbH
            <br />
            Schorndorfer Str. 45
            <br />
            73262 Reichenbach
          </p>
          <p>
            <a href='mailto:info@aws-community.de'>info@aws-community.de</a>
          </p>
        </div>

        <div className='w-full md:w-auto mb-6 max-w-lg'>
          <p className='mb-1'>
            <strong>Social Media</strong>
          </p>
          <p>
            <a href='https://join.slack.com/t/awscommunityde/shared_invite/zt-1eflev5fm-rTvv6JVNkm2fpYsI7ZiOjw'>
              Slack
            </a>
            <br />
            <a href='https://twitter.com/AWSCommunityDE' target='_blank'>
              Twitter
            </a>
            <br />
            <a href='https://www.youtube.com/channel/UCX-J1iya6qNMFwWtsUJxXtg'>
              YouTube
            </a>
            <br />
            <a href='https://www.linkedin.com/company/aws-community-dach/'>
              LinkedIn
            </a>
            <br />
          </p>
        </div>
        <div className='w-full md:w-auto max-w-lg'>
          <p className='mb-1'>
            <strong>The boring stuff</strong>
          </p>
          <p>
            <Link href={`${url_dach}/imprint`} target='_blank'>
              Imprint
            </Link>
            <br />
            <Link href={`${url_dach}/privacy`} target='_blank'>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
