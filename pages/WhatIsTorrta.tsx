type FeatureItem = {
  icon: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    icon: '👁️',
    description: (
      <>
        She is a <b>vision of a future</b> of frontend ecosystem. What one frontend app developer dreams of.
      </>
    ),
  },
  {
    icon: '🙏🏻',
    description: (
      <>
        She is one <b>app developer wish</b> on how the frontend ecosystem may work so he would be happier in his work.
      </>
    ),
  },
  {
    icon: '🔤',
    description: (
      <>
        She is an <b>acronym</b> for title of my blog post “<b>T</b>he <b>o</b>ne <b>r</b>eact <b>r</b>ule <b>t</b>hem <b>a</b>ll” where she was born.
      </>
    ),
  },
  {
    icon: '😫',
    description: (
      <>
        She is a <b>result of frustration</b> while I was using React, NextJs, Remix, Gatsby for a while.
      </>
    ),
  },
  {
    icon: '📨',
    description: (
      <>
        She is a <b>message to framework maintainers</b> (who I admire for their skills) that there are obstackles in using their APIs.
      </>
    ),
  },
  {
    icon: '🙋🏾',
    description: (
      <>
        She is a <b>place to get feedback</b> from people smarter than me for my thoughts, so I can learn.
      </>
    ),
  },
  {
    icon: '🌊',
    description: (
      <>
        She is a <b>pool of thoughts</b> where readers (like you) could swim and imaginate the future with me.
      </>
    ),
  },
  {
    icon: '📝',
    description: (
      <>
        She is an <b>API specification</b> which helps me to organize those thoughts.
      </>
    ),
  },
  {
    icon: '👨🏻‍💻',
    description: (
      <>
        She a buggy <b>proof of concept</b> which makes me believe it is not garbage and gives me enough courage to publish here.
      </>
    ),
  }
];

function Feature({ icon, description }: FeatureItem) {
  return (
    <div className="col col-4">
      <div className="text-center pb-2 pt-24 text-[4rem]">
        {icon}
      </div>
      <div className="text-center">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function WhatIsTorrta(): JSX.Element {
  return (
    <section className="pt-2 pb-32">
      <div className="container mx-auto">
        <div className="flex flex-col max-w-sm mx-auto">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
