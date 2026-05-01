import { ChevronDown } from "lucide-react";

export function Accordion({
  items,
  openIndex,
  openIndexes,
  onToggle,
  compact = false,
  className = ""
}) {
  return (
    <div className={`accordion ${className}`}>
      {items.map((item, index) => {
        const isOpen = Array.isArray(openIndexes)
          ? openIndexes.includes(index)
          : openIndex === index;
        const content = item.content ?? item.answer ?? item.description;

        return (
          <div className={`accordion-item ${isOpen ? "is-open" : ""}`} key={`${item.title || item.question}-${index}`}>
            <button
              type="button"
              className={`accordion-trigger ${compact ? "accordion-trigger--compact" : ""}`}
              onClick={() => onToggle(index)}
            >
              <div className="accordion-head">
                {item.leading ? <div className="accordion-leading">{item.leading}</div> : null}
                <div>
                  <div className="accordion-title">{item.title || item.question}</div>
                  {!compact && item.description ? (
                    <div className="accordion-description">{item.description}</div>
                  ) : null}
                </div>
              </div>
              <ChevronDown size={18} />
            </button>
            {isOpen ? (
              <div className="accordion-content">
                {typeof content === "string" ? <p>{content}</p> : content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
