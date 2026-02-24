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
export function Section({
  className = '',
  children,
  id,
  background = 'default',
  ...props
}) {
  const backgroundClasses = {
    default: 'bg-neutral-50',
    alternate: 'bg-white',
    dark: 'bg-neutral-900 text-neutral-50',
  };

  const classes = `section ${backgroundClasses[background]} ${className}`.trim();

  return (
    <section className={classes} id={id} {...props}>
      {children}
    </section>
  );
}

export default Section;
