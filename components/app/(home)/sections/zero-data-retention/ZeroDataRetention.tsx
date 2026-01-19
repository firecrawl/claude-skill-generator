import { CurvyRect } from "@/components/shared/ui";

import SecurityIcon from "./_svg/SecurityIcon";
import PrivacyIcon from "./_svg/PrivacyIcon";

const benefits = [
  {
    icon: SecurityIcon,
    title: "No Data Stored",
    description: "Complete data privacy with zero retention after processing",
  },
  {
    icon: PrivacyIcon,
    title: "Privacy Compliance",
    description: "Meet the strictest data protection requirements",
  },
];

export default function ZeroDataRetention() {
  return (
    <section className="container -mt-1">
      <div className="relative">
        <CurvyRect className="overlay" allSides />

        <div className="p-32 lg:p-64">
          <div className="text-center mb-48">
            <h3 className="text-title-h3 mb-16">Zero-Data Retention</h3>
            <p className="text-body-large text-black-alpha-72 max-w-2xl mx-auto">
              The ultimate privacy protection for sensitive data extraction.
              Your data is processed and immediately discarded with no storage
              whatsoever.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-32 lg:gap-48">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-16 items-start">
                <benefit.icon />
                <div>
                  <h4 className="text-label-large mb-4">{benefit.title}</h4>
                  <p className="text-body-medium text-black-alpha-72">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
