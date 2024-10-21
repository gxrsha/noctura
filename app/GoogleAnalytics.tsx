// 'use client';

// import { usePathname, useSearchParams } from 'next/navigation';
// import { GoogleTagManager } from '@next/third-parties/google'
// import { useEffect } from 'react';

// export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const url = pathname + searchParams.toString();
//     window.gtag('config', GA_MEASUREMENT_ID, {
//       page_path: url,
//     });
//   }, [pathname, searchParams, GA_MEASUREMENT_ID]);

//   return <GoogleTagManager gtmId={GA_MEASUREMENT_ID} />;
// }
