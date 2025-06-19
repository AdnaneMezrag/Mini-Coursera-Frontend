import Module from "./Module";

type ModuleType = {
  name: string;
  description: string;
};

const Modules = ({ modules }: { modules: ModuleType[] }) => {
  return (
    <section className="relative z-5 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] description-center lg:mb-20">
              <h2 className="mb-4 description-3xl font-bold description-dark dark:description-white sm:description-[40px]/[48px]">
                Explore the Course Modules
              </h2>
              <p className="description-base description-body-color dark:description-dark-6">
                This course is broken down into focused modules to help you learn step by step.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          {modules.map((mod, index) => (
            <div key={index} className="w-full px-4 lg:w-1/2 mb-6">
              <Module name={mod.name} description={mod.description} />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative SVG */}
      <div className="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3056D3" stopOpacity="0.36" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0.096144" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Modules;
