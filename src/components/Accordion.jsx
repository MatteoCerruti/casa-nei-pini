import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Accordion.css";

function AccordionItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef(null);

  return (
    <div className="accordion-item">
      <button
        type="button"
        className="accordion-question"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{q}</span>
        <ChevronDown className={`accordion-chevron${open ? " accordion-chevron-open" : ""}`} size={18} strokeWidth={1.75} />
      </button>
      <div
        className="accordion-answer-wrapper"
        style={{ maxHeight: open ? `${contentRef.current?.scrollHeight ?? 500}px` : "0px" }}
      >
        <p className="accordion-answer" ref={contentRef}>
          {a}
        </p>
      </div>
    </div>
  );
}

function Accordion({ groups }) {
  return (
    <div className="accordion">
      {groups.map((group, gi) => (
        <div className="accordion-group" key={gi}>
          <h2 className="card-group-title accordion-group-title">{group.title}</h2>
          <div className="accordion-list">
            {group.questions.map((item, qi) => (
              <AccordionItem key={qi} q={item.q} a={item.a} defaultOpen={qi === 0} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;
