import React from 'react';

/**
 * Section Component
 *
 * A semantic section wrapper with consistent spacing.
 *
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Section content
 * @param {string} id - Section ID for anchor links
 * @param {string} background - Background variant ('default' | 'alternate' | 'dark')
 */
export const Section = React.forwardRef(function Section(
  {
    className = '',
    children,
    id,
    background = 'default',
    ...props
  },
  ref
) {
  const backgroundClasses = {
    default: 'bg-neutral-50',
    alternate: 'bg-white',
    dark: 'bg-neutral-900 text-white',
  };

  const classes = `section ${backgroundClasses[background]} ${className}`.trim();

  return (
    <section ref={ref} className={classes} id={id} {...props}>
      {children}
    </section>
  );
});

export default Section;
