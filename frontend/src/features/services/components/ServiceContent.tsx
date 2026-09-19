import type { Deliverable, WorkflowStep } from "@/src/features/services/types";

type ServiceDeliverablesProps = {
  items: readonly Deliverable[];
};

export function ServiceDeliverables({ items }: ServiceDeliverablesProps) {
  return (
    <div className="ds-service-deliverables">
      {items.map((item, index) => {
        return (
          <article key={item.title} className="ds-service-deliverable" style={{ animationDelay: `${index * 80}ms` }}>
            <div className="ds-service-deliverable-topline">
              <span className="ds-service-deliverable-number">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        );
      })}
    </div>
  );
}

export function ServiceTimeline({ steps }: { steps: readonly WorkflowStep[] }) {
  return (
    <div className="ds-service-process">
      {steps.map((step, index) => (
        <article key={step.step} className="ds-service-step" style={{ animationDelay: `${index * 120}ms` }}>
          <span className="ds-service-step-number">{step.step}</span>
          <h3>{step.title}</h3>
          <p>{step.desc}</p>
        </article>
      ))}
    </div>
  );
}
