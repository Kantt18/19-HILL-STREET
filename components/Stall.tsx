type StallProps = {
  id: string;
  no: string;
  name: string;
  tag: string;
  desc: string;
};

// One "stall" card in the courtyard grid. Accent color is set via a CSS
// custom property so the hover-fill in globals.css picks it up per-kitchen
// without needing four near-duplicate CSS blocks.
export default function Stall({ id, no, name, tag, desc }: StallProps) {
  return (
    <div className="stall" id={id} tabIndex={0}>
      <div>
        <span className="stall-no">{no}</span>
        <h3 className="stall-name">{name}</h3>
        <span className="stall-tag">{tag}</span>
      </div>
      <p className="stall-desc">{desc}</p>
    </div>
  );
}
