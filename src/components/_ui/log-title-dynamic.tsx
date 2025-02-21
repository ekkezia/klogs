'use client'

import { useLogTitleContext } from '@/contexts/log-title-context';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const LogTitleDynamic: React.FC<{ title: string; }> = ({ title }) => {
  const { setTitle, setLoading } = useLogTitleContext()
  
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return;
  
    setLoading(true);
    if (pathname.split("/")[2]) {
      setTitle(`🗒️ ${title}`);
    } else {
      setTitle(null);
    }
    setLoading(false);

  }, [pathname]);
  
  
  return <></>
}

export default LogTitleDynamic