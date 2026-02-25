'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ComponentProps, MouseEvent } from 'react';

type SmoothLinkProps = ComponentProps<typeof Link>;

export default function SmoothLink({ href, onClick, ...props }: SmoothLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Only handle internal links
    if (typeof href === 'string' && href.startsWith('/')) {
      e.preventDefault();
      
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Small delay for smooth transition
      setTimeout(() => {
        router.push(href);
      }, 100);
    }
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
