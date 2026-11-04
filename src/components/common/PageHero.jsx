import { motion } from 'framer-motion';

// Page title banner with a photo background and a dark overlay for readable text.
// Images live in public/images/heroes/ (1600px .jpg with a 768px .jpg for phones).
const PageHero = ({ image, title, subtitle, children, align = 'left' }) => {
  const centered = align === 'center';

  return (
    <section className="relative isolate overflow-hidden bg-gray-900 text-white">
      <picture>
        <source media="(max-width: 767px)" srcSet={`/images/heroes/${image}-sm.jpg`} />
        <img
          src={`/images/heroes/${image}.jpg`}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      </picture>
      <div
        className={`absolute inset-0 -z-10 ${
          centered ? 'bg-gray-950/55' : 'bg-gradient-to-r from-gray-950/75 via-gray-900/45 to-gray-900/10'
        }`}
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-gray-950/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={centered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight drop-shadow-sm">{title}</h1>
          {subtitle && (
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">{subtitle}</p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
