import { CurvyRect } from "@/components/shared/ui";

import AutoIcon from "./_svg/AutoIcon";
import VolumeIcon from "./_svg/VolumeIcon";
import SeamlessIcon from "./_svg/SeamlessIcon";
import ValidityIcon from "./_svg/ValidityIcon";

const benefits = [
  {
    icon: AutoIcon,
    title: "Automatic Activation",
    description: "Credits are automatically purchased when balance is low",
  },
  {
    icon: VolumeIcon,
    title: "Volume Discounts",
    description: "Get better rates with bulk credit purchases",
  },
  {
    icon: SeamlessIcon,
    title: "No Service Interruption",
    description: "Your applications keep running without downtime",
  },
  {
    icon: ValidityIcon,
    title: "12-Month Validity",
    description: "All auto-charged credits are valid for a full year",
  },
];

const steps = [
  {
    step: "1",
    title: "Low Balance Detection",
    description: "System monitors your credit balance automatically",
  },
  {
    step: "2",
    title: "Auto-Purchase Triggered",
    description: "Credit pack is purchased when threshold is reached",
  },
  {
    step: "3",
    title: "Instant Credit Addition",
    description: "Credits are immediately added to your account",
  },
  {
    step: "4",
    title: "Continued Operation",
    description: "Your services continue without interruption",
  },
];

export default function AutoChargePacks() {
  return (
    <section className="container -mt-1">
      <div className="relative">
        <CurvyRect className="overlay" allSides />

        <div className="p-32 lg:p-64">
          <div className="text-center mb-48">
            <h3 className="text-title-h3 mb-16">Never Run Out of Credits</h3>
            <p className="text-body-large text-black-alpha-72 max-w-2xl mx-auto">
              Auto-charge packs ensure your applications never stop working.
              Automatic credit purchasing with volume discounts and seamless
              billing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-48 lg:gap-64 mb-48">
            <div>
              <h4 className="text-title-h5 mb-24">How It Works</h4>
              <div className="space-y-24">
                {steps.map((step) => (
                  <div key={step.step} className="flex gap-16 items-start">
                    <div className="w-40 h-40 bg-heat-100 text-white rounded-full flex items-center justify-center text-label-medium font-medium flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h5 className="text-label-large mb-4">{step.title}</h5>
                      <p className="text-body-medium text-black-alpha-72">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-title-h5 mb-24">Key Benefits</h4>
              <div className="space-y-24">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-16 items-start">
                    <benefit.icon />
                    <div>
                      <h5 className="text-label-large mb-4">{benefit.title}</h5>
                      <p className="text-body-medium text-black-alpha-72">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
