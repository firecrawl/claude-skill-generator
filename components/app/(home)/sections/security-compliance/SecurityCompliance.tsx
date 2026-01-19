import { CurvyRect } from "@/components/shared/ui";
import Star from "@/components/shared/Footer/footer2/Head/_svg/Star";
import LockIcon from "./_svg/LockIcon";

const securityFeatures = [
  {
    title: "SOC 2 Type II Certified",
    description:
      "Independently audited security controls ensuring the highest standards of data protection and operational security",
    isSoc2: true,
  },
  {
    title: "Zero Day Retention",
    description:
      "Your data is processed and immediately deleted. We don't store your scraped content, ensuring complete privacy and compliance with strict data retention policies.",
  },
];

export default function SecurityCompliance() {
  return (
    <section className="container -mt-1">
      <div className="relative">
        <CurvyRect className="overlay" allSides />

        <div className="p-32 lg:p-64">
          <div className="text-center mb-48">
            <h3 className="text-title-h3 mb-16">
              Enterprise Security & Compliance
            </h3>
            <p className="text-body-large text-black-alpha-72 max-w-2xl mx-auto">
              Your data security is our top priority. We maintain the highest
              standards of protection with industry-leading certifications and
              comprehensive security measures.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-32 lg:gap-48 max-w-4xl mx-auto">
            {securityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-24">
                  {feature.isSoc2 ? (
                    <div className="size-88 relative p-9">
                      <Star />
                      <div
                        className="size-70 text-center rounded-full pt-19"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.40) 100%)",
                          boxShadow:
                            "0px 16px 24px -6px rgba(0, 0, 0, 0.04), 0px 8px 12px -4px rgba(0, 0, 0, 0.04), 0px 4px 8px -2px rgba(0, 0, 0, 0.03), 0px 0px 0px 1px rgba(0, 0, 0, 0.03)",
                        }}
                      >
                        <div className="text-[13px]/[20px] font-[500] tracking-[0.26px] text-heat-100">
                          AICPA
                        </div>
                        <div className="text-black-alpha-40 text-[10px]/[12px] font-[450]">
                          SOC 2
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="size-88 flex items-center justify-center">
                      <LockIcon />
                    </div>
                  )}
                </div>
                <h4 className="text-label-large mb-8">{feature.title}</h4>
                <p className="text-body-medium text-black-alpha-72">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
