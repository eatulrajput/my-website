interface QuotesProps {
  quoteId: string
  quote: React.ReactNode;
  attributed_to: string;
}

export const Quotes: QuotesProps[] = [
  {
    quoteId: "QU001",
    quote: (
      <p>
        Be like water making its way through cracks. Do not be assertive, but
        adjust to the object, and you shall find a way around or through it. If
        nothing within you stays rigid, outward things will disclose themselves.{" "}
        <b /> Empty your mind, be formless. Shapeless, like water. If you put
        water into a cup, it becomes the cup. You put water into a bottle and it
        becomes the bottle. You put it in a teapot, it becomes the teapot. Now,
        water can flow or it can crash. Be water, my friend.
      </p>
    ),
    attributed_to: "Bruce Lee",
  },
  {
    quoteId: "QU002",
    quote: <p>If you can't explain it to a six year old, you don't understand it yourself.</p>,
    attributed_to: "Albert Einstein",
  },
  {
    quoteId: "QU003",
    quote: <p>I have not failed. I've just found 10,000 ways that won't work.</p>,
    attributed_to: "Thomas Alva Edison",
  },
  {
    quoteId: "QU004",
    quote: <p>I have never let my schooling interfere with my education.</p>,
    attributed_to: "Mark Twain",
  },
  {
    quoteId: "QU005",
    quote: <p>What would men be without women? Scarce, sir...mighty scarce.</p>,
    attributed_to: "Mark Twain",
  },
  {
    quoteId: "QU006",
    quote: <p>Don't go around saying the world owes you a living. The world owes you nothing. It was here first.</p>,
    attributed_to: "Mark Twain",
  },
  {
    quoteId: "QU007",
    quote: <p>Do not believe in anything simply because you have heard it. Do not believe in anything simply because it is spoken and rumored by many. Do not believe in anything simply because it is found written in your religious books. Do not believe in anything merely on the authority of your teachers and elders. Do not believe in traditions because they have been handed down for many generations. But after observation and analysis, when you find that anything agrees with reason and is conducive to the good and benefit of one and all, then accept it and live up to it.</p>,
    attributed_to: "Gautam Buddha",
  },
  {
    quoteId: "QU008",
    quote: <p>अपूर्वः कोऽपि कोशोऽयं विद्यते तव भारति।व्ययतो वृद्धिम् आयाति क्षयम् आयाति सञ्चयात्॥</p>,
    attributed_to: "Sanskrit Book",
  }
];
