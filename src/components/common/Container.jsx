import React from 'react';

/**
 * Container Component
 * 
 * A responsive container that centers content with consistent padding.
 * 
 * @param {string} variant - 'default' | 'narrow' | 'full'
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Container content
 * @param {string} as - HTML element to render as (default: 'div')
 */
export function Container({
  variant = 'default',
  className = '',
  children,
  as: Component = 'div',
  ...props
}) {
  const variantClasses = {
    default: 'container',
    narrow: 'container-narrow',
    full: 'w-full',
  };

  const classes = `${variantClasses[variant]} ${className}`.trim();

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

export default Container;
