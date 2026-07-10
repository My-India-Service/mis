const TECH_ITEMS = [
  'React',
  'JavaScript',
  'Angular',
  'MongoDB',
  'PHP',
  'Python',
  'C#',
  'C++',
  'JAVA',
  '.Net',
  'PostgresQl',
];

function MarqueeRow({ reverse = false }) {
  const items = [...TECH_ITEMS, ...TECH_ITEMS];
  return (
    <div className={`sc-dcJtft hoxTPo`}>
      <div className={reverse ? 'sc-gsFSjX JBLHL' : 'sc-iGgVNO gqseiz'}>
        {items.map((item, i) => (
          <div className="sc-kAycRU bAbiCP" key={`${item}-${i}`}>
            <div className="sc-imWZod kqqzFG">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Marquee() {
  return (
    <div className="sc-aYaIB kNzegL">
      <div className="sc-gEvDqW iYwjAg">
        <div className="sc-eqUzNf hlLENl">Yes. We cover your tech stack.</div>
        <div className="sc-fqkwJk iBDcFm">Our team has expertise in almost every programming language.</div>
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </div>
  );
}

export default Marquee;
